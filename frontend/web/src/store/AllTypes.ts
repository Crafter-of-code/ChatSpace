import type { SetStateAction } from "react";

export type appContextType = {
  isCreator: boolean | undefined;
  roomId: string;
  userName: string;
  message: string;
  buttonDisabled: boolean;
  messageArray: typeOfMessageArray[];
  dispatch: React.ActionDispatch<[action: { type: string }]>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleDetailSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  navigation: (path: string) => void;
  handleSendMessage: () => void;
  setMessage: React.Dispatch<SetStateAction<string>>;
  connectToWebSocket: () => void;
  endChatting: () => void;
};
export type typeOfMessageArray = {
  index: number;
  self: boolean;
  messaage: string;
};
export type messageContainerComponentProp = {
  message: string;
  self: boolean;
};
export type errorContextType = {
  errorStatus: boolean;
  errorMessage: string;
  errorSetter: (status: boolean, message: string) => void;
};
