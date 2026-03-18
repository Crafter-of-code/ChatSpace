import React from "react";
import style from "./css/Welcome.module.css";
import { appContext } from "../store/AppContextProvider";
const Welcome = (): React.ReactElement => {
  const { dispatch, navigation, setUserName } = React.useContext(appContext);
  return (
    <div className={style.main_container}>
      <div className={style.inner_container}>
        <h1 className={style.main_heading}>Welcome to Chat Space</h1>
        <p className={style.sub_heading}>
          Connect with someone instantly. Create a room or join one.
        </p>
        <div className={style.button_container}>
          <button
            className={style.create_button}
            onClick={() => {
              dispatch({ type: "create-room" });
              navigation("detail");
            }}
          >
            Create a Room
          </button>
          <button
            className={style.join_button}
            onClick={() => {
              dispatch({ type: "join-room" });
              navigation("detail");
            }}
          >
            Join a Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
