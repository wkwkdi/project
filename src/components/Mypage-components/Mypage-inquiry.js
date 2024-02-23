import React, { useState, useEffect, useRef } from "react";
import { addChat, getChat, serverTimestamp, updateChat } from "../../api/firebase";
import styles from "./Mypage-inquiry.module.css";

function Inquiry() {
  const [data, setData] = useState([]);
  // 채팅 입력창 바뀌는 state
  const [chat, setChat] = useState("");
  //로컬 docId 저장 state
  const [localData, setLocalData] = useState({
    docId: "",
    name: "",
  });
  // 시간 state
  const [time, setTime] = useState("");

  const chatContainerRef = useRef(null);


  useEffect(() => {
    const localInfo = JSON.parse(localStorage.getItem("Member"));
    setLocalData({
      name: localInfo[0]?.MEM_NICKNAME,
      docId: localInfo[0]?.MEM_docId,
    });
    console.log(localData?.docId);
  }, []);
  const Chat2 = async () => {
    console.log(localData?.docId);
    const updatedDocRef = await updateChat("Member", localData?.docId, "MemberChat", { MC_READ: true });
  }
  useEffect(() => {
    if (localData?.docId) {
      Chat2()
    }
  }, [localData?.docId]);
  // 댓글 시간변환
  function timeChange(stemp) {
    const date = new Date(stemp);
    const hours = date.getHours();
    const dayAndNight = hours > 11 ? "오후" : "오전";
    const minutes = date.getMinutes();
    const formattedDate = `${dayAndNight} ${hours}:${minutes}`;

    // console.log(formattedDate); // "yyyy-mm-dd" 형식의 날짜 출력
    return formattedDate;
  }

  const getData = async () => {
    console.log(localData?.docId);
    const getData = await getChat("Member", localData?.docId, "MemberChat");
    setData(getData);
  };

  useEffect(() => {
    if (localData?.docId) {
      getData();
    }
  }, [localData?.docId]);

  const handleChatChange = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 막기
    const addData = await addChat("Member", localData?.docId, "MemberChat", {
      MC_NAME: localData?.name,
      MC_CONTENT: chat,
      MC_TIME: new Date().getTime(),
    });
    // 채팅 목록 상태 업데이트
    setData((prevData) => [...prevData, addData]);
    setChat("");
  };

  console.log(data);

  useEffect(() => {
    // 채팅이 업데이트될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.title}>1:1 문의하기</div>
          <div ref={chatContainerRef} className={styles.textShow}>
            {data?.map((chat) => (
              <div
                key={chat?.docId}
                className={
                  chat?.MC_NAME == "관리자"
                    ? styles.chatManager
                    : styles.chatUser
                }
              >
                <div className={styles.chatName}>{chat?.MC_NAME}</div>
                <div className={styles.chatContent}>{chat?.MC_CONTENT}</div>
                <div className={styles.chatTime}>
                  {timeChange(chat?.MC_TIME)}
                </div>
              </div>
            ))}
          </div>
        </div>
        <form onSubmit={handleSubmit} className={styles.inputBtnWrap}>
          <input
            className={styles.textInput}
            value={chat}
            type="text"
            onChange={handleChatChange}
          />
          {chat.length > 0 && (
            <button className={styles.chatBtn} type="submit">
              전송
            </button>
          )}
        </form>
      </div>
    </>
  );
}

export default Inquiry;
