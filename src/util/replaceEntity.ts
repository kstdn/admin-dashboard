export const replaceEntity = <T extends { id: string }>(entities: T[], id: string, changes: Partial<T>) => {
  const entity = entities.find(i => i.id === id);

  if (!!entity) {
    const index = entities.indexOf(entity);
    const newArray = [...entities];
    newArray[index] = {
      ...entity,
      ...changes,
    };

    return newArray;
  }

  return undefined;
};
