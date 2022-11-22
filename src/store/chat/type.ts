export default interface IChat {
  isLast: boolean;
  scroll: boolean;
  connected: boolean;
  messages: any[];
  userMessages: any[];
  unreadMessage: boolean;
}

export interface Avatar {}

export interface Profile {
  name: string;
  avatar: Avatar;
}

export interface Author {
  _id: string;
  username: string;
  profile: Profile;
}

export interface Message {
  _id: string;
  _key: string;
  text: string;
  author: Author;
  dateCreate: Date;
}

export interface MessageResponse {
  method: string;
  payload: Message;
}
