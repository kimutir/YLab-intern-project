export interface IChatSocket {
  config: {
    url: string;
  };
  socket: any;
  connect: (token: string, fun1: (data: any) => void, fun2: () => void) => void;
  disconnect: () => void;
}
