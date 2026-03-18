import React, { type SetStateAction } from "react";
import styles from "./css/InputBox.module.css";
type inputBoxProps = {
  placeHolder: string;
  value: string;
  required?: boolean;
  setValue?: React.Dispatch<SetStateAction<string>>;
  disabled: boolean;
};
const InputBox = (props: inputBoxProps): React.ReactElement => {
  return (
    <input
      className={styles.input_box}
      type="text"
      placeholder={props.placeHolder}
      required={props.required}
      value={props.value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        if (props.setValue) {
          props.setValue(event.target.value);
        }
      }}
      disabled={props.disabled}
    />
  );
};

export default InputBox;
