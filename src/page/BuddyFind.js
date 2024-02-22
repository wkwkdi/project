// import MapComponent from "./component/MapComponent"
import beneImg from "../assets/buddyLogo.svg";
// import MapComponent from "./../components/MapComponent";

import styles from "./BuddyFind.module.css";
import Container from "../components/Container";
import BuddyFindMap from "../components/BuddyFind-components/BuddyFindMap";
import BuddyFindSet from "../components/BuddyFind-components/BuddyFindSet";
import { useEffect, useRef, useState } from "react";
import BuddyNav from "../components/BuddyFind-components/BuddyNav";
import { addData, updateData } from "../api/firebase";

function BuddyFind() {
  const [address, setAddress] = useState("");
  const [sport, setSport] = useState("");
  const [period, setPeriod] = useState("");
  const [intro, setIntro] = useState("");
  const [memAddresses, setMemAddresses] = useState([]);
  const [items, setItems] = useState([]);
  const [coordinates, setCoordinates] = useState(null);
  const [coordinatesTwo, setCoordinatesTwo] = useState([]);
  const [member, setMember] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [aaa, setAaa] = useState("");
  const findRef = useRef();
  const setRef = useRef();
  const [pltemp, setPltemp] = useState({});
  //  버디 찾기 , 나의 설정 버튼 구분
  const setBtnRef = useRef();
  const [btn, setBtn] = useState("000");
  // console.log(member)
  // const loca = useLocation();
  // console.log(memAddresses);
  // console.log(coordinatesTwo)
  const [selectedButton, setSelectedButton] = useState("buddyfind");
  const [resultArray, setResultArray] = useState([]);
  // 데이터 넣은 값 저장 state
  const [inputGetData, setInputGetData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [info, setInfo] = useState({
    name: "",
    docId: "",
    manager: "",
  });
  useEffect(() => {
    if (localStorage.getItem("Member")) {
      const storedMember = JSON.parse(localStorage.getItem("Member"));
      console.log(storedMember);
      setInfo({
        docId: storedMember[0]?.MEM,
        name: storedMember[0]?.MEM_NICKNAME,
      });
    } else {
      const storedManager = JSON.parse(localStorage.getItem("Manager"));
      setInfo({ manager: storedManager?.MG_EMAIL });
    }
  }, []);

  console.log(info);

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const addMarkerWithInfo = (map, location, infoContent) => {
    // 이미 같은 위치에 마커가 있는지 체크
    const isDuplicate = markers.some((marker) => {
      return marker
        .getPosition()
        .equals(new window.google.maps.LatLng(location.lat, location.lng));
    });

    // 중복된 위치이면 새로운 위치로 설정
    if (isDuplicate) {
      location.lat += (Math.random() - 0.5) * 0.0002; // 조정 값 변경
      location.lng += (Math.random() - 0.5) * 0.0002; // 조정 값 변경
    }

    const marker = new window.google.maps.Marker({
      position: location,
      map: map,
    });

    const infowindow = new window.google.maps.InfoWindow({
      content: infoContent,
    });

    marker.addListener("click", () => {
      infowindow.open(map, marker);
    });

    setMarkers((prevMarkers) => [...prevMarkers, { marker, infowindow }]);

    // 반환값 추가
    return { marker, infowindow };
  };

  return (
    <>
      {/* 1번째 div */}
      <div className={styles.bene}>
        <img src={beneImg} />
        <h2 className={styles.title}>버디 찾기</h2>
        <p className={styles.text}>함께 운동할 버디를 찾아보세요!</p>
      </div>

      {/* 2번째 div */}
      <Container>
        <BuddyNav
          setBtnRef={setBtnRef}
          findRef={findRef}
          setRef={setRef}
          btn={btn}
          setBtn={setBtn}
          selectedButton={selectedButton}
        ></BuddyNav>
        {btn == "000" ? (
          <BuddyFindMap
            info={info}
            // storedMemberMEM={storedMemberMEM}
            addMarkerWithInfo={addMarkerWithInfo}
            resultArray={resultArray}
            setResultArray={setResultArray}
            coordinatesTwo={coordinatesTwo}
            setCoordinatesTwo={setCoordinatesTwo}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            items={items}
            setItems={setItems}
            memAddresses={memAddresses}
            setMemAddresses={setMemAddresses}
            inputGetData={inputGetData}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            // storedManagerMEM={storedManagerMEM}
          />
        ) : (
          <BuddyFindSet
            info={info}
            // storedMemberMEM={storedMemberMEM}
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            addMarkerWithInfo={addMarkerWithInfo}
            resultArray={resultArray}
            setResultArray={setResultArray}
            items={items}
            setItems={setItems}
            member={member}
            setMember={setMember}
            coordinatesTwo={coordinatesTwo}
            setCoordinatesTwo={setCoordinatesTwo}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            memAddresses={memAddresses}
            setMemAddresses={setMemAddresses}
            address={address}
            sport={sport}
            period={period}
            setBtn={setBtn}
            intro={intro}
            setIntro={setIntro}
            btn={btn}
            setAaa={setAaa}
            aaa={aaa}
            setAddress={setAddress}
            setSport={setSport}
            setPeriod={setPeriod}
            setPltemp={setPltemp}
            pltemp={pltemp}
            setInputGetData={setInputGetData}
            inputGetData={inputGetData}
            // storedManagerMEM={storedManagerMEM}
          />
        )}
      </Container>
      {/* <div className={styles.btnContainer}>
        </div> */}
    </>
  );
}

export default BuddyFind;
