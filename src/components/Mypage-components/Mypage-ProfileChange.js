import styles from "./Mypage-ProfileChange.module.css";
import basicImg from "../../assets/user-solid.svg";
// import eye1 from "../../assets/eye1.jpg"
// import eye2 from "../../assets/eye2.jpg"
import eye1 from "../../assets/eye1.svg";
import eye2 from "../../assets/eye2.svg";
// import hea from "../../assets/아령.jpg";

import { useEffect, useRef, useState } from "react";
import AddressForm from "./My-page-adressAPI";
import {
  doc,
  findPassword,
  getAddress,
  pwCheckUpdate,
  updateData,
  uploadDeleteImage,
  uploadImage,
} from "../../api/firebase";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";

function MyProfile() {
  const [adr, setAdr] = useState({});
  // 현재 비밀번호 / 데이터베이스 비번
  const [nowpassword, setNowpassword] = useState("");
  const [datapassword, setDatapassword] = useState("");
  // 새로운비번 / 새로운 비번 정규식확인 / 그 새로운 비번 확인
  const [newPassword, setNewPassword] = useState("");
  const [newCheckPassword, setNewCheckPassword] = useState("");
  const [finalPw, setFinalPw] = useState("");
  // 스토리지에 들어 있는 닉네임 / 데이터베이스에 들어 있는 docId
  // 아래 4개 주소 입력창
  const [postcode, setPostcode] = useState("");
  const [address, setAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");
  const [extraAddress, setExtraAddress] = useState("");
  // Member데이터 가져온거 담을 state
  const [items, setItems] = useState([]);
  // 이미지(파일)을 담을 state
  const [file, setFile] = useState("");
  // 기본 이미지
  const [basic, setBasic] = useState("");
  // 닉네임 변경 변수
  const [nick, setNick] = useState("");
  const inputFileRef = useRef(null);

  const getstory = JSON.parse(localStorage.getItem("Member"));
  const handleLoad = async () => {
    const getdata = await getAddress("Member");
    const filteredData = getdata.filter(
      (item) => item.docId == getstory[0]?.MEM_docId
    );
    console.log(getstory[0]?.MEM_docId);
    setItems(filteredData);
    const basePw = filteredData[0]?.MEM_PASSWORD;
    // const baseAddress = filteredData[0]?.MEM_ADDRESS;
    setDatapassword(basePw);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    setNewCheckPassword(regex.test(newPassword));
  }, [newPassword]);

  const ChangePw = async () => {
    if (datapassword !== nowpassword) {
      alert("현재 비밀번호를 정확하게 입력하세요");
    } else if (datapassword == newPassword) {
      alert("현재 비밀번호일치 합니다. 새로운 비번으로 바꾸세요");
    } else if (!newCheckPassword) {
      alert(
        "비밀번호는 8자 이상이며, 대문자, 소문자, 숫자, 특수 문자를 모두 포함해야 합니다."
      );
    } else if (newPassword !== finalPw) {
      alert("새로운 비밀번호와 바꿔준 비밀번호가 일치하지 않습니다.");
    } else {
      alert("수정이 되었습니다.");
      try {
        await updateData("Member", getstory[0].MEM_docId, {
          MEM_PASSWORD: finalPw,
        });
      } catch (error) {
        console.error("Error updating password:", error);
      }
      setNowpassword("");
      setNewPassword("");
      setFinalPw("");
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleBasicChange = async () => {
    setBasic(basicImg);
  };

  // 커스터마이징 파일선택 클릭
  const handleFileSelectClick = () => {
    inputFileRef.current.click();
  };

  console.log(basic);

  // 프로필 변경 사진 및 주소
  const profileChange = async () => {
    try {
      let imageUrl = ""; // 이미지 URL 초기화
      let update;

      // 사진이 있으면
      if (file) {
        imageUrl = await uploadDeleteImage(
          "Member",
          file,
          items[0]?.MEM_NICKNAME,
          items[0]?.MEM_IMAGE
        );
        // 사진이 있고 주소입력창을 입력했으면 아래코드 실행
        if (
          postcode.length > 0 &&
          address.length > 0 &&
          detailAddress.length > 0
        ) {
          update = await updateData("Member", getstory[0]?.MEM_docId, {
            MEM_ADDRESS: { ...adr },
            MEM_IMAGE: imageUrl,
          });
        } else {
          update = await updateData("Member", getstory[0]?.MEM_docId, {
            MEM_IMAGE: imageUrl,
          });
        }
      } else {
        if (
          basic &&
          postcode.length > 0 &&
          address.length > 0 &&
          detailAddress.length > 0
        ) {
          update = await updateData("Member", getstory[0]?.MEM_docId, {
            MEM_ADDRESS: { ...adr },
            MEM_IMAGE: "",
          });
        } else if (basic) {
          await updateData("Member", getstory[0]?.MEM_docId, {
            MEM_IMAGE: "", // 기본 이미지로 변경
          });
        } else {
          // 주소만
          if (
            postcode.length > 0 &&
            address.length > 0 &&
            detailAddress.length > 0
          ) {
            update = await updateData("Member", getstory[0]?.MEM_docId, {
              MEM_ADDRESS: { ...adr },
            });
          } else {
            alert("입력된 값이 없습니다.");
            return;
          }
        }
      }
      if (update === undefined) {
        alert("변경되었습니다.");
        setPostcode("");
        setAddress("");
        setDetailAddress("");
        setExtraAddress("");
      }
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
  const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
  const [isPasswordVisible3, setIsPasswordVisible3] = useState(false);

  const togglePasswordVisibility1 = () => {
    setIsPasswordVisible1(!isPasswordVisible1);
  };
  const togglePasswordVisibility2 = () => {
    setIsPasswordVisible2(!isPasswordVisible2);
  };
  const togglePasswordVisibility3 = () => {
    setIsPasswordVisible3(!isPasswordVisible3);
  };
  const handleNickChange = async () => {
    let nickChange = prompt("닉네임 변경");

    if (nickChange !== null) {
      setNick(nickChange);
      console.log(nick);

      alert("변경된 닉네임: " + nickChange);
      await updateData("Member", getstory[0].MEM_docId, {
        MEM_NICKNAME: nick,
      });
    } else {
      alert("취소되었습니다.");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.contents}>
        <h2 className={styles.title}>프로필 변경</h2>
        <div className={`${styles.content} ${styles.content1}`}>
          <div className={styles.profileImgChange}>
            <div className={styles.imgWraper}>
              {file ? (
                <img src={URL.createObjectURL(file)} alt="프로필사진" />
              ) : basic ? (
                <img src={basic} />
              ) : items[0]?.MEM_IMAGE ? (
                <img src={items[0]?.MEM_IMAGE} alt="프로필사진" />
              ) : (
                <img src={basicImg} alt="프로필사진" />
              )}
              {/* <img src={basicImg} alt="프로필사진" /> */}
            </div>
            <div className={styles.changeBtns}>
              <input
                ref={inputFileRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              <div className={styles.changeBtn} onClick={handleNickChange}>
                닉네임 변경하기
              </div>
              <div className={styles.changeBtn} onClick={handleFileSelectClick}>
                사진 변경하기
              </div>
              <div className={styles.changeBtn} onClick={handleBasicChange}>
                기본값으로 변경하기
              </div>
            </div>
          </div>
          <div className={styles.adressChange}>
            <AddressForm
              setAdr={setAdr}
              postcode={postcode}
              setPostcode={setPostcode}
              address={address}
              setAddress={setAddress}
              detailAddress={detailAddress}
              setDetailAddress={setDetailAddress}
              extraAddress={extraAddress}
              setExtraAddress={setExtraAddress}
            />
          </div>
          <div
            className={styles.profileChangBtn}
            onClick={() => profileChange()}
          >
            프로필 변경하기
          </div>
        </div>
        <div className={`${styles.content} ${styles.content2}`}>
          <h2 className={styles.title}>비밀번호 변경</h2>
          <div className={styles.inputBox}>
            <div>
              <label className={styles.inputLabel}>현재 비밀번호</label>
            </div>
            <input
              value={nowpassword}
              onChange={(e) => setNowpassword(e.target.value)}
              className={styles.input}
              type={isPasswordVisible1 ? "text" : "password"}
            />

            <div className={styles.Bw}>
              <div>
                {nowpassword === "" ? (
                  <span className={styles.emptyMessage}></span>
                ) : datapassword === nowpassword ? (
                  <span className={styles.matchMessage}>
                    비밀번호 일치 새로운 비밀번호를 만드세요!!
                  </span>
                ) : (
                  <span className={styles.mismatchMessage}>
                    비밀번호 불일치
                  </span>
                )}
              </div>
              <button className={styles.Po} onClick={togglePasswordVisibility1}>
                <img src={isPasswordVisible1 ? eye1 : eye2} />
              </button>
            </div>
          </div>
          <div>
            <div className={styles.inputBox}>
              <div>
                <label className={styles.inputLabel}>새로운 비밀번호</label>
              </div>
              <input
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className={styles.input}
                type={isPasswordVisible2 ? "text" : "password"}
              />
              <div className={styles.Bw}>
                <div>
                  {newPassword == "" ? (
                    ""
                  ) : newPassword === nowpassword ? (
                    <div>
                      현재 비밀번호랑 같습니다. 새로운 비밀번호로 작성하세요
                    </div>
                  ) : !newCheckPassword ? (
                    <div> 정규식이 틀렸습니다. 알맞게 작성하세요</div>
                  ) : (
                    <div>작성가능한 비밀번호입니다.</div>
                  )}
                </div>
                <button
                  className={styles.Po}
                  onClick={togglePasswordVisibility2}
                >
                  <img src={isPasswordVisible2 ? eye1 : eye2} />
                </button>
              </div>
            </div>
            <div className={styles.inputBox}>
              <div>
                <label className={styles.inputLabel}>비밀번호 확인</label>
              </div>
              <input
                value={finalPw}
                onChange={(e) => setFinalPw(e.target.value)}
                className={styles.input}
                type={isPasswordVisible3 ? "text" : "password"}
              />
              <div className={styles.Bw}>
                <div>
                  {finalPw === "" ? (
                    <span className={styles.emptyMessage}></span>
                  ) : finalPw === newPassword ? (
                    <span className={styles.matchMessage}>비밀번호 일치</span>
                  ) : (
                    <span className={styles.mismatchMessage}>
                      비밀번호 불일치
                    </span>
                  )}
                </div>
                <button
                  className={styles.Po}
                  onClick={togglePasswordVisibility3}
                >
                  <img src={isPasswordVisible3 ? eye1 : eye2} />
                </button>
              </div>
            </div>
          </div>
          <div onClick={ChangePw} className={styles.profileChangBtn}>
            비밀번호 변경하기
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProfile;
