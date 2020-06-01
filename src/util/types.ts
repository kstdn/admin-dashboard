export type ObjectLiteral = {
  [key: string]: any;
};

type FilterFlags<Base, Condition> = {
  [Key in keyof Base]: Base[Key] extends Condition ? Key : never;
};

/*
 * Will extract all keys from type Base whose value
 * is of type Condition
 *
 * Example:
 * type Example = {
 *  a: string;
 *  b: string;
 *  c: number;
 * }
 *
 * type Keys = KeysForType<Example, string>
 * Keys will equal "a" | "b"
 *
 */
export type KeysForType<Base, Condition> = FilterFlags<Base, Condition>[keyof Base];
