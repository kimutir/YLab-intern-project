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
  items: [];
  selectedItems: [];
  count: number;
  params: IParams;
  waiting: boolean;
}
