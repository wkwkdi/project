import { Link, useLocation, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Button from "../Button";
import styles from "./BuddyFindSet.module.css";
import { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  db,
  updateDatas,
  getAddress,
  updateData,
  addData,
  deleteDatas,
} from "../../api/firebase";
import ParkSelector from "./PackSelector";

let temp = {};

function BuddyFindSet({
  member,
  setMember,
  setBtn,
  setMemAddresses,
  memAddresses,
  items,
  setItems,
  coordinates,
  setCoordinates,
  coordinatesTwo,
  setCoordinatesTwo,
  sport,
  setSport,
  period,
  setPeriod,
  setAaa,
  aaa,
  intro,
  setIntro,
  address,
  setAddress,
  addMarkerWithInfo,
  map,
  setPltemp,
  btn,
  pltemp,
  setResultArray,
  resultArray,
  setInputGetData,
  inputGetData,
  setSearchTerm,
  searchTerm,
  storedMemberMEM,
  info,
}) {
  // const [address, setAddress] = useState("");
  // const [nick, setNick] = useState("")
  // const [intro, setIntro] = useState("")
  // const [member, setMember] = useState(null);
  // const [sport, setSport] = useState("");
  // const [period, setPeriod] = useState("");

  // const [coordinates, setCoordinates] = useState({ lat: null, lng: null });

  // const [resultArray, setResultArray] = useState([]);

  // const storedMember = JSON.parse(localStorage.getItem("Member"));
  // useEffect(() => {
  //   if (storedMember) {
  //     setMember(...storedMember);
  //   }
  // }, []);

  // console.log(storedMember[0]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const resultArrayData = await getAddress("Buddy Find Setting");
  //       console.log(resultArrayData);
  //       setResultArray(resultArrayData);
  //     } catch (error) {
  //       console.error("주소를 가져오는 도중 오류 발생:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  console.log(resultArray);
  console.log(info);
  const bunsu = resultArray.filter(
    (result) => result?.BFS_docid == info?.docId
  );
  console.log(bunsu[0]?.BFS_docid);
  console.log(info);

  console.log(items);
  const it = items.filter((item) => item?.BFS_docid == info?.docId);
  const onSubmit = async (e) => {
    // console.log(storedMember.MEM_NICKNAME)
    // console.log(member)
    let member2;
    if (bunsu[0]?.BFS_docid == info?.docId) {
      member2 = await updateData("Buddy Find Setting", bunsu[0]?.docId, {
        BFS_SPORTS: sport,
        BFS_TIME: period,
        BFS_TITLE: intro,
        BFS_PLACE: address,
        BFS_docid: info?.docId,
        BFS_NICKNAME: info?.name,
      });
      console.log(member2);
      alert("마커가 수정되었습니다.");
      // console.log(member2.docId)
      // setBtn("000");
    } else {
      member2 = await addData("Buddy Find Setting", {
        BFS_SPORTS: sport,
        BFS_TIME: period,
        BFS_TITLE: intro,
        BFS_PLACE: address,
        BFS_docid: info?.docId,
        BFS_NICKNAME: info?.name,
      });
      setInputGetData(member2);
      alert("마커가 추가되었습니다.");
    }
    console.log(member2);
    console.log(inputGetData);
    if (member2 === undefined) {
      // 자동삭제 수정하면 5초뒤
      // setTimeout(async () => {
      //   await deleteDatas("Buddy Find Setting", it[0]?.docId);
      //   // 여기에서 상태를 업데이트
      //   setItems((prevItems) =>
      //     prevItems.filter((item) => item?.docId !== it[0]?.docId)
      //   );
      // }, 50000);
    } else {
      // setTimeout(async () => {
      //   await deleteDatas("Buddy Find Setting", member2?.docId);
      // }, 5000);
    }

    setBtn("000");
  };

  return (
    <>
      <div className={styles.container}>
        {/* <div>
          닉네임
          <br />
          <input
            className={`${styles.input} no-select`}
            readOnly
            value={storedMember[0].MEM_NICKNAME}
            style={{
              outline: "none",
              userSelect: "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
            }}
            // id="nickInput"
            // placeholder="닉네임을 입력해주세요"
            // value={nick}
            // onChange={(e) => setNick(e.target.value)}
          />
          <br />
        </div> */}
        <div>
          종목
          <br />{" "}
          <input
            className={styles.input}
            id="eventInput"
            placeholder="종목을 입력해주세요"
            value={sport}
            onChange={(e) => {
              const inputValue = e.target.value;
              setSport(e.target.value);
            }}
          />
          <br />
        </div>
        <div>
          시간
          <br />
          <input
            className={styles.input}
            id="periodInput"
            placeholder="시간을 (00:00 ~ 24:00)으로 입력해주세요 ex) 17:30"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
          />
          <br />
        </div>
        <div>
          장소
          <br />
          <ParkSelector setAddress={setAddress} />
          <input
            className={styles.input}
            id="addressInput"
            placeholder="지역을 선택해주세요"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            disabled
          />
          <br />
        </div>
        <div>
          한줄소개
          <br />
          <input
            className={styles.input}
            id="introInput"
            placeholder="한줄소개를 입력해주세요"
            value={intro}
            onChange={(e) => setIntro(e.target.value)}
          />
          <br />
        </div>
        <Button className={styles.btn} onClick={onSubmit}>
          마커 등록 / 수정
        </Button>
      </div>
    </>
  );
}

export default BuddyFindSet;
