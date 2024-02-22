import { Fragment, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "./Container";
import styles from "./SignUp.module.css";
import AddressSearch from "./AddressSearch";
import Button from "./Button";
import styled from "styled-components";
import kakaoLogout from "./Logout";
// 구글 로그인
import GoogleLoginButton from "./GoogleLogin";
import { GoogleLogout } from "@react-oauth/google";
import { addData, getAddress } from "../api/firebase";
// ---------------------------------------------------------------
function SignUp() {
  // 카카오이메일
  const [email, setEmail] = useState("");
  // 이메일 확인
  const [okemail, setOkEmail] = useState();
  // 이메일 중복 확인
  const [isEmail, setIsEmail] = useState(false);
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  // 비밀번호 확인
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [nameValid, setNameValid] = useState(false);
  // 닉네임 검사 ( 정규식 )
  const [nicknameValid, setNicknameValid] = useState(false);
  const [phoneValid, setPhoneValid] = useState(false);
  // 닉네임 중복확인 스테이트
  const [isNicknameValid, setIsNicknameValid] = useState(true);
  // 전화번호 중복확인 스테이트
  const [isPhone, setIsPhone] = useState(true);
  // 구글 이메일 값
  const [googleEmail, setGoogleEmail] = useState("");
  const handleGoogleEmail = (email) => {
    setGoogleEmail(email);
  };
  const [getgoogleEmail, setGetgoogleEmail] = useState("");
  // 성별
  const [gender, setGender] = useState("");
  const [dataNickName, setDataNickName] = useState("");
  const handleGenderChange = (event) => {
    setGender(event.target.value); // 선택된 값을 상태에 업데이트
  };

  // 우편번호 가지고 오는곳
  const [myaddress, setMyaddress] = useState("");
  const [newData, setNewData] = useState([]);
  const GoogleRef = useRef(null);
  const handleAddressChange = (address) => {
    // console.log(address);
    setMyaddress(address);
    // setPostcode(e.target.value)
  };

  const SelectBtn = styled(Button)`
    width: 100%;
    background-color: #1e326d;
    color: #fff;
    margin: 100px auto 0;
  `;

  useEffect(() => {
    // 이름은 한글 또는 영문이어야 하며, 2자 이상이어야 합니다.
    const nameRegex = /^[가-힣a-zA-Z]{2,}$/;
    setNameValid(nameRegex.test(name));
  }, [name]);

  useEffect(() => {
    // 닉네임은  한글 또는 영문이어야 하며 (숫자 포함가능), 4자 이상이어야 합니다.
    const nicknameRegex = /^[가-힣a-zA-Z0-9]{4,}$/;
    setNicknameValid(nicknameRegex.test(nickname));
  }, [nickname]);

  useEffect(() => {
    // 전화번호는 '000-0000-0000' 형식이어야 합니다.
    const phoneRegex = /^\d{3}-\d{4}-\d{4}$/;
    setPhoneValid(phoneRegex.test(phone));
  }, [phone]);

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setPasswordValid(regex.test(password));
  }, [password]);

  useEffect(() => {
    const isInitialized = window.Kakao.isInitialized();

    if (!isInitialized) {
      window.Kakao.init("459871846e276f68850ff857a482ec69");
    }
  }, []);

  const handleLoad = async () => {
    const getdata = await getAddress("Member");
    const newData = getdata.map((item, index) => ({
      MEM: item.MEM,
      MEM_NICKNAME: item.MEM_NICKNAME,
      MEM_PHONE: item.MEM_PHONE,
    }));
    setNewData(newData);

    const isNicknameDuplicate = newData.some(
      (item) => item.MEM_NICKNAME === nickname
    );
    setIsNicknameValid(!isNicknameDuplicate);
    const isPhoneDuplicate = newData.some((item) => item.MEM_PHONE === phone);
    setIsPhone(!isPhoneDuplicate);
    const isEmailDuplicate = newData.some(
      (item) => item.MEM === email || item.MEM === googleEmail
    );
    setIsEmail(!isEmailDuplicate);
  };

  useEffect(() => {
    handleLoad();
  }, [nickname, phone, email, googleEmail]);

  const Validation = () => {
    if (!isEmail) {
      alert("이메일 중복");
      return false;
    } else if (!passwordValid) {
      alert(
        "비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수 문자를 모두 포함해야 합니다."
      );
      return false;
    } else if (password !== confirmPassword) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return false;
    } else if (!nameValid) {
      alert("이름은 한글 또는 영문이어야 하며, 2자 이상이어야 합니다.");
      return false;
    } else if (!nicknameValid) {
      alert("닉네임은  한글 또는 영문이어야 하며 (숫자 포함가능), 4자 이상이어야 합니다.");
      return false;
    } else if (!myaddress) {
      alert("우편 찾기를 해주세요.");
      return false;
    } else if (!isNicknameValid) {
      alert("닉네임이 중복되었습니다.");
      return false;
    } else if (!phoneValid) {
      alert("전화번호는 '000-0000-0000' 형식이어야 합니다.");
      return false;
    } else if (!isPhone) {
      alert("전화번호가 중복되었습니다.");
      return false;
    } else if (!gender) {
      alert("성별을 선택해주세요.");
      return false;
    } else {
      return true;
    }
  };
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const today = `${year}-${month}-${day}`;

  const onClick = async () => {
    if (Validation() == true) {
      alert("인증완료 되었습니다.!!");
      const addinfo = await addData("Member", {
        ...(googleEmail && { MEM: googleEmail }),
        ...(email && { MEM: email }),
        MEM_NICKNAME: nickname,
        MEM_PASSWORD: password,
        MEM_NAME: name,
        MEM_PHONE: phone,
        MEM_GENDER: gender,
        MEM_ADDRESS: myaddress,
        MEM_JOINDATE: today,
        MEM_COMMENT_NUM: 0,
        MEM_STORE_REVIEW: 0,
        MEM_STORE_PURCHASE: 0,
        MEM_INQUIRY: 0,
        MEM_POINT: 0,
        MEM_WARNING: 0,
        MEM_LOGIN_COUNT: 0,
        MEM_IMAGE: "",
        MEM_SANCTIONS: false,
        MEM_POINTTIME: false,
      });

      navigate("/Login", {
        state: { email, googleEmail, password, name, nickname, phone, gender },
      });
      kakaoLogout();

      localStorage.setItem("Member", JSON.stringify(addinfo));
    }
  };

  const handleNicknameChange = (e) => {
    const nickname = e.target.value;
    setNickname(nickname);
  };

  const kakaoLogin = (e) => {
    e.preventDefault();
    window.Kakao.Auth.login({
      scope: "profile_nickname, profile_image, account_email",
      success: function (authObj) {
        console.log(authObj);
        window.Kakao.API.request({
          url: "/v2/user/me",
          // prompt: "login",
          success: (res) => {
            const kakao_account = res.kakao_account;
            console.log(kakao_account);
            console.log(kakao_account.email);
            if (kakao_account.email) {
              setOkEmail(kakao_account.email);
              setEmail(kakao_account.email);
              if (okemail == email) {
                alert("이미 인증되었습니다.");
              }
            } else {
              alert("인증 안됨");
            }
          },
        });
      },
    });
  };

  const handleKeyPress = (event) => {
    // Enter 키가 눌렸을 때 실행되는 함수
    if (event.key === 'Enter') {
      // 버튼 클릭 함수 호출
      onClick();
    }
  };
  const [clickedItem, setClickedItem] = useState('');
  const handleGoogleRefClick = (item) => {
    setClickedItem(item);
  };
  return (
    <>
      <Container className={styles.mainContainer}>
        <div className={styles.container}>
          <div className={styles.kakaoWrap}>
            <h1>인증하기</h1>
            <div onClick={kakaoLogin} className={styles.kakaoLogin}>
              <img
                className={styles.img}
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFQOJtNpYFKTS1T5QdhIDFFgLzQO93BuFjFw&usqp=CAU"
                alt="login"
              />
            </div>
            <div>
              {/* GoogleLoginButton을 숨겨놓고, 구글 로그인을 클릭하면 GoogleLoginButton을 클릭하는 함수를 호출합니다. */}
              {/* <div onClick={() => handleGoogleRefClick()}>
                구글로그인
              </div> */}
              {/* GoogleLoginButton을 렌더링합니다. */}
              <div>
                <GoogleLoginButton onClick={() => handleGoogleRefClick()} onGoogleEmail={handleGoogleEmail} />
              </div>
            </div>

          </div>
          <div className={styles.border}></div>

          {/* 카카오 인증 */}

          {okemail || googleEmail ? (
            <div>
              <form>
                <div className={styles.email}>
                  <label for="email">이메일</label>
                  <div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="이메일 작성"
                      value={
                        okemail || googleEmail ? okemail || googleEmail : ""
                      }
                      className={styles.width}
                    />
                  </div>
                  {okemail === "" ? (
                    ""
                  ) : isEmail ? (
                    <div>
                      <p className={styles.green}>사용가능한 닉네임입니다.</p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.red}>사용한 닉네임입니다.</p>
                    </div>
                  )}
                  {/* {okemail === "" ? (
                    ""
                  ) : isEmail ? (
                    <div>
                      <p className={styles.green}>사용가능한 닉네임입니다.</p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.red}>사용불가능한 닉네임입니다.</p>
                    </div>
                  )} */}
                </div>
                { }

                <div className={styles.pw}>
                  <label for="password">비밀번호</label>
                  <div>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder="비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수 문자를 모두 포함해야 합니다."
                      onChange={(e) => setPassword(e.target.value)}
                      className={styles.width}
                    />
                  </div>
                  {password === "" ? (
                    ""
                  ) : passwordValid ? (
                    <div>
                      <p className={styles.green}>사용가능한 비밀번호입니다.</p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.red}>사용불가능한 비밀번호입니다.</p>
                    </div>
                  )}
                </div>

                <div>
                  <label for="confirmPassword">비밀번호 확인</label>
                  <div>
                    <input
                      type="password"
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="비밀번호 확인"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={styles.width}
                    />
                  </div>
                  {confirmPassword === "" ? (
                    ""
                  ) : confirmPassword === password ? (
                    <div>
                      <p className={styles.green}>비밀번호가 일치합니다.</p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.red}>비밀번호가 일치하지 않습니다.</p>
                    </div>
                  )}
                </div>

                <div className={styles.name}>
                  <label for="name">이름</label>
                  <div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="이름은 한글 또는 영문이어야 하며, 2자 이상이어야 합니다"
                      required
                      onChange={(e) => setName(e.target.value)}
                      className={styles.width}
                    />
                  </div>
                  {name === "" ? (
                    ""
                  ) : nameValid ? (
                    <div>
                      <p className={styles.green}>사용가능한 이름입니다.</p>
                    </div>
                  ) : (
                    <div>
                      <p className={styles.red}>사용불가능한 이름입니다.</p>
                    </div>
                  )}
                </div>

                <div>
                  <label for="nickname">닉네임</label>
                  <div>
                    <input
                      placeholder="닉네임은  한글 또는 영문이어야 하며 (숫자 포함가능), 4자 이상이어야 합니다."
                      type="text"
                      id="nickname"
                      name="nickname"
                      required
                      onChange={handleNicknameChange}
                      className={styles.width}
                    />
                    {nickname === "" ? (
                      ""
                    ) : nicknameValid ? (
                      isNicknameValid ? (
                        <div>
                          <p className={styles.green}>사용 가능한 닉네임입니다.</p>
                        </div>
                      ) : (
                        <div>
                          <p className={styles.red}>이미 사용중인 닉네임입니다.</p>
                        </div>
                      )
                    ) : (
                      <div>
                        <p className={styles.red}>사용 불가능한 닉네임입니다.</p>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label for="phone">전화번호</label>
                  <div>
                    <input
                      placeholder="전화번호는 '000-0000-0000' 형식이어야 합니다."
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      onChange={(e) => setPhone(e.target.value)}
                      className={styles.width}
                    />
                    {phone === "" ? (
                      ""
                    ) : phoneValid ? (
                      isPhone ? (
                        <div>
                          <p className={styles.green}>사용가능한 전화번호입니다.</p>
                        </div>
                      ) : (
                        <div>
                          <p className={styles.red}>이미 사용중인 전화번호입니다.</p>
                        </div>
                      )
                    ) : (
                      <div>
                        <p className={styles.red}>사용불가능한 전화번호입니다.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* <div className={styles.gender_age}> */}
                <div className={styles.gender}>

                  <label className={styles.gender1}>성별</label>
                  <div className={styles.center}>
                    <label className={styles.marrig} htmlFor="male">남성</label>
                    <input
                      type="checkbox"
                      id="male"
                      name="gender"
                      value="male"
                      checked={gender === "male"}
                      onChange={handleGenderChange}
                    />
                  </div>
                  <div className={styles.center}>
                    <label className={styles.marrig} htmlFor="female">여성</label>
                    <input
                      type="checkbox"
                      id="female"
                      name="gender"
                      value="female"
                      checked={gender === "female"}
                      onChange={handleGenderChange}
                    />
                  </div>
                </div>
                {/* </div> */}

                <div className={styles.adr}>
                  <label for="address">주소</label>
                  <AddressSearch onAddressChange={handleAddressChange} />
                </div>
              </form>
              <SelectBtn onClick={onClick} onKeyDown={handleKeyPress}>가입 완료</SelectBtn>
            </div>
          ) : (
            ""
          )}
        </div>
      </Container>
    </>
  );
}

export default SignUp;
