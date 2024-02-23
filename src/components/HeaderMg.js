import styles from "./Header.module.css";
import Container from "./Container";
import logo from "../assets/LOGO.svg";
import basket from "../assets/basket.svg";
import mail from "../assets/letter.svg";
import user from "../assets/user.svg";
import Img from "./Img";
import { Link } from "react-router-dom";

function HeaderMg({ onClick, managerData, imgClick, setImgClick, Logout }) {
  return (
    <>
      <Img
        onClick={onClick}
        className={`${styles.miconCircle} ${styles.mlogin}`}
      >
        <img src={user} alt="user" />
        {managerData && imgClick ? (
          <div className={styles.mlogBox}>
            <p className={styles.muserName}>
              관리자 <span>님</span>
            </p>
              <div
                className={styles.btn}
                onClick={(e) => {
                  e.stopPropagation();
                  setImgClick(false);
                }}
              >
                  <Link to={"/manager"} className={styles.manager}>
                관리자 페이지
            </Link>
              </div>
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

export default HeaderMg