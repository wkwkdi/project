import styles from "./Mypage-Delivery.module.css";
import pic from "../../assets/닭가슴살.png";
import pic2 from "../../assets/훈제 달걀.png";

import { useRef, useState } from "react";

function Delivery({ changeRef, OrderRef }) {
  const [gara, setGara] = useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title} ref={changeRef}>
          조회 및 환불
        </h2>
        <ul className={`${styles.content} ${styles.content1}`}>
          {!gara ? (
            <li className={styles.item}>
              <div className={styles.titles}>
                <h3 className={styles.titlesTitle}>24.10.13</h3>
                <p className={styles.titlesPrice}>주문배송상태표기란</p>
              </div>
              <div className={styles.summary}>
                <ul className={styles.goodss}>
                  <li className={styles.goods}>
                    <div className={styles.imgWraper}>
                      <img src={pic} alt="상품사진" />
                    </div>
                    <div className={styles.goodsTitles}>
                      <h4 className={styles.goodsTitle}>부드러운 닭가슴살</h4>
                      <p className={styles.goodsPrice}>20,000원</p>
                    </div>
                  </li>
                  <li className={styles.goods}>
                    <div className={styles.imgWraper}>
                      <img src={pic2} alt="상품사진" />
                    </div>
                    <div className={styles.goodsTitles}>
                      <h4 className={styles.goodsTitle}>촉촉 맥반석 달걀</h4>
                      <p className={styles.goodsPrice}>1,000원</p>
                    </div>
                  </li>
                </ul>
                <div
                  className={styles.exchangeBtn}
                  onClick={() => {
                    setGara(true);
                  }}
                >
                  교환/반품하기
                </div>
              </div>
            </li>
          ) : (
            <div
              className={`${styles.content} ${styles.content1} ${styles.css}`}
            >
              조회 및 환불 건이 없습니다!
            </div>
          )}
        </ul>
        <h2 className={styles.title} ref={OrderRef}>
          주문내역
        </h2>
        <div className={`${styles.content} ${styles.content2}`}>
          <div className={styles.orderDetailsClassification}>
            <p className={styles.orderDetailsClassificationDate}>주문일자</p>
            <p className={styles.orderDetailsClassificationName}>제품</p>
            <p className={styles.orderDetailsClassificationPrice}>가격</p>
          </div>
          <ul className={styles.orderDetails}>
            <li className={styles.orderDetail}>
              <p className={styles.orderDetailDate}>2024-xx-xx</p>
              <p className={styles.orderDetailName}>맨들닭가슴살</p>
              <p className={styles.orderDetailPrice}>30,000원</p>
            </li>
            <li className={styles.orderDetail}>
              <p className={styles.orderDetailDate}>2024-xx-xx</p>
              <p className={styles.orderDetailName}>근육빵빵 프로틴</p>
              <p className={styles.orderDetailPrice}>10,000원</p>
            </li>
            <li className={styles.orderDetail}>
              <p className={styles.orderDetailDate}>2024-xx-xx</p>
              <p className={styles.orderDetailName}>안전한 스트랩</p>
              <p className={styles.orderDetailPrice}>120,000원</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Delivery;
