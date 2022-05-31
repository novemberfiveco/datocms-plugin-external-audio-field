import React from 'react';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  html: string;
}

const PlayerPreview = ({ html, ...rest }: Props) => {
  return <div {...rest} dangerouslySetInnerHTML={{ __html: html }} />;
};

export default React.memo(PlayerPreview);
