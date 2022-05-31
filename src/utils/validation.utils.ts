import { ALLOWED_PROVIDERS } from 'constants/providers';

import { prefixWithHttp } from './string.utils';

export const isValidHost = (url: string = '') => {
  const uri = prefixWithHttp(url);
  const foundHost = ALLOWED_PROVIDERS.find((host) => url.includes(host));
  let urlClass: URL;
  if (!url) return 'Url is required';
  try {
    urlClass = new URL(uri);
    if (
      !foundHost &&
      (urlClass.protocol === 'http:' || urlClass.protocol === 'https:')
    ) {
      return `We only support: ${ALLOWED_PROVIDERS.join(', ')}`;
    }
  } catch (err) {
    return 'Not a valid url (ex: https://domain.com)';
  }
  return '';
};
