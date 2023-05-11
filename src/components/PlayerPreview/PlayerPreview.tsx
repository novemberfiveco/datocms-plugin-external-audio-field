import { HTMLAttributes, memo } from 'react';

interface Props extends HTMLAttributes<HTMLDivElement> {
  html: string;
}

const PlayerPreview = ({ html, ...rest }: Props) => {
  return <div {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default memo(PlayerPreview);
