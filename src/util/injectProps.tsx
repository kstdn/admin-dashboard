import React, { ComponentType } from 'react';

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type GetProps<C> = C extends ComponentType<infer P> ? P : never;
export type Matching<InjectedProps, DecorationTargetProps> = {
  [P in keyof DecorationTargetProps]: P extends keyof InjectedProps
    ? InjectedProps[P] extends DecorationTargetProps[P]
      ? DecorationTargetProps[P]
      : InjectedProps[P]
    : DecorationTargetProps[P];
};

export const injectProps = <MappedProps, OwnProps>(
  mapProps: (ownProps: OwnProps) => MappedProps,
) => <C extends ComponentType<Matching<MappedProps, GetProps<C>>>>(
  WrappedComponent: C,
): ComponentType<
  JSX.LibraryManagedAttributes<C, Omit<GetProps<C>, keyof MappedProps>> &
    OwnProps
> => {
  return (props: any) => {
    const newProps = mapProps(props);
    return <WrappedComponent {...props} {...newProps} />;
  };
};
