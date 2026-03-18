import React, { type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getName from "../assets/name";

type appContextType = {
  isCreator: boolean | undefined;
  roomId: string;
  userName: string;
  message: string;
  buttonDisabled: boolean;
  dispatch: React.ActionDispatch<[action: { type: string }]>;
  setRoomId: React.Dispatch<React.SetStateAction<string>>;
  setUserName: React.Dispatch<React.SetStateAction<string>>;
  handleDetailSubmit: (event: React.MouseEvent<HTMLButtonElement>) => void;
  navigation: (path: string) => void;
  handleSendMessage: () => void;
  setMessage: React.Dispatch<SetStateAction<string>>;
};
const appContext = React.createContext<appContextType>({
  roomId: "",
  userName: "",
  buttonDisabled: false,
  isCreator: false,
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
  const location = useLocation();
  function navigation(path: string) {
    navigate(`/${path}`);
  }
  React.useEffect(() => {
    if (location.pathname === "/detail") {
      navigation("");
    }
  }, []);
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(false);
  const [isCreator, dispatch] = React.useReducer(reducer, false);
  const [roomId, setRoomId] = React.useState("");
  const [userName, setUserName] = React.useState("");
  const [message, setMessage] = React.useState("");
  function reducer(state: boolean, action: { type: string }) {
    switch (action.type) {
      case "create-room":
        state = true;
        setUserName(getName());
        break;
      case "join-room":
        state = false;
        setUserName(getName());
        break;
      default:
        state = false;
        break;
    }
    setUserName(getName());
    return state;
  }

  function handleDetailSubmit(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    if (isCreator) {
      console.log("user is validated");
      navigation("chat");
    } else {
      if (userName != "" && roomId != "") {
        console.log("user is authenticated");
        navigation("chat");
      }
    }
  }
  function handleSendMessage() {
    console.log(message);
    setMessage("");
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
      }}
    >
      {children}
    </appContext.Provider>
  );
}
export { appContext };
