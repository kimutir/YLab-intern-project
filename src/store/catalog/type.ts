export interface IParams {
  page: number;
  limit: number;
  sort: string;
  query: string;
  category: string;
}
export interface IValidParams {
  page?: number;
  limit?: number;
  sort?: string;
  query?: string;
  category?: string;
}

export interface ICatalog {
  items: ICatalogItem[];
  selectedItems: ICatalogItem[];
  count: number;
  params: IParams;
  waiting: boolean;
}

export interface MaidIn {
  _id: string;
  _type: string;
}

export interface Category {
  _id: string;
  _type: string;
}

export interface Proto {}

export interface ICatalogItem {
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

export interface Result {
  items: ICatalogItem[];
  count: number;
}

export interface ICatalogResponse {
  result: Result;
}
