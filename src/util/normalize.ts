type Key = string | number;

type ObjectType = {
  [key in Key]: any;
};

export type Normalized<T> = {
  [key in Key]: T;
};

export const normalize = <T extends ObjectType = any, K extends keyof T = string | number>(prop: K, entities: T[]) => {
  return entities.reduce<Partial<Normalized<T>>>((prev, curr) => {
    const key: T[K] = curr[prop];
    return Object.assign({ ...prev, [key]: curr });
  }, {}) as Normalized<T>;
}