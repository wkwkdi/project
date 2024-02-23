import BoardWriting from "../components/Board-components/BoardWriting";
import BoardBanner from "../components/Board-components/BoardBanner";
import BoardNav from "../components/Board-components/BoardNav";
import BoardFilter from "../components/Board-components/BoardFilter";
import BoardList from "../components/Board-components/BoardList";
import { useContext, useEffect, useRef, useState } from "react";
import NoticeBoard from "../components/Board-components/NoticeBoard";
import { deleteDatas, getBoardContentData } from "../api/firebase";
import { useLocation } from "react-router-dom";
import { BuddizContext } from "../contexts/buddizContexts";

function Board() {
  // const selectedItemRef = useRef("000");
  const [selectedItem, setSelectedItem] = useState("000");
  // 메인 글쓰기버튼(false 기본)
  const [mainWriteclick, setMainWriteClick] = useState(false);
  // NoticeBoard에서 글수정버튼 확인(메인 글쓰기 버튼과 구분하기 위해서)
  const [editBtnClick, setEditBtnClick] = useState(false);
  // db내용 저장 state
  const [items, setItems] = useState([]);
  // 게시판 리스트를 클릭했을때 게시판 내용이 나오게 하는 state
  const [clickCheck, setClickCheck] = useState(false);
  // 글쓴 내용 저장 state
  const [writeItems, setWriteItems] = useState("");
  // 글쓰기 해서 얻은 게시글 데이터 저장하기 위한 state
  const [content, setContent] = useState(null);
  // 메인페이지에서 게시글 눌렀을때 가져오는 값 담기 state
  const [mainBoard, setMainBoard] = useState("");
  // 로컬스토리지 데이터
  const [localInfo, setLocalInfo] = useState({
    name: "",
    docId: "",
  });
  const [managerInfo, setManagerInfo] = useState("");

  const bodyData = useLocation();
  // 처음에만 가져오는 코드
  useEffect(() => {
    // 메인페이지에서 클릭했을때 보여주는거 봐야함 포기해야할수도
    // Body에서 state로 보내진 값 받음

    // 받은 것에서 docId만 골라서 변수에 담음
    const bodyState = bodyData?.state;
    setMainBoard(bodyState);
  }, [bodyData?.state]);

  let account;
  let manager;

  useEffect(() => {
    // 계정 정보를 가지고 오기 위한 변수
    if (localStorage.getItem("Member")) {
      account = JSON.parse(localStorage.getItem("Member"));
      setLocalInfo({
        name: account[0]?.MEM_NICKNAME,
        docId: account[0]?.MEM_docId,
      });
    } else {
      manager = JSON.parse(localStorage.getItem("Manager"));
      console.log(manager);
      setManagerInfo(manager[0]?.MG_docId);
    }
  }, []);

  console.log(localInfo);
  console.log(manager);
  console.log(managerInfo);

  const handleMainWriteBtn = () => {
    setWriteItems("");
    setMainBoard("");
    setMainWriteClick(true);
  };

  const deleteBoardList = async (docId) => {
    const deleteCheck = await deleteDatas("Board", docId);
    console.log(deleteCheck);
    if (deleteCheck === true) {
      alert("게시글이 삭제되었습니다.");
      // 수동으로 삭제한 항목 제거
      setClickCheck(false);
      setItems((prevItems) =>
        prevItems.filter((item) => item?.docId !== docId)
      );
    } else {
      alert("삭제 못함");
    }
  };

  // 댓글 시간변환
  function timeChange(stemp) {
    const date = new Date(stemp);
    // const hours = date.getHours();
    // const dayAndNight = hours > 11 ? "오후" : "오전";
    // const minutes = date.getMinutes();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    console.log(day);
    const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    }`;

    // console.log(formattedDate); // "yyyy-mm-dd" 형식의 날짜 출력
    return formattedDate;
  }

  return (
    <>
      <BoardBanner />
      {clickCheck ? (
        <NoticeBoard
          setContent={setContent}
          content={content}
          setClickCheck={setClickCheck}
          setItems={setItems}
          setEditBtnClick={setEditBtnClick}
          setWriteItems={setWriteItems}
          setMainWriteClick={setMainWriteClick}
          localInfo={localInfo}
          manager={manager}
          deleteBoardList={deleteBoardList}
          mainBoard={mainBoard}
          timeChange={timeChange}
        />
      ) : mainBoard ? (
        <NoticeBoard
          setContent={setContent}
          content={content}
          setClickCheck={setClickCheck}
          setItems={setItems}
          setEditBtnClick={setEditBtnClick}
          setWriteItems={setWriteItems}
          setMainWriteClick={setMainWriteClick}
          localInfo={localInfo}
          manager={manager}
          deleteBoardList={deleteBoardList}
          mainBoard={mainBoard}
          timeChange={timeChange}
        />
      ) : (
        ""
      )}
      <BoardNav
        setSelectedItem={setSelectedItem}
        selectedItem={selectedItem}
        mainWriteclick={mainWriteclick}
        setMainWriteClick={setMainWriteClick}
      />
      {mainWriteclick ? (
        <BoardWriting
          setMainWriteClick={setMainWriteClick}
          initialContent={writeItems ? writeItems?.BOARD_CONTENT : ""}
          initialTitle={writeItems ? writeItems?.BOARD_TITLE : ""}
          localInfo={localInfo}
          editBtnClick={editBtnClick}
          content={content}
          managerInfo={managerInfo}
        />
      ) : (
        <>
          <BoardFilter
            items={items}
            setItems={setItems}
            selectedItem={selectedItem}
          />
          <BoardList
            setClickCheck={setClickCheck}
            items={items}
            handleMainWriteBtn={handleMainWriteBtn}
            mainWriteclick={mainWriteclick}
            selectedItem={selectedItem}
            timeChange={timeChange}
          />
        </>
      )}

      {/* true면은 글쓰기 버튼 안보이게 */}
    </>
  );
}

export default Board;
