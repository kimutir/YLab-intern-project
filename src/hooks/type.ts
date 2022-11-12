import { IState } from "@src/store/type";

export type TestScheme<T> = {
  [K in keyof T]-?: T[K];
};
