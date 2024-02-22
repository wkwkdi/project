import { useState } from "react";
import styles from "./ShowStar.module.css";

const starArr = [1, 2, 3, 4, 5];
function ShowStar({ num, setNum }) {
  const [rating, setRating] = useState(0);

  const handleSetRatingClick = () => {
    setNum((prev) => ({ ...prev, STORE_RATING: rating }));
  };
  const handleHoverStart = (e) => {
    // console.log(e.target.value);
    setRating(e.target.value);
  };
  // console.log(num);
  return (
    <>
      {!setNum ? (
        <ul className={styles.starPack}>
          {starArr.map((el) => (
            <li
              key={el}
              value={el}
              className={
                el <= Math.floor(num)
                  ? `${styles.star} ${styles.selected}`
                  : `${styles.star}`
              }
            >
              ★
            </li>
          ))}
          <div>{`${num.toFixed(1)}`}</div>
        </ul>
      ) : (
        <ul className={styles.starPack}>
          {starArr.map((el) => (
            <li
              key={el}
              value={el}
              className={
                rating === 0
                  ? el <= num
                    ? `${styles.star} ${styles.selected}`
                    : `${styles.star}`
                  : el <= rating
                  ? `${styles.star} ${styles.selected}`
                  : `${styles.star}`
              }
              onMouseOver={handleHoverStart}
              onMouseOut={() => {
                setRating(0);
              }}
              onClick={handleSetRatingClick}
            >
              ★
            </li>
          ))}
          <div>{`${num}`}</div>
        </ul>
      )}
    </>
  );
}

export default ShowStar;
