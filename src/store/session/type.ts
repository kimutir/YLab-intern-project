export default interface ISession {
  user: any;
  token: string | null;
  errors: string | null;
  exists: boolean;
  waiting: boolean;
}
