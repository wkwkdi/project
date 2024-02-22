import { useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Img from "./Img";
import { useEffect, useState } from "react";

function HeaderMessage({ onClick, mail, msgClick, chatCount, setChatCount }) {
  const navigate = useNavigate();
  const [a, setA] = useState(false)

  // const handleMsgClick = () => {
  //   setChatCount(0);
  // };
  const handleNavigateToMyPage = () => {
    // MyPage로 이동하면서 해시값 "#inquiry" 추가
    navigate("/mypage#inquiry");
  };

  const story = localStorage.getItem("Member")
  return (
    <>
      {chatCount > 0 ? (
        <Img
          onClick={onClick}
          className={!chatCount ? styles.iconCircle : styles.iconCircleNew}
        >
          <img src={mail} alt="mail" />
          {msgClick && (
            <div
              onClick={handleNavigateToMyPage}
              className={styles.iconMessage}
            >
              <div className={styles.message} onClick={() => { setChatCount(0) }}>
                문의하신 답변이 도착했습니다.
              </div>
            </div>
          )}
        </Img>
      ) : (
        <Img onClick={onClick} className={styles.iconCircle}>
          <img src={mail} alt="mail" />
          {msgClick && story && (
            <div className={styles.iconMessage}>
              <div>메세지가 없습니다.</div>
            </div>
          )}
        </Img>
      )}
    </>
  );
}

export default HeaderMessage;
