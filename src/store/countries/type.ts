export default interface ICountries {
  items: [];
  selected: string;
  waiting: boolean;
}

export interface ICountry {
  _id: string;
  title: string;
  code: string;
}

export interface ICountriesData {
  items: ICountry[];
}

export interface ICountriesResponse {
  result: ICountriesData;
}
