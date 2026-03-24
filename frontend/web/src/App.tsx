import React from "react";
import { Outlet } from "react-router-dom";
import AppContextProvider from "./store/AppContextProvider";
import ErrorContextProvider from "./store/ErrorContextProvider";
import ErrorComponent from "./components/ErrorComponent";

function App(): React.ReactElement {
  return (
    <>
      <ErrorContextProvider>
        <ErrorComponent />
        <AppContextProvider>
          <Outlet />
        </AppContextProvider>
      </ErrorContextProvider>
    </>
  );
}

export default App;
