import { Options } from 'components/PlayerOptions';

export type FieldFormValues = {
  oEmbed: {
    html: string;
    provider_name: string;
    provider_url: string;
    type: string;
    title: string;
    [index: string]: string;
  };
  url: string;
  options: Omit<Options, 'options'>;
};
