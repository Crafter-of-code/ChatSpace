import React from "react";
import type { errorContextType } from "./AllTypes";
const errorContext = React.createContext<errorContextType>({
  errorStatus: false,
  errorMessage: "",
  errorSetter: () => {},
});
const ErrorContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}): React.ReactElement => {
  const [errorStatus, setErrorStatus] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  function errorSetter(status: boolean, message: string) {
    setErrorStatus(status);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorStatus(false);
      setErrorMessage("");
    }, 3000);
  }
  return (
    <errorContext.Provider
      value={{
        errorMessage,
        errorStatus,
        errorSetter,
      }}
    >
      {children}
    </errorContext.Provider>
  );
};
export default ErrorContextProvider;
export { errorContext };
