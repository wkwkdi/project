import logo from "../assets/LOGO.svg";
import styles from "./Footer.module.css";

function Footer() {
  return (
    <>
      <div className={styles.footer}>
        <div className={styles.logo}>
          <img className={styles.logoImg} src={logo} />
        </div>
        <div>
          <p className={styles.foot}>Copyright 2024 버디즈. All rights reserved</p>
        </div>
      </div>
    </>
  );
}

export default Footer;
