import styles from "./BoardList.module.css";
import { useEffect, useRef, useState } from "react";
import BoardPagination from "./BoardPagnation";
import { useNavigate } from "react-router-dom";
import Button from "../Button";
import styled from "styled-components";
import BoardEmpty from "./BoardEmpty";
import { increment, updateData } from "../../api/firebase";

const WriteButton = styled(Button)`
  width: 98px;
  height: 36px;
  background-color: #1e326d;
  color: white;
  font-size: 16px;
  font-weight: bold;
  border-radius: 9999px;
`;

// 목록과 숫자
function BoardList({
  items,
  setClickCheck,
  mainWriteclick,
  handleMainWriteBtn,
  selectedItem,
  timeChange,
}) {
  // 현재페이지
  const [currentPage, setCurrentPage] = useState(1);
  // 페이지당  포스트 수
  const [postsPerPage, setPostsPerPage] = useState(10);

  const itemRefs = useRef([]);
  // const it = useRef();
  const navigate = useNavigate();

  const handleListClick = async (e, index) => {
    setClickCheck(true);

    // 화면을 이동합니다.
    window.scrollTo({ top: 400, behavior: "smooth" });
    // docId를 보내주기 위한 코드
    const location = JSON.stringify(itemRefs.current[index].value);
    // docId가 ""로 감싸져 있어서 풀어서 보냄
    const docId = location?.replace(/"/g, "");

    // if (view === undefined) {
    //   getBoardData();
    // }
    navigate("/board", { state: docId });
  };

  // 현재 페이지 * 게시물 갯수 = 마지막인덱스 번호
  const indexOfLast = currentPage * postsPerPage;
  // 마지막 인덱스 번호 - 게시물 갯수 = 첫번째인덱스 번호
  const indexOfFirst = indexOfLast - postsPerPage;
  // 파이어베이스 에서 가져온 데이터를 첫번째 부터 마지막 인덱스 까지 잘라서 currentPosts에 넣음
  // const currentPosts = items.slice(indexOfFirst, indexOfLast);
  // 페이지 수를 받아서 현재페이지 state에 저장 후 paginate에 넣음
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // 모든 게시물 중에서 BOARD_CODE가 "001"인 것들(공지사항)을 추출
  const noticePosts = items.filter((item) => item.BOARD_CODE === "001");
  // 나머지 게시물 중에서 현재 페이지에 해당하는 부분만 추출
  const otherPosts = items
    .filter((item) => item.BOARD_CODE !== "001")
    .slice(indexOfFirst, indexOfLast);

  // 공지사항인애들, 공지사항제외한 애들 스프레드해서 배열풀어서 배열로 묶음
  const currentPosts = [...noticePosts, ...otherPosts].slice(
    indexOfFirst,
    indexOfLast
  );

  const isFirstPage = currentPage === 1;
  const visiblePosts = isFirstPage ? currentPosts : otherPosts;

  return (
    <>
      <div>
        <div className={styles.container}>
          <div className={`${styles.item} ${styles.itemColor}`}>
            {/* 상단 묶어주기 위한 코드 */}
            <div className={styles.title}>글제목</div>
            <div className={styles.itemWrap}>
              <div>작성자</div>
              <div style={{ marginRight: `20px` }}>조회수</div>
              <div style={{ marginRight: `20px` }}>날짜</div>
            </div>
          </div>
          {/* 게시판 목록 뜨는 곳 */}
          {/* <div> */}
          {visiblePosts.length > 0 ? (
            <div>
              {visiblePosts?.map((item, index) => (
                <div
                  onClick={(e) => {
                    handleListClick(e, index);
                  }}
                  className={`${styles.item} ${
                    item?.BOARD_CODE == "001" && selectedItem == "000"
                      ? styles.itemColor
                      : ""
                  }`}
                  key={item?.docId}
                >
                  <input
                    ref={(el) => (itemRefs.current[index] = el)}
                    type="hidden"
                    value={item?.docId}
                  />
                  <div
                    className={item?.BOARD_REVIEW ? styles.titleViewWrap : ""}
                  >
                    <div>{item?.BOARD_TITLE}</div>
                    {/* 게시물에 댓글이 있는 경우 댓글 수 표시 */}
                    {item?.BOARD_REVIEW && (
                      <p>
                        {/* 댓글과 대댓글 합친 갯수 잘모름 */}[
                        {item?.BOARD_REVIEW.reduce(
                          (acc, curr) =>
                            acc +
                            1 +
                            (curr.REVIEW_REPLY ? curr.REVIEW_REPLY.length : 0),
                          0
                        )}
                        ]
                      </p>
                    )}
                  </div>

                  {/* 이쪽부분 css 바꿔야함 */}
                  <div className={styles.itemWrap}>
                    <div className={styles.itemName}>
                      <div>{item?.BOARD_NAME}</div>
                    </div>
                    <div className={styles.itemView}>
                      <div>{item?.BOARD_VIEW}</div>
                    </div>
                    <div>{timeChange(item?.BOARD_TIME)}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <BoardEmpty />
          )}
          {/* </div> */}
        </div>
        <div className={styles.footer}>
          {/* 첫번째는 빈공간 */}
          <div></div>
          {/* 게시판 번호 컴포넌트 */}
          <BoardPagination
            postsPerPage={postsPerPage}
            totalPosts={items.length}
            paginate={paginate}
          />
          {/* 게시판 번호 컴포넌트 끝 */}
          <div>
            {mainWriteclick || (
              <WriteButton onClick={handleMainWriteBtn}>글쓰기</WriteButton>
            )}
          </div>

          {/* <div>글쓰기</div> */}
        </div>
      </div>
    </>
  );
}

export default BoardList;
