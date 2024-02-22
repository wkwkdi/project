import React from "react";
import { useState, createContext } from "react";

// context 객체 생성
const BuddizContext = createContext();

export function BuddizProvider({ defaultValue = "ko", children }) {
  const [locale, setLocale] = useState(defaultValue);
  const [userInfo, setUserInfo] = useState({});
  const [thema, setThema] = useState("");
  const [headIconLeder, setHeadIconLeder] = useState(false);
  const [chatOnOff, setChatOnOff] = useState(true);
  const [userStop, setUserStop] = useState("");
  const [count, setCount] = useState(0);
  const toggle = () => {
    setHeadIconLeder((prev) => !prev);
  };

  return (
    <BuddizContext.Provider
      value={{
        locale,
        setLocale,
        userInfo,
        setUserInfo,
        thema,
        setThema,
        headIconLeder,
        setHeadIconLeder,
        toggle,
        chatOnOff,
        setChatOnOff,
        count,
        setCount,
      }}
    >
      {children}
    </BuddizContext.Provider>
  );
}

export { BuddizContext };

// 커스텀 훅 제작 예정 구역?
