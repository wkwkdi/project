import { useLocation } from "react-router-dom";
import Button from "../Button";
import styles from "./NoticeBoard.module.css";
import styled from "styled-components";
import setting from "../../assets/settings.svg";
import { useEffect, useState } from "react";
import {
  addReply,
  addReview,
  deleteDatas,
  deleteReply,
  deleteReview,
  getBoardContentData,
  increment,
  updateData,
  updateReply,
  updateReview,
  timeChange,
} from "../../api/firebase";
import RenderQuillContent from "./RenderQuillContent";
import Report from "../Report";
import Recommend from "./Recommend";

const EditBtn = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #1e326d;
  border: none;
`;
const DeleteBtn = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: white;
  background-color: #ff6666;
  border: none;
`;

function NoticeBoard({
  content,
  setClickCheck,
  setContent,
  setMainWriteClick,
  setWriteItems,
  setEditBtnClick,
  localInfo,
  deleteBoardList,
  mainBoard,
  timeChange,
}) {
  // 맨아래 리뷰를 작성할때 바뀌도록 하기 위한 state
  const [reviewInput, setReviewInput] = useState("");
  // 대댓글 작성하기 위한 state 추가
  const [replyInput, setReplyInput] = useState("");
  // 어떤 댓글의 댓글달기를 클릭했는지 확인하는 state
  const [reviewBtnCheck, setReviewBtnCheck] = useState(null);
  // 댓글 수정 입력란 state
  const [writeInput, setWriteInput] = useState("");
  // 댓글 수정버튼 눌렀는지 확인하는 state
  const [reviewInputOpen, setReviewInputOpen] = useState(false);
  // 게시글 신고버튼을 눌렀는지 확인하는 state
  const [reportBtn, setReportBtn] = useState(false);
  // 어떤 대댓글의 수정버튼을 클릭했는지 확인 state
  const [replyEditBtn, setReplyEditBtn] = useState(null);
  // 대댓글의 수정 입력란 state
  const [replyEditInput, setReplyEditInput] = useState("");

  // 글쓰기 api 태그로 저장되는 것을 일반 텍스트로 바꿔주기 위해서 담기
  const transformContent = content?.BOARD_CONTENT;

  // BoardList에서 state로 보내진 값 받음
  const temp = useLocation();
  // 받은 것에서 docId만 골라서 변수에 담음
  const tempData = temp?.state;

  // 게시글 내용 가져오는거
  const getBoardData = async () => {
    try {
      const data = await getBoardContentData("Board", tempData || mainBoard);
      if (data) {
        setContent(data);
        console.log(data);
        console.log(content);
      } else {
        console.error("Document does not exist");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // 리뷰를 작성
  const writeReviewClick = async (reviewId) => {
    try {
      if (reviewId === undefined) {
        await addReview(
          "Board",
          content?.docId,
          reviewInput,
          localInfo?.name || "관리자"
        );
        if (localInfo?.docId) {
          await updateData("Member", localInfo?.docId, {
            MEM_COMMENT_NUM: increment(1),
          });
        }
        setReviewInput("");
      } else {
        await addReply(
          "Board",
          content?.docId,
          reviewId,
          replyInput,
          localInfo?.name || "관리자"
        );
        setReplyInput("");
      }

      getBoardData();
    } catch (error) {
      console.error("Error writing review:", error);
    }
  };

  // 어느 댓글에 달건지 id를 받아서 그 댓글의 입력창 열기
  const buttonReplyClick = (uuid) => {
    setReviewBtnCheck(uuid);
    if (reviewInputOpen) {
      setReviewInputOpen("");
    }
  };

  // 리뷰 입력할때 바뀌도록 하는
  const handleWriteReview = (e) => {
    setReviewInput(e.target.value);
  };

  // 대댓글 입력할때 바뀌도록 하는
  const handleWriteReplyInput = (e) => {
    setReplyInput(e.target.value);
  };

  // 수정 입력란 입력할때 바뀌는
  const handleWriteEditInput = (e) => {
    setWriteInput(e.target.value);
  };

  // 대댓글 취소버튼 눌렀을때
  const handleCancelClick = () => {
    setReviewBtnCheck(null);
    setReplyInput("");
  };

  // 댓글 수정버튼 클릭 후에 나오는 취소 버튼 클릭
  const handleReviewCancelBtn = () => {
    setReviewInputOpen("");
    setWriteInput("");
  };

  // 댓글 수정 버튼을 눌렀을때
  const handleReviewEditBtn = (reviewId) => {
    setReviewInputOpen(reviewId);
    if (reviewBtnCheck) {
      setReviewBtnCheck(null);
    }
  };

  // 대댓글의 수정버튼 클릭
  const handleReplyEditBtn = (replyId) => {
    setReplyEditBtn(replyId);
  };

  // 대댓글의 입력란 입력
  const handleReplyInput = (e) => {
    setReplyEditInput(e.target.value);
  };

  // 대댓글 수정버튼 클릭 후 나오는 취소 버튼 클릭
  const handleReplyCancelClick = () => {
    setReplyEditBtn("");
  };

  // 신고버튼을 눌렀을때
  const handleReportClick = () => {
    setReportBtn(true);
  };

  // 추천 또는 비추천 클릭 함수
  const recommendClick = async (text, docId) => {
    // 추천 또는 비추천 여부를 확인하는 변수
    let isRecommendation = false;

    const visitedPosts = JSON.parse(localStorage.getItem("recommend")) || [];
    // console.log(text, docId);

    // 이미 추천한 게시글인지 확인
    if (visitedPosts.includes(tempData)) {
      alert("이미 추천한 게시글입니다.");
      return;
    } else {
      // 추천일 경우
      if (text === "추천" && docId === tempData) {
        isRecommendation = true;
        // 추천 또는 비추천에 따라 증가 또는 감소
        const updatedDoc = await updateData("Board", tempData, {
          BOARD_UP: increment(isRecommendation === true && 1),
        });
      } else {
        isRecommendation = false;
        // 추천 또는 비추천에 따라 증가 또는 감소
        const updatedDoc = await updateData("Board", tempData, {
          BOARD_DOWN: increment(isRecommendation === false && 1),
        });
      }
    }

    // 이미 방문한 게시글인지 확인 후 목록에 추가
    if (!visitedPosts.includes(tempData)) {
      visitedPosts.push(tempData);
      localStorage.setItem("recommend", JSON.stringify(visitedPosts));
    }
    getBoardData();
  };

  // 게시글 수정버튼을 눌렀을때 게시글이 가지고 있는 값을 post로 받음
  const EditBoardList = (e) => {
    setEditBtnClick(true);
    // 클릭한 게시물을 수정 중인 상태로 설정
    // 글쓴 내용 저장
    setWriteItems(content);
    // 글쓰기 컴포넌트 보여주기 위한 렌더링
    setMainWriteClick(true);
    // 게시글 컴포넌트 사라지게 하기 위한 렌더링
    setClickCheck(false);
  };

  // 리뷰에서 수정버튼 클릭 후 답글 버튼 눌렀을때 (리뷰 수정)
  const reviewEditBtn = async (text, reviewId) => {
    console.log(text, reviewId);
    if (text == "답글") {
      const reviewData = await updateReview(
        "Board",
        content?.docId,
        reviewId,
        writeInput
      );
      // 댓글 입력한 곳 지우기 위해
      setWriteInput("");
      // 대댓글 입력창이 열려있을때 리뷰 수정 버튼 클릭시 대댓글입력창 닫기 위해서
      setReviewBtnCheck("");
      getBoardData();
    } else {
      const answer = window.confirm("리뷰를 삭제 하시겠습니까?");
      if (answer) {
        await deleteReview("Board", content?.docId, reviewId);
        getBoardData();
      }
    }
  };

  // 대댓글 수정
  const handleReplyEdit = async (text, reviewId, replyId) => {
    if (text == "수정") {
      const replyEdit = await updateReply(
        "Board",
        content?.docId,
        reviewId,
        replyId,
        replyEditInput
      );
      if (replyEdit) {
        setReplyEditInput("");
        getBoardData();
      }
    } else {
      const answer = window.confirm("대댓글을 삭제 하시겠습니까?");
      if (answer) {
        await deleteReply("Board", content?.docId, reviewId, replyId);
        getBoardData();
      }
    }
  };

  // 조회수 증가 함수
  async function increaseViewsOnce() {
    const visitedPosts = JSON.parse(localStorage.getItem("visited")) || [];

    // 이미 방문한 게시글인지 확인
    if (!visitedPosts.includes(tempData)) {
      // 방문한 게시글이 아니라면 조회수 증가
      const updatedDoc = await updateData("Board", tempData, {
        BOARD_VIEW: increment(1),
      });

      // 방문한 게시글 목록에 추가
      visitedPosts.push(tempData);
      localStorage.setItem("visited", JSON.stringify(visitedPosts));

      getBoardData();
    } else {
      // 이미 방문한 게시글이면 아무 작업 없이 종료
      console.log("Already visited");
      return null;
    }
  }

  // 조회수 증가
  useEffect(() => {
    increaseViewsOnce();
  }, []);

  // 클릭한 게시물마다 그 게시물의 데이터를 가져오게 하는 코드
  useEffect(() => {
    getBoardData();
  }, [tempData]);

  return (
    <>
      {/* 전체 부분 */}
      <div className={styles.containerWrap}>
        {/* 전체 안에 감싼 div */}
        <div className={styles.boxWrap}>
          {/* 상단 제목부분 div */}
          <div className={styles.headerWrap}>
            <h2>{content?.BOARD_TITLE}</h2>
            <div className={styles.boardInfoWrap}>
              <p>작성자: {content?.BOARD_NAME}</p>
              <div className={styles.boardInfo}>
                <p>추천: {content?.BOARD_UP}</p>
                <p>비추천: {content?.BOARD_DOWN}</p>
                <p>조회수: {content?.BOARD_VIEW}</p>
                <p>
                  댓글:
                  {/* 댓글과 대댓글 합친 갯수 잘모름 */}
                  {content?.BOARD_REVIEW
                    ? content.BOARD_REVIEW.reduce(
                        (total, review) =>
                          total +
                          1 + // 현재 댓글을 세기
                          (review.REVIEW_REPLY
                            ? review.REVIEW_REPLY.length
                            : 0), // 대댓글 수 더하기
                        0
                      )
                    : 0}
                </p>
                <p>작성일: {timeChange(content?.BOARD_TIME)}</p>
              </div>
            </div>
          </div>

          {/* 게시판 내용 */}

          <div className={styles.boardContentWrap}>
            {/* 태그로 감싸진 텍스트 일반텍스트로 변환해주는 컴포넌트 */}
            <div className={styles.textImgWrap}>
              <RenderQuillContent htmlContent={transformContent} />
            </div>
            {/* 수정 삭제 신고 버튼 */}
            <Recommend
              content={content}
              recommendClick={recommendClick}
              handleReportClick={handleReportClick}
            />
          </div>

          {/* 수정 삭제 버튼 */}
          {/* 게시글 작성자와 로그인한 사람의 이름이 같아야 수정 삭제 버튼이 생김 */}
          {localInfo?.name == content?.BOARD_NAME && (
            <div className={styles.EditDeleteBtnWrap}>
              <EditBtn
                size="small"
                round
                // 글쓰기 화면을 보여주기 위해서 Board페이지에서 함수 받음
                onClick={EditBoardList}
              >
                수정
              </EditBtn>
              <DeleteBtn
                size="small"
                round
                onClick={() => deleteBoardList(content?.docId)}
              >
                삭제
              </DeleteBtn>
            </div>
          )}

          {/* 댓글 div */}
          <div className={styles.contentWrap}>
            <h2>댓글</h2>
            {/* 맵함수 댓글과 대댓글은 따로 컴포넌트로 만든다 */}
            {content?.BOARD_REVIEW?.map((reviewItem) => (
              <div className={styles.contents}>
                <div
                  key={reviewItem?.REVIEW_ID} // 추가: 각 항목에 고유한 key 부여
                  className={styles.content}
                >
                  {/* 한줄로 딱 space-between */}
                  <div className={styles.contentTitle}>
                    <p>
                      {reviewItem?.REVIEW_USERNAME == "관리자" ? (
                        <div className={styles.replyFlex}>
                          {reviewItem?.REVIEW_USERNAME}
                          <img
                            src={setting}
                            alt="setting"
                            style={{ width: "20px", height: "20px" }}
                          />
                        </div>
                      ) : (
                        reviewItem?.REVIEW_USERNAME
                      )}
                    </p>

                    {/* 사용자 닉네임과 리뷰를 작성한 사람의 닉네임이 같으면 띄움 */}
                    {localInfo?.name == reviewItem?.REVIEW_USERNAME && (
                      <div className={styles.EditWrap}>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            handleReviewEditBtn(reviewItem?.REVIEW_ID)
                          }
                        >
                          수정
                        </p>
                        <p
                          style={{ cursor: "pointer" }}
                          onClick={() =>
                            reviewEditBtn("취소", reviewItem?.REVIEW_ID)
                          }
                        >
                          삭제
                        </p>
                      </div>
                    )}
                  </div>

                  {/* 댓글의 수정버튼을 눌렀을때는 margin없고 안눌렀을때는 margin있으 */}
                  <div
                    className={reviewInputOpen ? styles.clickTemp : styles.temp}
                  >
                    <p className={styles.write}>{reviewItem?.REVIEW_CONTENT}</p>
                    <div
                      className={styles.replyOpen}
                      onClick={() => buttonReplyClick(reviewItem?.REVIEW_ID)}
                    >
                      댓글달기
                    </div>
                  </div>

                  {/* 댓글의 수정버튼을 눌렀을때 나오는 입력창 */}
                  {reviewInputOpen == reviewItem?.REVIEW_ID && (
                    <div className={styles.reviewEditInputContainer}>
                      <div className={styles.reviewEditInput}>
                        <input
                          className={styles.replyInput}
                          type="text"
                          value={writeInput}
                          onChange={handleWriteEditInput}
                          placeholder="수정할 댓글을 입력하세요."
                        />
                      </div>
                      <div className={styles.reviewEditCancelWrap}>
                        {writeInput.length > 0 ? (
                          <button
                            className={styles.reviewEdit}
                            onClick={() =>
                              reviewEditBtn("답글", reviewItem?.REVIEW_ID)
                            }
                          >
                            수정하기
                          </button>
                        ) : (
                          <button disabled className={styles.noReviewEdit}>
                            수정하기
                          </button>
                        )}

                        <div
                          className={styles.reviewDelete}
                          onClick={handleReviewCancelBtn}
                        >
                          취소
                        </div>
                      </div>
                    </div>
                  )}

                  {/* 대댓글이 있는 경우에만 렌더링 */}
                  <div className={styles.reviewWrap}>
                    {reviewItem?.REVIEW_REPLY && (
                      <div className={styles.review}>
                        {/* 댓글의 대댓글작성버튼을 눌렀을때 */}
                        {reviewBtnCheck == reviewItem?.REVIEW_ID && (
                          <div className={styles.replyInputWrap}>
                            <input
                              className={styles.replyInput}
                              type="text"
                              value={replyInput}
                              onChange={handleWriteReplyInput}
                              placeholder="대댓글을 입력하세요."
                            />

                            {/* 댓글과 대댓글 구분하기 위해서 댓글의 고유 ID보냄 */}
                            <div className={styles.replyBtnWrap}>
                              {replyInput.length === 0 ? (
                                <button
                                  disabled
                                  className={styles.replyNoWriteClick}
                                >
                                  답글
                                </button>
                              ) : (
                                <button
                                  className={styles.replyWriteClick}
                                  onClick={() =>
                                    writeReviewClick(reviewItem?.REVIEW_ID)
                                  }
                                >
                                  답글
                                </button>
                              )}

                              <div
                                onClick={handleCancelClick}
                                className={styles.replyCancelClick}
                              >
                                취소
                              </div>
                            </div>
                          </div>
                        )}

                        {/* 대댓글 표시 */}
                        {reviewItem?.REVIEW_REPLY?.map((reply) => (
                          <div
                            className={styles.replyContainer}
                            key={reply?.REPLY_ID}
                          >
                            <div className={styles.replyWrap}>
                              <p className={styles.replyName}>
                                {reply?.REPLY_USERNAME == "관리자" ? (
                                  <div className={styles.replyFlex}>
                                    {reply?.REPLY_USERNAME}
                                    <img
                                      src={setting}
                                      alt="setting"
                                      style={{ width: "20px", height: "20px" }}
                                    />
                                  </div>
                                ) : (
                                  reply?.REPLY_USERNAME
                                )}
                              </p>
                              {/* 현재 사용자의 닉네임과 대댓글을 작성한 유저의 닉네임이 같으면 대댓글의 수정 삭제 버튼 생기기 */}
                              {localInfo?.name == reply?.REPLY_USERNAME && (
                                // 대댓글 수정 삭제
                                <div className={styles.replyEditDeleteWrap}>
                                  <p
                                    className={styles.replyEditDelete}
                                    onClick={() =>
                                      handleReplyEditBtn(reply?.REPLY_ID)
                                    }
                                  >
                                    수정
                                  </p>
                                  <p
                                    className={styles.replyEditDelete}
                                    onClick={() =>
                                      handleReplyEdit(
                                        "삭제",
                                        reviewItem?.REVIEW_ID,
                                        reply?.REPLY_ID
                                      )
                                    }
                                  >
                                    삭제
                                  </p>
                                </div>
                              )}
                            </div>
                            <p className={styles.replyContent}>
                              {reply?.REPLY_CONTENT}
                            </p>

                            {replyEditBtn == reply?.REPLY_ID && (
                              // 대댓글의 수정버튼을 눌렀을때
                              <div className={styles.replyInputEditWrap}>
                                {/* 대댓글의 입력창 */}
                                <input
                                  className={styles.replyInput}
                                  type="text"
                                  placeholder="수정할 대댓글을 입력하세요"
                                  onChange={handleReplyInput}
                                  value={replyEditInput}
                                />
                                {/* 대댓글의 수정 취소 */}
                                <div className={styles.replyEditCancelWrap}>
                                  <p
                                    className={styles.replyEdit}
                                    onClick={() =>
                                      handleReplyEdit(
                                        "수정",
                                        reviewItem?.REVIEW_ID,
                                        reply?.REPLY_ID
                                      )
                                    }
                                  >
                                    수정하기
                                  </p>
                                  <p
                                    className={styles.replyCancel}
                                    onClick={handleReplyCancelClick}
                                  >
                                    취소
                                  </p>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* 댓글 작성란 */}
            <div className={styles.contentWrite}>
              <p className={styles.TextReview}>댓글작성</p>
              <div className={styles.nickName}>
                {localInfo?.name || "관리자"}
              </div>
              <input
                type="text"
                value={reviewInput}
                onChange={handleWriteReview}
                className={styles.input}
              />
            </div>
            <div className={styles.reviewButton}>
              {/* 댓글과 대댓글 구분하기 위해서 undefined를 보내 리뷰작성인 것을 알려주기 위함 */}
              <EditBtn onClick={() => writeReviewClick(undefined)} size="small">
                댓글 작성
              </EditBtn>
            </div>
          </div>
        </div>
      </div>
      {reportBtn && (
        <Report
          localInfo={localInfo}
          setReportBtn={setReportBtn}
          content={content}
        />
      )}
    </>
  );
}

export default NoticeBoard;
