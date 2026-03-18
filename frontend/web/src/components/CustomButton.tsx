import React from "react";
import styles from "./css/CustomButton.module.css";

type CustomButtonProps = {
  title: string;
  onClickFunc: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
};

const CustomButton = (props: CustomButtonProps): React.ReactElement => {
  return (
    <button
      className={styles.custom_button}
      onClick={(event) => props.onClickFunc(event)}
      disabled={props.disabled}
    >
      {props.title}
    </button>
  );
};

export default CustomButton;
