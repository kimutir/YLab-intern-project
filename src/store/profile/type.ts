export default interface IProfile {
  data: IProfileData;
  waiting: boolean;
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

export interface IProfileData {
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

export interface IProfileResponse {
  result: IProfileData;
}
