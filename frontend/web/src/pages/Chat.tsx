import React from "react";
import style from "./css/Chat.module.css";
import InputBox from "../components/InputBox";
import CustomButton from "../components/CustomButton";
import { appContext } from "../store/AppContextProvider";
import MessageContainers from "../components/MessageContainers";
export default function Chat(): React.ReactElement {
  const { message, setMessage, handleSendMessage, messageArray } =
    React.useContext(appContext);
  return (
    <>
      <div className={style.main_container}>
        <div className={style.main_chat_container}>
          {messageArray.map((item) => {
            return (
              <div
                key={item.index}
                className={`${style.chat_container} ${
                  item.self
                    ? style.chat_container_message_direction_right
                    : style.chat_container_message_direction_left
                }`}
              >
                <MessageContainers self={item.self} message={item.messaage} />
              </div>
            );
          })}
        </div>
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
