import React from "react";
import style from "./css/Chat.module.css";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import { appContext } from "../store/AppContextProvider";

export default function Chat(): React.ReactElement {
  const { message, setMessage, handleSendMessage } =
    React.useContext(appContext);
  return (
    <>
      <div className={style.main_container}>
        <div className={style.chat_container}></div>
        <div className={style.opration_container}>
          <div className={style.input_container}>
            <InputBox
              disabled={false}
              placeHolder="Write you message here"
              value={message}
              setValue={setMessage}
            />
          </div>
          <div className={style.button_container}>
            <CustomButton
              title="Send"
              disabled={message != "" ? false : true}
              onClickFunc={handleSendMessage}
            />
          </div>
        </div>
      </div>
    </>
  );
}
