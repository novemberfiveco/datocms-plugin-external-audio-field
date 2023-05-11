import { useState } from 'react';

import type { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  Section,
  TextField,
} from 'datocms-react-ui';

import classes from './styles.module.css';

type Props = {
  ctx: RenderConfigScreenCtx;
};

type Parameters = {
  proxy: string;
};

export default function ConfigScreen({ ctx }: Props) {
  const [proxy, setProxy] = useState<Parameters['proxy']>(
    `${ctx.plugin.attributes?.parameters?.proxy ?? ''}`,
  );
  const [isSaving, setIsSaving] = useState(false);
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    setIsSaving(true);
    e.preventDefault();
    await ctx.updatePluginParameters({
      proxy,
    });
    ctx.notice('Settings updated successfully!');
    setIsSaving(false);
  };
  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={handleSubmit}>
        <Section title="Optional settings">
          <p>
            For mixcloud CORS are disabled so you can configure the settings
            here to allow of the api calls to pass via a proxy. The proxy will
            be called like this:
            <br />
          </p>
          <code className={classes.code}>
            {proxy || '{url}'}
            {`?endpoint=https://www.mixcloud.com/oembed/?url=https://www.mixcloud.com/MDLBEASTRADIO/mdlbeast-mdlbeast-radio-001/&format=json`}
          </code>
          <FieldGroup>
            <TextField
              id="proxy"
              label="Proxy endpoint:"
              name="proxy"
              placeholder="Your title"
              value={proxy}
              onChange={setProxy}
            />
          </FieldGroup>
        </Section>
        <Button
          type="submit"
          fullWidth
          buttonSize="l"
          buttonType="primary"
          disabled={isSaving}
        >
          Save settings
        </Button>
      </Form>
    </Canvas>
  );
}
