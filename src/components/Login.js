import { Link, useLocation, useNavigate } from "react-router-dom";
import Container from "./Container";
import styles from "./SignUp.module.css";
import styled from "styled-components";
import Button from "./Button";
import { useContext, useEffect, useState } from "react";
import { getAddress, getData, getManager } from "../api/firebase";
import { BuddizContext } from "../contexts/buddizContexts";

// useContext 사용 예시
// const temper = useContext(BuddizContext);
// console.log(temper); // provider의 props가 객체로 넘어옴
// const { locale, setLocale } = temper; // 구조분해할당
// console.log(locale);
// console.log(setLocale);

function Login({ setItems }) {
  const [okokemail, setOkokemail] = useState("");
  const [memberData, setMemberData] = useState("");
  const [emailExists, setEmailExists] = useState(false);
  const [newData, setNewData] = useState([]);
  const [password, setPassword] = useState("");

  // 관리자 데이터
  const [manager, setManager] = useState({});
  // 유저 경고
  const [userWarning, setUserWarning] = useState("");
  // const [forceRender1, setForceRender1] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "";
  const googleEmail = location.state?.googleEmail || "";
  const Lander = useContext(BuddizContext);
  const { headIconLeder, setHeadIconLeder } = Lander;
  // console.log(headIconLeder);
  const temper = useContext(BuddizContext);
  // console.log(temper); // provider의 props가 객체로 넘어옴
  const { userStop, setUserStop } = temper; // 구조분해할당
  // console.log(userStop);

  useEffect(() => {
    const warning = newData.filter((item) => item.MEM_WARNING >= 30);
    setUserWarning(warning);
  }, [newData]);
  console.log(userWarning);
  const handleLoad = async () => {
    const getdata = await getAddress("Member");
    console.log(getdata);

    const manager = await getManager("Manager");
    setManager(manager);
    console.log(manager);

    const newData = getdata.map((item, index) => ({
      MEM_docId: item.id,
      MEM: item.MEM,
      MEM_PASSWORD: item.MEM_PASSWORD,
      MEM_ADDRESS: item.MEM_ADDRESS,
      MEM_GENDER: item.MEM_GENDER,
      MEM_JOINDATE: item.MEM_JOINDATE,
      MEM_NAME: item.MEM_NAME,
      MEM_NICKNAME: item.MEM_NICKNAME,
      MEM_PHONE: item.MEM_PHONE,
      MEM_WARNING: item.MEM_WARNING,
    }));
    console.log(newData); // 추가된 부분: newData를 콘솔에 출력
    setNewData(newData);

    if (newData.some((item) => item.MEM === okokemail)) {
      setEmailExists(true);
    } else {
      setEmailExists(false);
    }
  };
  const SelectBtn = styled(Button)`
    width: 100%;
    background-color: #1e326d;
    color: #fff;
    margin: 50px auto 0;
  `;

  const handleEmailChange = (event) => {
    setOkokemail(event.target.value);
    setEmailExists(false);
  };

  const handlePwChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    // 유저 경고횟수 가져오기

    const isLoginValid = newData.filter(
      (item) =>
        (item.MEM === okokemail ||
          item.MEM === email ||
          item.MEM === googleEmail) &&
        item.MEM_PASSWORD === password
    );

    const story = isLoginValid.map((item) => ({
      MEM_docId: item.MEM_docId,
      MEM: item.MEM,
      MEM_ADDRESS: item.MEM_ADDRESS,
      MEM_GENDER: item.MEM_GENDER,
      MEM_JOINDATE: item.MEM_JOINDATE,
      MEM_NAME: item.MEM_NAME,
      MEM_NICKNAME: item.MEM_NICKNAME,
      MEM_PHONE: item.MEM_PHONE,
    }));

    console.log(manager);
    const storyMG = {
      MG_PASSWORD: manager.review.MG_PASSWORD,
      MG_EMAIL: manager.review.MG_EMAIL,
      MG_docId: manager.review.docId,
    };
    console.log(storyMG);
    // console.log(story);
    if (isLoginValid.length > 0) {
      alert("로그인 성공");
      localStorage.setItem("Member", JSON.stringify(story));
      navigate("/");
      setHeadIconLeder((p) => !p);
      // 로그인 성공 시 처리할 코드 작성
    } else if (
      storyMG.MG_EMAIL == okokemail &&
      storyMG.MG_PASSWORD == password
    ) {
      alert("관리자 로그인 성공");
      localStorage.setItem("Manager", JSON.stringify(storyMG));
      localStorage.setItem(
        "Member",
        JSON.stringify([
          {
            MEM_NICKNAME: "Manager",
            MEM: "manager@naver.com",
          },
        ])
      );
      setHeadIconLeder((p) => !p);
      navigate("/");
    }
    //  else if (userStop == sasel) {
    //   alert("영구정지 되었습니다.")

    // }
    else {
      alert("이메일과 비밀번호를 정확하게 작성하세요");
    }
  };

  useEffect(() => {
    handleLoad();
    // handleLoadMg()
  }, [okokemail]);

  return (
    <>
      <Container className={styles.mainContainer}>
        <h1 className={styles.h1}>로그인</h1>
        <form className={styles.container}>
          <div>
            <div className={styles.email}>
              <label htmlFor="email">이메일</label>
              <input
                className={styles.width}
                type="email"
                id="email"
                placeholder="ex) styled@DW.kr"
                value={email || googleEmail || okokemail}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div className={styles.pw}>
            <label htmlFor="password">비밀번호</label>
            <div>
              <input
                className={styles.width}
                type="password"
                id="password"
                placeholder="비밀번호 작성"
                onChange={handlePwChange}
              />
            </div>
          </div>
          <div style={{ textAlign: "end" }}>
            <p>
              <Link to={"findempw"}>이메일 찾기</Link> /{" "}
              <Link to={"findempw"}>
                <span>비밀번호 찾기</span>
              </Link>
            </p>
          </div>
          <SelectBtn onClick={handleLogin}>
            <div>로그인 하기</div>
          </SelectBtn>
          <SelectBtn onClick={() => setItems(true)}>
            <div>회원가입 하러가기</div>
          </SelectBtn>
        </form>
      </Container>
    </>
  );
}

export default Login;
