import React, { useCallback, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import type { appContextType, typeOfMessageArray } from "./AllTypes";

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
});

export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement {
  const navigate = useNavigate();
  8;
  const location = useLocation();
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
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [isCreator, dispatch] = React.useReducer(reducer, false);
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [messageArray, setMessageArray] = React.useState<typeOfMessageArray[]>([
    {
      self: false,
      index: 1,
      messaage: "first message from client",
    },
  ]);
  const wsRef = React.useRef<WebSocket | null>(null);
  React.useEffect(() => {
    // if (location.pathname === "/detail") {
    //   navigation("");
    // } else if (location.pathname === "/chat") {
    //   const cookiePresent = cookieStore.get("application");
    //   cookiePresent
    //     .then((response) => {
    //       if (response == null) {
    //         navigation("");
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //       navigation("");
    //     });
    // }
    if (roomId != "") {
      wsRef.current = new WebSocket(`ws://localhost:9091/?roomId=${roomId}`);
      wsRef.current.onopen = () => console.log("the app is connected");
      wsRef.current.onmessage = (clientMessage) => console.log(clientMessage);
    }
  }, [location.pathname]);
  function handleDetailSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (isCreator) {
      axios
        .get("http://localhost:9090/", { withCredentials: true })
        .then((response) => {
          setRoomId(response.data);
          console.log("user is validated");
          navigation("chat");
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (userName != "" && roomId != "") {
        console.log("user is authenticated");
        navigation("chat");
      }
    }
  }
  function handleSendMessage() {
    if (message != "") {
      setMessageArray((prevValue) => {
        return [
          ...prevValue,
          { index: prevValue.length + 1, messaage: message, self: true },
        ];
      });
    }
    console.log(messageArray);
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
      }}
    >
      {children}
    </appContext.Provider>
  );
}
export { appContext };
