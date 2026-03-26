import { useNavigation } from '@react-navigation/native';

import Clipboard from '@react-native-clipboard/clipboard';
import axios from 'axios';
import React, { SetStateAction } from 'react';
import {
  rootNavType,
  rootStackParameterList,
} from '../navigation/NavigationType';
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
  navigation: (path: keyof rootStackParameterList) => void;
  sendMessageHandler: () => void;
  createOrJoinRoom: () => void;
  connectToWebSocket: () => void;
  endMetting: () => void;
  copyToClipBoard: (copyToClipBoardMessage: string) => void;
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
  createOrJoinRoom: () => {},
  connectToWebSocket: () => {},
  endMetting: () => {},
  copyToClipBoard: (copyToClipBoardMessage: string) => {},
});
const ApiProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  // navigation method start from her
  const nav = useNavigation<rootNavType>();
  function navigation(path: keyof rootStackParameterList) {
    nav.navigate(path);
  }
  function navPush(path: keyof rootStackParameterList) {
    nav.reset({
      index: 0,
      routes: [{ name: path }],
    });
  }
  // navigation method ends here
  const [isCreator, setIsCreator] = React.useState(true);
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [messageArray, setMessageArray] = React.useState<messageArrayType[]>(
    [],
  );
  let webSocketRef = React.createRef<WebSocket | null>();
  function createOrJoinRoom() {
    if (isCreator) {
      axios
        .get('http://localhost:9090')
        .then(async response => {
          await setRoomId(response.data.roomId);
          navPush('chat');
        })
        .catch(err => {
          console.log(err);
        });
    } else {
      connectToWebSocket();
    }
  }
  function connectToWebSocket() {
    webSocketRef.current = new WebSocket(
      `ws://localhost:9091/?roomId=${roomId}`,
    );
    webSocketRef.current.onopen = () => {
      console.log('We socket is connected');
    };
    webSocketRef.current.onmessage = message => {
      const data = JSON.parse(message.data);
      console.log(data);
      console.log(data);
      if (data.type == message) {
        setMessageArray(prevValue => {
          return [
            ...prevValue,
            { index: prevValue.length + 1, message: data.message, self: false },
          ];
        });
      }
    };
    webSocketRef.current.onclose = err => {
      console.log(err.reason);
      setRoomId('');
      navPush('welcome');
    };
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
  function endMetting() {
    webSocketRef.current?.close();
    setRoomId('');
    navPush('welcome');
  }
  function copyToClipBoard(copyToClipBoardMessage: string) {
    try {
      Clipboard.setString(copyToClipBoardMessage);
    } catch (err) {
      console.log(err);
      console.log('we are facing some error while copy the room id');
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
          createOrJoinRoom,
          connectToWebSocket,
          endMetting,
          copyToClipBoard,
        }}
      >
        {children}
      </apiContext.Provider>
    </>
  );
};
export { ApiProvider, apiContext };
