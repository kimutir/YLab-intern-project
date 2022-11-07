import BasketState from "./basket";
import { IBasket } from "./basket/type";
import ICatalog from "./catalog/type";
import ICategories from "./categories/type";
import IChat from "./chat/type";
import ICountries from "./countries/type";
import ILocale from "./locale/type";
import IModals from "./modals/type";
import IProfile from "./profile/type";
import ISession from "./session/type";

export interface IState {
  basket?: IBasket;
  catalog?: ICatalog;
  categories?: ICategories;
  countries?: ICountries;
  locale?: ILocale;
  modals?: IModals;
  prop?: number;
  chat?: IChat;
  session?: ISession;
  profile?: IProfile;
}

export interface IModules {
  basket?: BasketState;
}

/**
 *
 */

interface LoginFormFields {
  password: string;
  name: string;
}

interface Rules {
  type: string;
  promp: string;
}

type ValidationScheme<T> = {
  [K in keyof T]: {
    value: T[K];
    check: boolean;
    rules?: Rules[];
  };
};

type ValidationSchemeForLoginForm = ValidationScheme<LoginFormFields>;

type OptionFlags<T> = {
  [P in keyof T]: boolean;
};

type FeatureFlags = {
  fun1: () => void;
  fun2: () => void;
};

type FeatureOptions = OptionFlags<FeatureFlags>;

type CreateMutable<T> = {
  -readonly [P in keyof T]: T[P];
};

type LockedAccount = {
  readonly id: string;
  readonly name: string;
  age: number;
};

type UnlockedAccount = CreateMutable<LockedAccount>;

type Concrete<T> = {
  [P in keyof T]-?: T[P];
};

type MaybeUser = {
  id: string;
  name?: string;
  age?: number;
};

type User = Concrete<MaybeUser>;

type RemoveKindField<T> = {
  [P in keyof T as Exclude<P, "kind">]: T[P];
};

interface Circle {
  kind: "circle";
  redius: number;
}

type KindlessCircle = RemoveKindField<Circle>;
