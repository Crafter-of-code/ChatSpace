import React, { useEffect } from "react";
import style from "./css/Detail.module.css";
import InputBox from "../components/InputBox";
import { appContext } from "../store/AppContextProvider";
import CustomButton from "../components/CustomButton";
import getName from "../assets/name";
const TakingUserDetailPage = (): React.ReactElement => {
  const {
    isCreator,
    roomId,
    userName,
    handleDetailSubmit,
    setRoomId,
    buttonDisabled,
    setUserName,
  } = React.useContext(appContext);
  React.useEffect(() => {
    setUserName(getName());
  }, []);
  return (
    <>
      <div className={style.main_container}>
        <div className={style.sub_container}>
          <form>
            {isCreator == true ? (
              ""
            ) : (
              <InputBox
                placeHolder="Enter room id to join"
                required={true}
                value={roomId}
                setValue={setRoomId}
                disabled={false}
              />
            )}

            <InputBox
              placeHolder="Enter your name"
              required={true}
              value={userName}
              disabled={true}
            />
            <CustomButton
              onClickFunc={handleDetailSubmit}
              title={isCreator == true ? "Create the room" : "join the room"}
              disabled={roomId == "" && isCreator != true ? true : false}
            />
          </form>
        </div>
      </div>
    </>
  );
};
export default TakingUserDetailPage;
