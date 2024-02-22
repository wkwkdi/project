import styled from "styled-components";
import Container from "../components/Container";
import styles from "./MyPage.module.css";
import myPageBannerImg from "../assets/마이페이지(배너).png";
import userIcon from "../assets/user-solid.svg";
import deliveryIcon from "../assets/cart-shopping-solid.svg";
import desktopIcon from "../assets/desktop-solid.svg";
import MyProfile from "./../components/Mypage-components/Mypage-ProfileChange";
import { useEffect, useRef, useState } from "react";
import Delivery from "../components/Mypage-components/Mypage-Delivery";
import Inquiry from "../components/Mypage-components/Mypage-inquiry";

const ImgWraper = styled.div`
  display: flax;
  justify-content: center;
  align-items: center;
`;
const MyPageContainer = styled(Container)`
  margin: 100px auto;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

function MyPage() {
  const [pageShift, setPageShift] = useState(1);

  const changeRef = useRef(null);
  const OrderRef = useRef(null);

  const scrollToEchangeRef = () => {
    if (changeRef.current) {
      changeRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const scrollToOrderRef = () => {
    if (OrderRef.current) {
      OrderRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    // URL 해시값이 "inquiry"일 때, 3번째 페이지로 이동하면서 스크롤 조정
    if (window.location.hash === "#inquiry") {
      setPageShift(3);
      window.scrollTo({ top: 300, behavior: "smooth" });
    }
  }, []);

  let content;

  switch (pageShift) {
    case 1:
      content = <MyProfile />;
      break;
    case 2:
      content = <Delivery changeRef={changeRef} OrderRef={OrderRef} />;
      break;
    case 3:
      content = <Inquiry />;
      break;

    default:
      content = null;
  }

  const handleProfile = (page, num) => (e) => {
    e.stopPropagation();
    window.scrollTo({ top: num, behavior: "smooth" });
    setPageShift(page);
  };

  return (
    <>
      <div className={styles.banner}>
        <ImgWraper>
          <img src={myPageBannerImg} />
          <div className={styles.bannerTitles}>
            <h2 className={styles.bannerTitle}>마이페이지</h2>
            <p className={styles.bannerText}>나의 정보를 확인해 보세요!</p>
          </div>
        </ImgWraper>
      </div>
      <MyPageContainer>
        <div className={styles.menus}>
          {/* 내정보 */}
          <div className={styles.menu}>
            <div
              className={styles.menuTitle}
              onClick={(e) => {
                e.stopPropagation();
                if (pageShift !== 1) {
                  setPageShift(1);
                  window.scrollTo({ top: 300, behavior: "smooth" });
                }
              }}
            >
              <div className={styles.iconWraper}>
                {/* <img src={userIcon} alt="userIcon" /> */}
                <img src={userIcon} alt="userIcon" />
              </div>
              내정보
            </div>
            <div
              className={styles.locationBtn}
              onClick={pageShift === 1 ? handleProfile(1, 400) : undefined}
              style={
                pageShift === 1
                  ? { color: "#333333", pointerEvents: "auto" }
                  : { color: "#999999", pointerEvents: "none" }
              }
            >
              프로필 수정
            </div>
            <div
              className={styles.locationBtn}
              onClick={pageShift === 1 ? handleProfile(1, 1466) : undefined}
              style={
                pageShift === 1
                  ? { color: "#333333", pointerEvents: "auto" }
                  : { color: "#999999", pointerEvents: "none" }
              }
            >
              비밀번호 변경
            </div>
          </div>
          {/* 배송 */}
          <div className={styles.menu}>
            <div className={styles.menuTitle} onClick={handleProfile(2, 300)}>
              <div className={styles.iconWraper}>
                {/* <img src={userIcon} alt="userIcon" /> */}
                <img src={deliveryIcon} alt="deliveryIcon" />
              </div>
              배송
            </div>
            <div
              className={styles.locationBtn}
              onClick={scrollToEchangeRef}
              style={
                pageShift === 2
                  ? { color: "#333333", pointerEvents: "auto" }
                  : { color: "#999999", pointerEvents: "none" }
              }
            >
              조회/환불
            </div>
            <div
              className={styles.locationBtn}
              onClick={scrollToOrderRef}
              style={
                pageShift === 2
                  ? { color: "#333333", pointerEvents: "auto" }
                  : { color: "#999999", pointerEvents: "none" }
              }
            >
              주문내역
            </div>
          </div>
          {/* 고객센터 */}
          <div className={styles.menu}>
            <div className={styles.menuTitle} onClick={handleProfile(3, 300)}>
              <div className={styles.iconWraper}>
                {/* <img src={userIcon} alt="userIcon" /> */}
                <img src={desktopIcon} alt="userIcon" />
              </div>
              고객센터
            </div>
            <div
              className={styles.locationBtn}
              onClick={handleProfile(3, 400)}
              style={
                pageShift === 3
                  ? { color: "#333333", pointerEvents: "auto" }
                  : { color: "#999999", pointerEvents: "none" }
              }
            >
              1:1 문의하기
            </div>
          </div>
        </div>
        {/* 컨텐츠 */}
        {content}
      </MyPageContainer>
    </>
  );
}

export default MyPage;
