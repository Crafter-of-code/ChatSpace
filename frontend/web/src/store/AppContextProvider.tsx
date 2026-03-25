import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import type { appContextType, typeOfMessageArray } from "./AllTypes";
import { errorContext } from "./ErrorContextProvider";
const appContext = React.createContext<appContextType>({
  roomId: "",
  userName: "",
  buttonDisabled: false,
  isCreator: false,
  messageArray: [],
  navigation: () => {},
  dispatch: () => {},
  handleDetailSubmit: () => {},
  setRoomId: () => {},
  setUserName: () => {},
  message: "",
  setMessage: () => {},
  handleSendMessage: () => {},
  connectToWebSocket: () => {},
  endChatting: () => {},
  copyLinkToClipBoard: (event: React.MouseEvent<HTMLButtonElement>) => {},
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const navigate = useNavigate();
  8;
  function navigation(path: string) {
    navigate(`/${path}`);
  }

  function reducer(state: boolean, action: { type: string }) {
    switch (action.type) {
      case "create-room":
        state = true;
        break;
      case "join-room":
        state = false;
        break;
      default:
        state = false;
        break;
    }
    return state;
  }
  const { errorSetter } = React.useContext(errorContext);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [isCreator, dispatch] = React.useReducer(reducer, false);
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageArray, setMessageArray] = React.useState<typeOfMessageArray[]>(
    []
  );
  const wsRef = React.useRef<WebSocket | null>(null);
  function handleDetailSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (isCreator) {
      axios
        .get("http://localhost:9090/", { withCredentials: true })
        .then(async (response) => {
          setRoomId(response.data.roomId);
          navigation("chat");
        })
        .catch(() => {
          errorSetter(true, "we got error axios call");
        });
    } else {
      if (userName != "" && roomId != "") {
        console.log("user is authenticated");
        navigation("chat");
      } else {
        errorSetter(true, "please provide information");
      }
    }
  }

  function connectToWebSocket() {
    if (roomId != "") {
      wsRef.current = new WebSocket(`ws://localhost:9091/?roomId=${roomId}`);
      wsRef.current.onopen = () => errorSetter(false, "you are connected");
      wsRef.current.onmessage = (clientMessage) => {
        setMessageArray((prevValue) => {
          return [
            ...prevValue,
            {
              index: prevValue.length + 1,
              self: false,
              messaage: clientMessage.data,
            },
          ];
        });
      };
      wsRef.current.onerror = () => {
        errorSetter(true, "we are facing some error at wsRef.onerror");
        navigation("welcome");
      };
      wsRef.current.onclose = () =>
        errorSetter(false, "the connection has been closed");
    }
  }
  function handleSendMessage() {
    if (message != "" && wsRef.current?.readyState == WebSocket.OPEN) {
      wsRef.current?.send(message);
      setMessageArray((prevValue) => {
        return [
          ...prevValue,
          { index: prevValue.length + 1, messaage: message, self: true },
        ];
      });
    } else {
      errorSetter(true, "we are faceing some problem");
    }
  }
  // function
  function endChatting() {
    wsRef.current?.close();
    setRoomId("");
  }
  async function copyLinkToClipBoard(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.preventDefault();
    await navigator.clipboard
      .writeText(`ws://localhost:9091/?roomId=${roomId}`)
      .then(() => {
        errorSetter(false, "The link is copied to text board");
      })
      .catch(() => {
        errorSetter(true, "failed to copy the link to text board");
      });
  }
  return (
    <appContext.Provider
      value={{
        navigation,
        dispatch,
        isCreator,
        roomId,
        userName,
        handleDetailSubmit,
        setRoomId,
        setUserName,
        buttonDisabled,
        message,
        setMessage,
        handleSendMessage,
        messageArray,
        connectToWebSocket,
        endChatting,
        copyLinkToClipBoard,
      }}
    >
      {children}
    </appContext.Provider>
  );
}
export { appContext };
