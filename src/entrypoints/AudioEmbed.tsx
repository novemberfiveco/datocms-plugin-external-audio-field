import React, { useEffect, useRef, useState } from 'react';

import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import {
  Button,
  Canvas,
  FormLabel,
  Spinner,
  TextInput,
} from 'datocms-react-ui';
import _get from 'lodash/get';
import _omit from 'lodash/omit';
import { unstable_batchedUpdates } from 'react-dom';

import { getProviderDefaultOptions } from 'utils/audioEmbed.utils';
import { modifyIframeSrcUrlParams } from 'utils/browser.utils';
import { prefixWithHttp } from 'utils/string.utils';
import { isValidHost } from 'utils/validation.utils';

import { ALLOWED_PROVIDERS, PROVIDER_CONFIG } from 'constants/providers';
import { usePrevious } from 'hooks';
import { FieldFormValues } from 'types/plugin.types';

import { PlayerPreview } from 'components';
import PlayerOptions, { Options } from 'components/PlayerOptions';

import classes from './styles.module.css';

interface Props {
  ctx: RenderFieldExtensionCtx;
}

const AudioEmbed = ({ ctx }: Props) => {
  const fieldValue = _get(ctx.formValues, ctx.fieldPath) as string;
  const fieldJsonRef = useRef<FieldFormValues | null>(JSON.parse(fieldValue));
  const fieldJson = fieldJsonRef.current;

  const [url, setUrl] = useState(fieldJson?.url ?? '');
  const prevUrl = usePrevious(url);

  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(fieldJson?.oEmbed?.html ?? '');

  const foundHost = ALLOWED_PROVIDERS.find((host) => url.includes(host));
  const providerConfig =
    PROVIDER_CONFIG?.[foundHost as keyof typeof PROVIDER_CONFIG];

  const defaults = getProviderDefaultOptions(fieldJson, providerConfig);

  useEffect(() => {
    if (!url) {
      unstable_batchedUpdates(() => {
        setPreview('');
        fieldJsonRef.current = null;

        ctx.setFieldValue(ctx.fieldPath, null);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

  const handleUrlChange = (newValue: string) => {
    unstable_batchedUpdates(() => {
      setUrl(newValue);
      setError(isValidHost(newValue));
    });
  };

  const handleBlur = () => {
    setError(isValidHost(url));
  };

  const handleFetchOEmbed = async (options: Options = {}) => {
    const urlParams = {
      ...(options?.variant?.value ?? {}),
      ...(options?.toggles ?? {}),
    };
    if (error) return;
    setIsLoading(true);
    try {
      const oEmbedUrl = `${providerConfig.url}?url=${prefixWithHttp(
        url,
      )}&format=json`;

      const endpoint =
        ctx.plugin.attributes.parameters?.proxy &&
        typeof ctx.plugin.attributes.parameters?.proxy === 'string'
          ? `${prefixWithHttp(
              ctx.plugin.attributes.parameters.proxy,
            )}?endpoint=${oEmbedUrl}`
          : oEmbedUrl;
      const resp = await fetch(endpoint).then((resp) => resp.json());
      const previewHtml = modifyIframeSrcUrlParams(resp.html, urlParams);
      setPreview(previewHtml);

      await ctx.setFieldValue(
        ctx.fieldPath,
        JSON.stringify({
          oEmbed: { ...resp, html: previewHtml },
          options: _omit(options, 'options'),
          url,
        }),
      );
    } catch (error) {
      setError('Could not fetch the preview for this url');
    }

    setIsLoading(false);
  };
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleFetchOEmbed(defaults);
  };

  const handleOptionsChange = (options: Options) => {
    handleFetchOEmbed(options);
  };

  return (
    <Canvas ctx={ctx}>
      <div
        style={{
          border: '1px dashed #f0f0f0',
          padding: 24,
        }}
      >
        <div className={classes.group}>
          <form onSubmit={handleSubmit}>
            <FormLabel htmlFor="url">
              Copy and paste the address of a Soundcloud, Mixcloud or Spotify
              track/playlist here:
            </FormLabel>
            <div className={classes.inputButtonGroup}>
              <TextInput
                id="url"
                name="url"
                onBlur={handleBlur}
                onChange={handleUrlChange}
                placeholder="Audio url*"
                value={url}
                disabled={isLoading}
              />
              <Button
                disabled={!url || !!error || isLoading || url === prevUrl}
                type="submit"
                buttonSize="xxs"
                buttonType="primary"
              >
                {isLoading ? <Spinner /> : 'Submit'}
              </Button>
            </div>
            {error && (
              <FormLabel className={classes.errorLabel} htmlFor="" error>
                {error}
              </FormLabel>
            )}
          </form>
        </div>
        {preview && (
          <div className={classes.group}>
            <PlayerOptions
              initialValues={defaults}
              onOptionsChange={handleOptionsChange}
            />
          </div>
        )}
        {preview && (
          <div className={classes.iframePreview}>
            <FormLabel htmlFor="">Preview</FormLabel>
            <PlayerPreview html={preview} />
          </div>
        )}
      </div>
    </Canvas>
  );
};

export default React.memo(AudioEmbed);
