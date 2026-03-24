import React from "react";
import Styles from "./css/NotFound.module.css";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className={Styles.main_container}>
      {/* <h1 className={Styles.bg_code}>404</h1> */}

      <div className={Styles.inner_container}>
        <h2 className={Styles.main_heading}>Page Not Found</h2>

        <p className={Styles.sub_heading}>
          The page you’re trying to access doesn’t exist or may have been moved.
        </p>

        <div className={Styles.button_container}>
          <button
            className={Styles.create_button}
            onClick={() => navigate("/")}
          >
            Go Home
          </button>

          <button className={Styles.join_button} onClick={() => navigate(-1)}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
