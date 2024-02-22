import React, { useEffect, useState } from "react";
import styles from "./BoardNavSelect.module.css";

// 공지사항 뺏음
const FRUITS = ["공지사항", "자유게시판", "운동팁", "도와주세요"];
const USERFRUITS = ["자유게시판", "운동팁", "도와주세요"];

function BoardNavSelect({
  handleSelect,
  selectedFruit,
  localInfo,
  managerInfo,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (e) => {
    // 버블링 막는 위로가는 함수 막는거
    e.stopPropagation();
    // 리스트 버튼 클릭시 리스트 열림
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    // 리스트가 열려있으면 빠져나감
    if (!isOpen) return;
    // 버튼 외의 영역 누를때 닫히는 함수
    const handleClickOutside = () => setIsOpen(false);

    // window화면 클릭하면 닫히는 함수 실행
    window.addEventListener("click", handleClickOutside);

    // cleanUp함수
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    //   전체 감싸준 div
    <div className={styles.dropdownContainer}>
      {/* 처음에 보여주는 버튼? 칸? */}
      <div className={styles.dropdownMain} onClick={handleButtonClick}>
        {selectedFruit || "자유게시판"}
      </div>
      {/* div를 클릭했다면 아래 코드 실행 */}
      {isOpen && (
        //   게시판 목록 어디에 쓸건지 나오는 리스트
        <div className={styles.dropdownList}>
          {/* 맨위에서 정한 목록 배열을 map으로 풀어서 나열 */}

          {FRUITS?.map((fruit, index) => (
            <div
              key={index}
              className={styles.option}
              onClick={() => handleSelect(fruit)}
            >
              {fruit}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default BoardNavSelect;
