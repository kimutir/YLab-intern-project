export default interface IChat {
  isLast: boolean;
  scroll: boolean;
  connected: boolean;
  messages: any[];
  userMessages: any[];
  unreadMessage: boolean;
}
