import { useRef } from "react";
import styles from "./BoardNav.module.css";

function BoardNav({
  setSelectedItem,
  selectedItem,
  mainWriteclick,
  setMainWriteClick,
}) {
  const selectedItemRef = useRef();

  const handleBtnClick = (e) => {
    if (mainWriteclick) {
      selectedItemRef.current = e.target.lastChild.value;
      setSelectedItem(selectedItemRef.current);
      setMainWriteClick(false);
    } else {
      selectedItemRef.current = e.target.lastChild.value;
      setSelectedItem(selectedItemRef.current);
    }
    // setTimeout(() => {
    //   window.scrollTo({ top: 500, behavior: "smooth" }); // x와 y는 스크롤할 좌표값입니다.
    // }, 1000);
  };

  return (
    <>
      {/* Nav바 전체 */}
      <div className={styles.wrap}>
        {/* Nav바 가운데 정렬 */}
        <ul className={styles.headerContainer}>
          {/* Nav바 ul안에 있는 아이템 */}

          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={selectedItem == "000" ? styles.select : ""}
          >
            전체보기
            <input type="hidden" value="000" />
          </li>

          {/* Nav바 ul안에 있는 아이템 */}

          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={selectedItem == "001" ? styles.select : ""}
          >
            공지사항
            <input type="hidden" value="001" />
          </li>

          {/* Nav바 ul안에 있는 아이템 */}
          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={selectedItem == "002" ? styles.select : ""}
          >
            자유게시판
            <input type="hidden" value="002" />
          </li>

          {/* Nav바 ul안에 있는 아이템 */}
          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={selectedItem == "003" ? styles.select : ""}
          >
            운동팁
            <input type="hidden" value="003" />
          </li>

          {/* Nav바 ul안에 있는 아이템 */}
          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={selectedItem == "004" ? styles.select : ""}
          >
            도와주세요!
            <input type="hidden" value="004" />
          </li>

          {/* Nav바 ul안에 있는 아이템 */}
          <li
            ref={selectedItemRef}
            onClick={handleBtnClick}
            className={styles.disabled}
          >
            중고시장
            <input type="hidden" value="005" />
          </li>
        </ul>
      </div>
    </>
  );
}

export default BoardNav;
