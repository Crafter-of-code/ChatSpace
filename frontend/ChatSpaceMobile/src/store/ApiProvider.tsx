import { useNavigation } from '@react-navigation/native';
import React, { SetStateAction } from 'react';
type messageArrayType = {
  index: number;
  message: string;
  self: boolean;
};
type apiContextType = {
  isCreator: boolean;
  roomId: string;
  userName: string;
  message: string;
  messageArray: messageArrayType[];
  setMessage: React.Dispatch<SetStateAction<string>>;
  setRoomId: React.Dispatch<SetStateAction<string>>;
  setUserName: React.Dispatch<SetStateAction<string>>;
  setIsCreator: React.Dispatch<SetStateAction<boolean>>;
  navigation: (path: string) => void;
  sendMessageHandler: () => void;
};
const apiContext = React.createContext<apiContextType>({
  isCreator: true,
  roomId: '',
  userName: '',
  message: '',
  setMessage: () => {},
  setRoomId: () => {},
  setUserName: () => {},
  setIsCreator: () => {},
  navigation: () => {},
  sendMessageHandler: () => {},
  messageArray: [{ index: 0, self: false, message: '' }],
});
const ApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const nav = useNavigation<any>();
  const [isCreator, setIsCreator] = React.useState(true);
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageArray, setMessageArray] = React.useState<messageArrayType[]>(
    [],
  );
  function navigation(path: string) {
    nav.navigate(path);
  }
  function sendMessageHandler() {
    if (message != '') {
      setMessageArray(prevValue => {
        return [
          ...prevValue,
          { self: true, message, index: prevValue.length + 1 },
        ];
      });
      console.log(messageArray);
      setMessage('');
    }
  }
  return (
    <>
      <apiContext.Provider
        value={{
          navigation,
          isCreator,
          setIsCreator,
          roomId,
          userName,
          setRoomId,
          setUserName,
          message,
          setMessage,
          messageArray,
          sendMessageHandler,
        }}
      >
        {children}
      </apiContext.Provider>
    </>
  );
};
export { ApiProvider, apiContext };
