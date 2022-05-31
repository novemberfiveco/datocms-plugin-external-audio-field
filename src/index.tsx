import 'datocms-react-ui/styles.css';

import { connect, RenderFieldExtensionCtx } from 'datocms-plugin-sdk';

import AudioEmbed from './entrypoints/AudioEmbed';
import ConfigScreen from './entrypoints/ConfigScreen';
import { render } from './utils/render';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  manualFieldExtensions() {
    return [
      {
        id: 'audioEmbed',
        name: 'Audio Embed',
        type: 'editor',
        fieldTypes: ['json'],
      },
    ];
  },
  renderFieldExtension(fieldExtensionId: string, ctx: RenderFieldExtensionCtx) {
    if (fieldExtensionId === 'audioEmbed') {
      return render(<AudioEmbed ctx={ctx} />);
    }
  },
});
