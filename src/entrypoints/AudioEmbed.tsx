import { FormEventHandler, memo, useEffect, useRef, useState } from 'react';

import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  FormLabel,
  Spinner,
  TextField,
} from 'datocms-react-ui';
import _get from 'lodash/get';
import _omit from 'lodash/omit';

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
      setPreview('');
      fieldJsonRef.current = null;
      ctx.setFieldValue(ctx.fieldPath, null);
    }
  }, [ctx, url]);

  const handleUrlChange = (newValue: string) => {
    setUrl(newValue);
    setError(isValidHost(newValue));
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
      const response = await fetch(endpoint);
      if (response.ok) {
        const resp = await response.json();
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
      } else {
        setError('Could not fetch the preview for this url');
      }
    } catch (error) {
      setError('Could not fetch the preview for this url');
    }

    setIsLoading(false);
  };

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    handleFetchOEmbed(defaults);
  };

  const handleOptionsChange = (options: Options) => {
    handleFetchOEmbed(options);
  };

  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={handleSubmit}>
        <FieldGroup>
          <div className={classes.grid}>
            <div>
              <TextField
                id="url"
                name="url"
                label="URL to embed"
                onChange={handleUrlChange}
                placeholder="Audio url"
                value={url}
                textInputProps={{ disabled: isLoading, onBlur: handleBlur }}
                required
                error={error}
                hint="Copy and paste the address of a Soundcloud, Mixcloud, Anghami or Spotify
              track/playlist here"
              />
            </div>

            <Button
              disabled={!url || !!error || isLoading || url === prevUrl}
              type="submit"
              buttonSize="s"
              buttonType="primary"
            >
              {isLoading ? <Spinner /> : 'Submit'}
            </Button>
          </div>
        </FieldGroup>
      </Form>

      {preview && (
        <>
          <FieldGroup>
            <PlayerOptions
              initialValues={defaults}
              onOptionsChange={handleOptionsChange}
            />
          </FieldGroup>
          <div className={classes.iframePreview}>
            <FormLabel htmlFor="">Preview</FormLabel>
            <PlayerPreview html={preview} />
          </div>
        </>
      )}
    </Canvas>
  );
};

export default memo(AudioEmbed);
