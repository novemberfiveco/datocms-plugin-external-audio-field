import { useState } from 'react';

import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import { Button, Canvas, FieldGroup, TextField } from 'datocms-react-ui';

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
      <div style={{ marginBottom: 32 }}>
        <p style={{ margin: 0 }}>
          For mixcloud CORS are disabled so you can configure the settings here
          to allow of the api calls to pass via a proxy.
          <br />
          The proxy will be called like this:
        </p>
        <blockquote
          style={{
            backgroundColor: '#fafafafa',
            margin: 0,
            marginTop: 8,
            padding: 16,
            boxShadow: '0 2px 5px #0000001a',
            wordBreak: 'break-word',
          }}
        >
          {`{url}?endpoint=https://www.mixcloud.com/oembed/?url=https://www.mixcloud.com/MDLBEASTRADIO/mdlbeast-mdlbeast-radio-001/&format=json`}
        </blockquote>
      </div>
      <form
        style={{
          border: '1px dashed #f0f0f0',
          padding: 24,
        }}
        onSubmit={handleSubmit}
      >
        <FieldGroup style={{ marginBottom: 56 }}>
          <TextField
            id="proxy"
            label="Proxy endpoint:"
            name="proxy"
            placeholder="Your title"
            value={proxy}
            onChange={setProxy}
          />
        </FieldGroup>
        <Button
          type="submit"
          fullWidth
          buttonSize="l"
          buttonType="primary"
          disabled={isSaving}
        >
          Save settings
        </Button>
      </form>
    </Canvas>
  );
}
