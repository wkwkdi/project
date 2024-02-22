import styled from "styled-components";
import Label from "./Label";

import { useState } from "react";
import { getMember } from "./Firebase";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Logo = styled.h1`
  font-family: Pretendard;
  text-align: center;
  font-size: 40px;
  background-image: linear-gradient(135deg, aqua, purple);
  background-clip: text;
  color: transparent;
`;

function Login() {
  // const member = useMember();
  // const setMember = useSetMember();

  // console.log(props);

  const navigate = useNavigate();
  const [values, setValues] = useState({
    id: "",
    password: "",
  });

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const { memberObj, message } = await getMember(values);

    if (message === undefined) {
      // (키값, 데이터)
      // 배열이든 객체든 문자열로 바꿔주는 JSON.stringfy
      localStorage.setItem("chat", JSON.stringify(memberObj));

      // localStorage.getItem("key");
      // localStorage.removeItem("key");

      // alert("로그인에 성공했습니다.");
      // window.location.href = "/";
      // setMember(memberObj);
      navigate("/chat");
    } else {
      alert(message);
    }
  };
  return (
    <div>
      DW 온라인스쿨 회원이 아니신가요? <Link href="#">회원가입 하기</Link>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">이메일</label>
        <input
          type="id"
          name="id"
          id="id"
          placeholder="styled@DW.kr"
          onChange={handleValueChange}
        />
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="비밀번호"
          onChange={handleValueChange}
        />
        <button type="submit">로그인 하기</button>
      </form>
    </div>
  );
}

export default Login;
