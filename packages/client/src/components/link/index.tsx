import { FC } from 'react';

interface ILinkProps {
  href: string,
  text: string,
}

const Link: FC<ILinkProps> = (props: ILinkProps) => {
  return (
    <a href={props.href}>{props.text}</a>
  );
}

export default Link;
