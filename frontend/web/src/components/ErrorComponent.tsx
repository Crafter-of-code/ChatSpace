import React from "react";
import styles from "./css/ErrorComponent.module.css";
import { errorContext } from "../store/ErrorContextProvider";

export default function ErrorComponent(): React.ReactElement {
  const { errorMessage, errorStatus, errorSetter } =
    React.useContext(errorContext);

  return (
    <>
      {errorMessage ? (
        <div className={styles.main_container}>
          <div
            className={`${styles.inner_container} ${
              errorStatus ? styles.error : styles.success
            }`}
          >
            <span className={styles.status}>
              {errorStatus ? "Error" : "Success"}
            </span>

            <p className={styles.message}>{errorMessage}</p>

            <button
              className={styles.close_btn}
              onClick={() => {
                errorSetter(false, "");
              }}
            >
              ✕
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
