import styled from "styled-components";
import Button from "../Button";
import styles from "./BoardFilter.module.css";
import { getBoardData } from "../../api/firebase";
import { useEffect, useRef, useState } from "react";

const SelectButton = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: ${(props) => (props.location == "최신순" ? "#ffffff" : "black")};
  background-color: ${(props) =>
    props.location == "최신순" ? "#1e326d" : "#ffffff"};
  border-radius: 9999px;
  border: 1px solid
    ${(props) => (props.location == "최신순" ? "#ffffff" : "black")};
`;

const NoSelectButton = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  border-radius: 9999px;
  color: ${(props) => (props.location == "최신순" ? "black" : "#ffffff")};
  border: 1px solid
    ${(props) => (props.location == "최신순" ? "black" : "#ffffff")};
  background-color: ${(props) =>
    props.location == "최신순" ? "#ffffff" : "#1e326d"};
`;

const SearchButton = styled(Button)`
  border-radius: 9999px;
  border: none;
  font-size: 16px;
  font-weight: bold;
  background-color: #1e326d;
  color: white;
`;

let listItems = [];

// 필터랑 검색
function BoardFilter({ items, setItems, selectedItem }) {
  // 버튼 클릭한 값 state
  const [location, setLocation] = useState("최신순");
  // 검색 입력 state
  const [searchInput, setSearchInput] = useState("");
  const recentRef = useRef();
  const checkRef = useRef();

  const recentBtnClick = async () => {
    const rBtnRef = recentRef.current.textContent;
    setLocation(rBtnRef);

    const conditionalData = await getBoardData(
      "Board",
      selectedItem,
      "BOARD_TIME"
    );
    listItems = conditionalData;
    setItems(conditionalData);
  };
  const checkBtnClick = async () => {
    const cBtnRef = checkRef.current.textContent;
    console.log(cBtnRef);
    setLocation(cBtnRef);
    const conditionalData = await getBoardData(
      "Board",
      selectedItem,
      "BOARD_VIEW"
    );
    listItems = conditionalData;
    setItems(conditionalData);
  };

  const handleSearchInput = (e) => {
    setSearchInput(e.target.value);
  };

  // 버튼 클릭했을때 검색
  const searchBtnClick = (e) => {
    e.preventDefault();
    // 검색어를 이용하여 게시물 필터링
    const searchItems = listItems.filter(({ BOARD_TITLE }) =>
      BOARD_TITLE.includes(searchInput)
    );
    setItems(searchItems);
  };

  // input에 엔터눌렀을때 검색
  const searchEnter = (e) => {
    e.preventDefault();
    // 검색어를 이용하여 게시물 필터링
    const searchItems = listItems.filter(({ BOARD_TITLE }) =>
      BOARD_TITLE.includes(searchInput)
    );
    setItems(searchItems);
  };

  useEffect(() => {
    if (recentRef) {
      recentBtnClick();
    } else if (checkRef) {
      checkBtnClick();
    }
  }, [selectedItem]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.wrap}>
          <div className={styles.filter}>
            <SelectButton
              location={location}
              ref={recentRef}
              onClick={recentBtnClick}
              size="small"
            >
              최신순
            </SelectButton>
            <NoSelectButton
              location={location}
              ref={checkRef}
              onClick={checkBtnClick}
              size="small"
            >
              조회순
            </NoSelectButton>
          </div>
          <form className={styles.search} onSubmit={searchEnter}>
            <input
              type="text"
              className={styles.input}
              value={searchInput}
              onChange={handleSearchInput}
            />
            <SearchButton onClick={searchBtnClick} type="submit" size="small">
              검색
            </SearchButton>
          </form>
        </div>
      </div>
    </>
  );
}

export default BoardFilter;
