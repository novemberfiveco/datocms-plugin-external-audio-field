export const prefixWithHttp = (str: string) =>
  !(str.startsWith('http://') || str.startsWith('https://'))
    ? ['https://', str].filter(Boolean).join('')
    : str;
