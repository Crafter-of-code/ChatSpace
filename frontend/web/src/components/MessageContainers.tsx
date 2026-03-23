import React from "react";
import style from "./css/MessageContainers.module.css";
import type { messageContainerComponentProp } from "../store/AllTypes";

const MessageContainers = (
  props: messageContainerComponentProp
): React.ReactElement => {
  return (
    <div
      className={`${style.inner_message_container} ${
        props.self
          ? style.inner_message_container_right
          : style.inner_message_container_left
      }`}
    >
      <p>{props.message}</p>
    </div>
  );
};
export default MessageContainers;
