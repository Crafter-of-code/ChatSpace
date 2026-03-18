import React from "react";
import { Outlet } from "react-router-dom";
import AppContextProvider from "./store/AppContextProvider";

function App(): React.ReactElement {
  return (
    <>
      <AppContextProvider>
        <Outlet />
      </AppContextProvider>
    </>
  );
}

export default App;
