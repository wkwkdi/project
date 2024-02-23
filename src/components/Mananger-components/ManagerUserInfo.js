// 관리자 페이지 사용자 정보
import styled from "styled-components";
import styles from "./ManagerUserInfo.module.css";
// import Button from "../Button";
import Button from "../Button";
import { useContext, useEffect, useRef, useState } from "react";
import { addChat, getChat, updateData } from "../../api/firebase";
import setting from "../../assets/settings.svg";
import { BuddizContext } from "../../contexts/buddizContexts";

const DeleteBtn = styled(Button)`
  font-size: 16px;
  color: red;
  font-weight: bold;
`;

const EditBtn = styled(Button)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 50px;
`;

function ManagerMember({ member, handleLoad }) {
  // 사용자와의 문의? 데이터 담는 state
  const [data, setData] = useState([]);
  // 관리자가 채팅 입력 값 state
  const [chat, setChat] = useState("");
  // 시간 state
  const [time, setTime] = useState("");
  // 버튼 클릭 확인 state
  const [change, setChange] = useState(false);
  const chatContainerRef = useRef();

  const { count, setCount } = useContext(BuddizContext);

  const getData = async () => {
    const getData = await getChat("Member", member?.id, "MemberChat");
    setData(getData);
  };

  useEffect(() => {
    if (member?.id) {
      getData();
    }
  }, [member?.id]);

  const handleChatChange = (e) => {
    setChat(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // 폼 제출 기본 동작 막기
    const addData = await addChat("Member", member?.id, "MemberChat", {
      MC_NAME: "관리자",
      MC_CONTENT: chat,
      MC_TIME: new Date().getTime(),
      MC_READ: false,
    });
    // 채팅 목록 상태 업데이트
    setData((prevData) => [...prevData, addData]);
    setCount(count + 1);
    setChat("");
  };

  console.log(count);

  useEffect(() => {
    // 채팅이 업데이트될 때마다 스크롤을 맨 아래로 이동
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [data]);

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

  const handleoutBtn = async () => {
    const out = await updateData("Member", member?.id, {
      MEM_SANCTIONS: !change,
    });
    if (change === true) {
      alert("제재하였습니다.");
    } else {
      alert("제재를 해제하였습니다.");
    }
  };

  const handleSettingClick = async (text) => {
    const changeData = window.prompt("수정할 데이터를 입력하세요.");
    if (changeData !== null) {
      if (text == "nick") {
        const data = await updateData("Member", member?.id, {
          MEM_NICKNAME: changeData,
        });
        if (data === undefined) {
          alert("변경되었습니다.");
          handleLoad();
        }
      } else if (text == "pw") {
        const data = await updateData("Member", member?.id, {
          MEM_PASSWORD: changeData,
        });
        if (data === undefined) {
          alert("변경되었습니다.");
          handleLoad();
        }
      } else {
        const data = await updateData("Member", member?.id, {
          MEM_POINT: parseInt(changeData, 10),
        });
        if (data === undefined) {
          alert("변경되었습니다.");
          handleLoad();
        }
      }
    } else {
      return;
    }
  };

  return (
    <>
      {/* 바디 */}
      <div className={styles.managerMemberContainer}>
        {/* 오른쪽 전체 */}
        <div className={styles.managerMemberRight}>
          <div className={styles.managerMemberHeader}>
            <p>회원 정보</p>
            <DeleteBtn onClick={handleoutBtn} size="small" round>
              제재
            </DeleteBtn>
          </div>
          {member && (
            // 오른쪽에서 info묶는용도
            <div className={styles.managerInfoContainer}>
              {/* 오른쪽에서 왼쪽 영역 -------------------------------------- */}
              <div>
                {/* 유저 이름 */}
                <div className={styles.managerInfo}>
                  <p>이름</p>
                  <div>{member?.MEM_NAME}</div>
                </div>

                {/* 유저 닉네임 */}
                <div className={styles.memberInfoWrap}>
                  <div className={styles.managerInfo}>
                    <p>닉네임</p>
                    <div>{member?.MEM_NICKNAME}</div>
                  </div>
                  <div
                    className={styles.settingBtn}
                    onClick={() => handleSettingClick("nick")}
                  >
                    <img src={setting} alt="setting" />
                  </div>
                </div>

                {/* 유저 성별 */}
                <div className={styles.managerInfo}>
                  <p>성별</p>
                  <div>{member?.MEM_GENDER}</div>
                </div>

                {/* 유저 이메일 */}
                <div className={styles.managerInfo}>
                  <p>이메일</p>
                  <div>{member?.MEM}</div>
                </div>

                {/* 유저 비밀번호 */}
                <div className={styles.memberInfoWrap}>
                  <div className={styles.managerInfo}>
                    <p>비밀번호</p>
                    <div>{member?.MEM_PASSWORD}</div>
                  </div>
                  <div
                    className={styles.settingBtn}
                    onClick={() => handleSettingClick("pw")}
                  >
                    <img src={setting} alt="setting" />
                  </div>
                </div>

                {/* 유저 전화번호 */}
                <div className={styles.managerInfo}>
                  <p>전화번호</p>
                  <div>{member?.MEM_PHONE}</div>
                </div>

                {/* 유저 주소 */}
                <div className={styles.managerInfo}>
                  <p>주소</p>
                  <div>{member?.MEM_ADDRESS?.jibunAddress}</div>
                </div>
              </div>
              {/* 오른쪽에서 오른쪽 영역 --------------------------------------- */}
              <div>
                {/* 유저 가입일 */}
                <div className={styles.managerInfo}>
                  <p>가입일</p>
                  <div>{member?.MEM_JOINDATE}</div>
                </div>

                {/* 유저 댓글 작성수 */}
                <div className={styles.managerInfo}>
                  <p>댓글 작성수</p>
                  <div>{member?.MEM_COMMENT_NUM}</div>
                </div>

                {/* 유저 상품후기 */}
                <div className={styles.managerInfo}>
                  <p>상품후기</p>
                  <div>{member?.MEM_STORE_REVIEW}</div>
                </div>

                {/* 유저 구매량 */}
                <div className={styles.managerInfo}>
                  <p>구매량</p>
                  <div>{member?.MEM_STORE_PURCHASE}</div>
                </div>

                {/* 유저 포인트 */}
                <div className={styles.memberInfoWrap}>
                  <div className={styles.managerInfo}>
                    <p>포인트</p>
                    <div>{member?.MEM_POINT}P</div>
                  </div>
                  <div
                    className={styles.settingBtn}
                    onClick={() => handleSettingClick("point")}
                  >
                    <img src={setting} alt="setting" />
                  </div>
                </div>

                {/* 유저 로그인 횟수 */}
                <div className={styles.managerInfo}>
                  <p>버디이용건수</p>
                  <div>{member?.MEM_LOGIN_COUNT}</div>
                </div>

                {/* 유저 로그인 횟수 */}
                <div className={styles.managerInfo}>
                  <p>중지</p>
                  <div>{member?.MEM_SANCTIONS ? "중지" : "진행"}</div>
                </div>
              </div>
            </div>
          )}
          <div className={styles.line}></div>
          {/* 문의? 채팅 창 */}
          <div ref={chatContainerRef} className={styles.managerChatWrap}>
            {data?.map((chat) => (
              <div
                key={chat?.docId}
                className={
                  chat?.MC_NAME == "관리자"
                    ? styles.managerChat
                    : styles.userChat
                }
              >
                <div>{chat?.MC_NAME}</div>
                <div>{chat?.MC_CONTENT}</div>
                {/* 시간 오른쪽 */}
                <div className={styles.managerChatTime}>
                  {timeChange(chat?.MC_TIME)}
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.managerInputBtnWrap}>
            <input
              className={styles.managerTextInput}
              value={chat}
              type="text"
              onChange={handleChatChange}
            />
            {chat.length > 0 && (
              <button className={styles.managerChatBtn} type="submit">
                전송
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

export default ManagerMember;
