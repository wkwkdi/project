import { Link, useNavigate } from "react-router-dom";
import styles from "./Header.module.css";
import Container from "./Container";
import logo from "../assets/LOGO.svg";
import basket from "../assets/basket.svg";
import mail from "../assets/letter.svg";
import user from "../assets/user.svg";
import Img from "./Img";
import { useContext, useEffect, useState } from "react";
import { BuddizContext } from "../contexts/buddizContexts";
import HeaderMg from "./HeaderMg";
import HeaderUser from "./HeaderUser";
import { realtimeChat } from "../api/firebase";
import HeaderMessage from "./HeaderMessage";

function Header() {
  const [memberData, setMemberData] = useState("");
  const [imgClick, setImgClick] = useState(false);
  // 메세지 이미지 클릭
  const [msgClick, setMsgClick] = useState(false);
  const [forceRender1, setForceRender1] = useState(false);
  // 관리자 데이터
  const [managerData, setManagerData] = useState("");
  // 사용자 docId
  const [memberDocId, setMemberDocId] = useState("");
  // 관리자가 친 채팅 갯수 state
  const [chatCount, setChatCount] = useState(0);

  const onClick = (event) => {
    event.stopPropagation();
    setImgClick(true);
    setMsgClick(false);
    // setReImgClick(false);
  };
  const onClickMsg = (e) => {
    e.stopPropagation();
    setMsgClick(true);
    setImgClick(false);
  };
  // console.log(memberData);
  const { headIconLeder, count, setCount, chatOnOff, setChatOnOff } = useContext(BuddizContext);
  console.log(count);
  console.log(headIconLeder);
  useEffect(() => {
    console.log(headIconLeder);
    const getLocalStorageValue = (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    };

    const member = getLocalStorageValue("Member");

    if (member) {
      const userDocId = member[0]?.MEM_docId;
      console.log(userDocId);
      const userName = member[0]?.MEM_NAME;
      setMemberData(userName);
      setMemberDocId(userDocId);
    } else {
      setMemberData("");
      setMemberDocId("");
    }

    // 관리자
    const getLocalStoryManager = (key) => {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : [];
    };

    const manager = getLocalStoryManager("Manager");
    console.log(manager);

    if (manager) {
      const managerEmail = manager.MG_EMAIL;
      setManagerData(managerEmail);
    } else {
      setManagerData("");
    }
  }, [forceRender1, headIconLeder]);

  console.log(memberDocId);

  const getRealTime = async () => {
    if (memberDocId) {
      const realTime = await realtimeChat("Member", memberDocId, "MemberChat");
      if (realTime) {
        setChatCount(realTime);
        console.log(chatCount);
        console.log(realTime);
      }
      console.log(chatCount);
    }
    console.log(chatCount);
  };
  console.log(chatCount);

  useEffect(() => {
    getRealTime();
  }, [memberDocId]);

  // 회원정보 클릭
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // event.preventDefault();
      if (imgClick) {
        setImgClick(!imgClick);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [imgClick]);

  // 메세지함 클릭
  useEffect(() => {
    const handleOutsideClick = (event) => {
      // event.preventDefault();
      if (msgClick) {
        setMsgClick(!msgClick);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [msgClick]);

  const navigate = useNavigate();

  const Logout = () => {
    if (memberData || managerData) {
      localStorage.removeItem("Member");
      localStorage.removeItem("Manager");
      navigate("/");
      setForceRender1((prev) => !prev);
    }
  };

  return (
    <>
      <Container className={styles.nav}>
        <div className={styles.logo}>
          <Link to={"/"}>
            <img className={styles.logoImg} src={logo} alt="logo" />
          </Link>
        </div>
        <ul className={styles.ul}>
          {memberData || managerData ? (
            <Link to={"BuddyFind"} onClick={() => { setChatOnOff(true) }}>
              <li>버디찾기</li>
            </Link>
          ) : (
            <Link to={"/Login"}>
              <li>버디찾기</li>
            </Link>
          )}
          {memberData || managerData ? (
            <Link to={"chatting"} onClick={() => { setChatOnOff(false) }}>
              <li>채팅</li>
            </Link>
          ) : (
            <Link to={"/Login"}>
              <li>채팅</li>
            </Link>
          )}

          <Link to={"intro"} onClick={() => { setChatOnOff(true) }}>
            <li>소개</li>
          </Link>

          {memberData || managerData ? (
            <Link to={"shopping"} onClick={() => { setChatOnOff(true) }}>
              <li>쇼핑</li>
            </Link>
          ) : (
            <Link to={"/Login"}>
              <li>쇼핑</li>
            </Link>
          )}
          {memberData || managerData ? (
            <Link to={"board"} onClick={() => { setChatOnOff(true) }}>
              <li>게시판</li>
            </Link>
          ) : (
            <Link to={"/Login"}>
              <li>게시판</li>
            </Link>
          )}
        </ul>
        <p>{headIconLeder}</p>
        <div className={styles.iconWrap}>
          <Link to={"/cart"}>
            <Img className={styles.iconCircle}>
              <img src={basket} alt="basket" />
            </Img>
          </Link>

          <HeaderMessage
            onClick={onClickMsg}
            mail={mail}
            memberData={memberData}
            msgClick={msgClick}
            chatCount={chatCount}
            setChatCount={setChatCount}
          />

          {memberData ? (
            <HeaderUser
              onClick={onClick}
              memberData={memberData}
              imgClick={imgClick}
              setImgClick={setImgClick}
              Logout={Logout}
            />
          ) : managerData ? (
            <HeaderMg
              onClick={onClick}
              managerData={managerData}
              imgClick={imgClick}
              setImgClick={setImgClick}
              Logout={Logout}
            />
          ) : (
            <Link to={"Login"}>
              <Img className={styles.iconCircle}>
                <img src={user} alt="user" />
              </Img>
            </Link>
          )}
        </div>
      </Container>
    </>
  );
}

export default Header;
