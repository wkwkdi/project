import shoppingBannerImg from "../../assets/쇼핑(배너).svg";
import styles from "./ShoppingBanner.module.css";

function ShoppingBanner({ title, summary }) {
  // console.log(title, summary);
  return (
    <>
      <div className={styles.banner}>
        <div className={styles.imgWraper}>
          <img src={shoppingBannerImg} alt="쇼핑 배너 이미지" />
        </div>
        <div className={styles.bannerTitles}>
          <h2 className={styles.bannerTitle}>{title}</h2>
          <p className={styles.bannerText}>{summary}</p>
        </div>
      </div>
    </>
  );
}

export default ShoppingBanner;
