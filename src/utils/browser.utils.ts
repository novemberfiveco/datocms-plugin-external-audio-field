import queryString from 'query-string';

export const modifyIframeSrcUrlParams = (
  iframeString: string,
  options: { [key: string]: string | number | boolean } = {},
) => {
  const div = document.createElement('div');
  div.innerHTML = iframeString;
  const iframe = div.querySelector('iframe');

  if (!iframe) return '';
  const qs = queryString.parseUrl(iframe.src);

  const newQuery = {
    ...qs.query,
    ...options,
  };

  if (options.height) {
    iframe.height = `${options.height}`;
  }

  iframe.src = queryString.stringifyUrl({ ...qs, query: newQuery });

  return div.innerHTML;
};
