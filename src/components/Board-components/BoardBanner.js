import BoardBannerImg from "../../assets/게시판(배너).png";
import styles from "./BoardBanner.module.css";

function BoardBanner() {
  return (
    <>
      <div className={styles.container}>
        <img src={BoardBannerImg} alt="게시판 배너" />
        <div className={styles.position}>
          <h2>게시판</h2>
          <p>서로의 경험을 나누어보아요!</p>
        </div>
      </div>
    </>
  );
}

export default BoardBanner;
