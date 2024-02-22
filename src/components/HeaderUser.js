import styles from "./Header.module.css";
import Container from "./Container";
import logo from "../assets/LOGO.svg";
import basket from "../assets/basket.svg";
import mail from "../assets/letter.svg";
import user from "../assets/user.svg";
import Img from "./Img";
import { Link } from "react-router-dom";

function HeaderUser({ onClick, memberData, imgClick, setImgClick, Logout }) {
  return (
    <>
      <Img
        onClick={onClick}
        className={`${styles.iconCircle} ${styles.login}`}
      >
        <img src={user} alt="user" />
        {memberData && imgClick ? (
          <div className={styles.logBox}>
            <p className={styles.userName}>
              {memberData} <span>님</span>
            </p>
            <Link to={"/mypage"}>
              <div
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  setImgClick(false);
                }}
              >
                마이페이지
              </div>
            </Link>
            <div onClick={Logout} className={styles.btn}>
              로그아웃
            </div>
          </div>
        ) : (
          ""
        )}
      </Img>
    </>
  )
}

export default HeaderUser