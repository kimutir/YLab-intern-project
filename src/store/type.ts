import ArticleState from "./article";
import IArticle from "./article/type";
import BasketState from "./basket";
import { IBasket } from "./basket/type";
import CatalogState from "./catalog";
import { ICatalog } from "./catalog/type";
import CategoriesState from "./categories";
import ICategories from "./categories/type";
import ChatState from "./chat";
import IChat from "./chat/type";
import CountriesState from "./countries";
import ICountries from "./countries/type";
import LocaleState from "./locale";
import ILocale from "./locale/type";
import ModalsState from "./modals";
import IModals from "./modals/type";
import ProfileState from "./profile";
import IProfile from "./profile/type";
import SessionState from "./session";
import ISession from "./session/type";

export interface IState {
  basket?: IBasket;
  catalog: ICatalog;
  categories: ICategories;
  countries: ICountries;
  locale: ILocale;
  modals: IModals;
  prop: number;
  chat: IChat;
  session: ISession;
  profile: IProfile;
  article: IArticle;
}

export interface IModules {
  basket: BasketState;
  catalog: CatalogState;
  catalog1: CatalogState;
  categories: CategoriesState;
  countries: CountriesState;
  locale: LocaleState;
  modals: ModalsState;
  chat: ChatState;
  session: SessionState;
  profile: ProfileState;
  article: ArticleState;
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
