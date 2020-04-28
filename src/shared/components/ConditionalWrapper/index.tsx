import { FC, ReactNode } from 'react';

type Props = {
  condition: boolean;
  wrapper: (children: any) => ReactNode;
  children: any;
};

const ConditionalWrapper: FC<Props> = ({ condition, wrapper, children }) => {
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;
