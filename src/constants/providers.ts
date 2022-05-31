export const PROVIDER_CONFIG = {
  soundcloud: {
    url: 'https://soundcloud.com/oembed',
    options: {
      variant: {
        default: {
          label: 'Default',
          height: 160,
          toggles: {
            show_artwork: true,
            show_comments: false,
            visual: false,
          },
        },
        bigger: {
          label: 'Bigger',
          height: 400,
          toggles: {
            show_artwork: true,
            show_comments: false,
            visual: true,
          },
        },
      },
    },
  },
  spotify: {
    url: 'https://open.spotify.com/oembed',
    options: {
      variant: {
        default: {
          label: 'Compact',
          height: 80,
          toggles: {},
        },
        normal: {
          label: 'Normal',
          height: 380,
          toggles: {},
        },
      },
    },
  },
  mixcloud: {
    url: 'https://www.mixcloud.com/oembed/',
    options: {
      variant: {
        default: {
          label: 'Classic',
          height: 120,
          toggles: {
            hide_cover: true,
            hide_artwork: false,
          },
        },
        mini: {
          label: 'Mini',
          height: 60,
          mini: 1,
          toggles: {
            hide_cover: true,
            hide_artwork: false,
          },
        },
        bigger: {
          label: 'Bigger',
          height: 400,
          toggles: {
            hide_cover: false,
            hide_artwork: false,
          },
        },
      },
    },
  },
};

export const ALLOWED_PROVIDERS = Object.keys(PROVIDER_CONFIG);
