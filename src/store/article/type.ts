export default interface IArticle {
  data: IArticleData;
  waiting: boolean;
}

export interface MaidIn {
  title: string;
  code: string;
  _id: string;
}

export interface Category {
  title: string;
  _id: string;
}

export interface Proto {}

export interface Result {
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

export interface IArticleData extends Result {}
