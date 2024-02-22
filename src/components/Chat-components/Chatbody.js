import React, { useState, useEffect } from "react";
import { buddyChat, db, getAddress } from "../../api/firebase";
import {
  add,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import styles from "./Chatbody.module.css";
import { useLocation } from "react-router-dom";
import Chatnav from "./Chatnav";

const otherUser = { MEM: "dd" };

function Chat() {
  const { v4: uuidv4 } = require("uuid");
  const uuid = uuidv4;
  const currentUser = JSON.parse(localStorage.getItem("Member"));
  console.log(currentUser);
  const [otherName, setOtherName] = useState([]);
  const [otherId, setOtherId] = useState("uuid");
  const [chatdocId, setChatdocId] = useState([]);
  // 처음데이터 저장
  const [getFirst, setGetFirst] = useState([]);
  console.log(otherName);
  console.log(otherId);
  // location data저장
  const [chatData, setChatData] = useState("");
  // 색상 state
  const [color, setColor] = useState(0);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(``);

  const chatRoomData = useLocation();
  console.log(chatRoomData?.state);
  useEffect(() => {
    setChatData(chatRoomData?.state);
  }, [chatRoomData?.state]);

  // console.log(message);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const getDatas = await getAddress("Chat");
        console.log(getDatas);
        if (getDatas) {
          setGetFirst(getDatas[0]?.id);
          console.log(getDatas[0]?.id);
          setOtherId(getDatas[0]?.id);
          // setOtherId(getDatas[0]?.id);
        }
        // const getChatDatas = await buddyChat(
        //   "Chat",
        //   getDatas[0]?.id,
        //   "messages"
        // );
        // setChatdocId(getChatDatas);
      } catch (error) {
        console.error("데이터를 불러오는 동안 오류가 발생했습니다:", error);
      }
    };

    fetchData();
  }, [getFirst]);

  console.log(getFirst?.id);
  console.log(chatdocId[0]?.id);

  useEffect(() => {
    console.log(otherId);
    if (getFirst) {
      const docSelect = otherId || chatData || getFirst;
      const ChatRef = doc(db, "Chat", docSelect);
      const unsubscribe = onSnapshot(
        query(
          collection(ChatRef, "messages"), // getFirst.id로 수정
          orderBy("createdAt", "asc")
        ),
        (snapshot) => {
          const messageList = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          console.log("onSnapshot:", onSnapshot);
          setMessages(messageList);
        }
      );

      return () => unsubscribe();
    }
  }, [otherId, getFirst]);

  console.log(messages);

  // 채팅방 리스트 불러오기
  useEffect(() => {
    const names = [];
    const unsubscribe = onSnapshot(collection(db, "Chat"), (snapshot) => {
      snapshot.docs.map((doc) => {
        const data = doc.data();
        const room = { id: doc.id, ...data };
        names.push(room);
      });
      setOtherName(names);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async (event) => {
    console.log(otherId);
    event.preventDefault();
    const dataSelect = otherId || chatData || getFirst;
    const chatRef = doc(db, "Chat", otherId);
    const messageCollection = collection(chatRef, "messages");

    if (message) {
      await addDoc(messageCollection, {
        text: message,
        createdAt: new Date(),
        senderId: currentUser[0].MEM,
      });

      setMessage("");
    }
  };

  const handleChetChange = (text, count) => {
    setColor(count);
    // const target = e.target.textContent;
    // console.log(target);
    setOtherId(text);
    setChatdocId([]);
  };
  console.log(otherId);

  const formatTime = (timestamp) => {
    if (timestamp && timestamp.seconds) {
      const date = new Date(timestamp.seconds * 1000);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else {
      return "";
    }
  };
  console.log(otherName[0]?.docId[0]);
  return (
    <>
      <Chatnav />
      <div className={styles.container}>
        <ul className={styles.chatContainer}>
          {otherName.map((el, index) => (
            <li
              className={
                color !== index ? styles.chatlist : styles.chatlistColor
              }
              key={el?.id}
              onClick={() => handleChetChange(el?.id, index)}
            >
              {el?.TITLE}
              {color === index
                ? el?.docId?.map((name, index) => <div key={index}>{name}</div>)
                : ""}
            </li>
          ))}
        </ul>
        <div className={styles.messages}>
          {messages.map((message) => (
            <div
              key={message.id}
              className={`${styles.msg} ${
                message.senderId === currentUser[0].MEM
                  ? `${styles.sent}`
                  : `${styles.receive}`
              }`}
            >
              <div className={styles.messageContainer}>
                <p>{message.text}</p>
                <div className={styles.messageInfo}>
                  {/* <span>
                    {new Date(
                      message.createdAt.seconds * 1000
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span> */}
                  <span>{formatTime(message.createdAt)}</span>
                  {message.readBy &&
                    message.readBy.includes(currentUser[0].MEM) && (
                      <span>읽음</span>
                    )}
                </div>
              </div>
            </div>
          ))}
          {}
          <form className={styles.messageForm} onSubmit={sendMessage}>
            <input
              className={styles.messageInput}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              // placeholder="메시지를 입력하세요"
            />
            <button className={styles.button} type="submit">
              보내기
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Chat;
