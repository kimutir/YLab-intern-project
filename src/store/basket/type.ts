export interface IBasket {
  selected: undefined | string;
  items: IBasketItem[];
  sum: number;
  amount: number;
}

// export interface IBasket {
//   initState: () => IBasketInitState;
//   addToBasket: (_id: string, amount: number) => Promise<void>;
//   addSelected: (id: string) => void;
// }

export interface MaidIn {
  _id: string;
  _type: string;
}

export interface Category {
  _id: string;
  _type: string;
}

export interface Proto {}

export interface IBasketItem {
  _id: string;
  _key: string;
  name: string;
  title: string;
  description: string;
  price: number;
  maidIn: MaidIn;
  edition: number;
  category: Category;
  order: number;
  isNew: boolean;
  proto: Proto;
  _type: string;
  dateCreate: Date;
  dateUpdate: Date;
  isDeleted: boolean;
  isFavorite: boolean;
}

export interface IBasketItemResponse {
  result: IBasketItem;
}
