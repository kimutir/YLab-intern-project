export default interface ISession {
  user: UserData;
  token: string | null;
  errors: SessionErrors;
  exists: boolean;
  waiting: boolean;
}

export interface SessionErrors {
  other?: string;
  login?: string;
  password?: string;
}

export interface Role {
  _id: string;
  _type: string;
}

export interface Avatar {}

export interface Country {}

export interface City {}

export interface Profile {
  name: string;
  surname: string;
  phone: string;
  middlename: string;
  avatar: Avatar;
  birthday: string;
  position: string;
  country: Country;
  city: City;
  street: string;
}

export interface Proto {}

export interface UserData {
  _id: string;
  _key: string;
  username: string;
  email: string;
  roles: Role[];
  profile: Profile;
  status: string;
  isNew: boolean;
  order: number;
  proto: Proto;
  _type: string;
  dateCreate: Date;
  dateUpdate: Date;
  isDeleted: boolean;
}

export interface Result {
  token: string;
  user: UserData;
}

export interface IUserResponse extends ISessionErrorResponse {
  result: Result;
}

export interface Issue {
  path: any[];
  rule: string;
  accept: boolean;
  message: string;
}

export interface Data {
  issues: Issue[];
}

export interface ISessionError {
  id: string;
  code: string;
  message: string;
  data: Data;
}

export interface ISessionErrorResponse {
  error: ISessionError;
}
