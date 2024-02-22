import React, { useState, useEffect } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD-4c_7gQbrZSpy5KmoK3_BQpewcHecei0",
  authDomain: "dwos-b7eb5.firebaseapp.com",
  databaseURL: "https://dwos-b7eb5-default-rtdb.firebaseio.com",
  projectId: "dwos-b7eb5",
  storageBucket: "dwos-b7eb5.appspot.com",
  messagingSenderId: "19129191890",
  appId: "1:19129191890:web:f6aa77b392283f93f78c0b",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [member, setMember] = useState(
    JSON.parse(localStorage.getItem("chat")) || {}
  );

  // Firestore에서 메시지 가져오기
  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      orderBy("timestamp", "asc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const loadedMessages = [];
      querySnapshot.forEach((doc) => {
        loadedMessages.push(doc.data());
      });
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [db]);

  // 메시지 전송
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      await addDoc(collection(db, "messages"), {
        text: newMessage,
        userName: member.id, // 사용자 이름 추가
        timestamp: new Date(),
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.userName}:</strong> {message.text} -{" "}
            {message.timestamp.toDate().toLocaleTimeString()}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button onClick={sendMessage}>전송</button>
      </div>
    </div>
  );
};

export default ChatApp;
