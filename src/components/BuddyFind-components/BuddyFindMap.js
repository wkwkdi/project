import styles from "./BuddyFindMap.module.css";
import MapComponent from "../MapComponent";
import Button from "../Button";
import styled from "styled-components";
import { useEffect, useState } from "react";
import classNames from "classnames";
import BuddyFindSet from "./BuddyFindSet";
import { useLocation } from "react-router-dom";
import { deleteDatas, getAddress } from "../../api/firebase";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const SelectBtn = styled(Button)`
  background-color: #1e326d;
  color: #fff;
  margin: 0 auto;
`;

function BuddyFindMap({
  addMarkerWithInfo,
  addrss,
  setAddrss,
  memAddresses,
  setMemAddresses,
  items,
  setItems,
  coordinates,
  setCoordinates,
  coordinatesTwo,
  setCoordinatesTwo,
  member,
  setMember,
  setResultArray,
  resultArray,
  inputGetData,
  setSearchTerm,
  searchTerm,
  sport,
  period,
  storedMemberMEM,
  info,
}) {
  const [addressTwo, setAddressTwo] = useState("");
  // const [coordinates, setCoordinates] = useState(null)
  // const [coordinatesTwo, setCoordinatesTwo] = useState([])
  const [isToggle, setIsToggle] = useState(false);
  const [showMarker, setShowMarker] = useState(false);
  const [markerOpacity, setMarkerOpacity] = useState(1);
  const [selectedBFS_docid, setSelectedBFS_docid] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);

  const location = useLocation();
  // console.log(loaction);
  // const Obj = location.state;
  // console.log(coordinatesTwo);
  const center = coordinates || { lat: 36.3286904, lng: 127.4229992 };

  // console.log(Obj[0]?.MEM);
  // items Buddy Find Setting에 담긴 데이터를 가지고 docid와 사용자의 이메일과 같은 것만 변수에 담겠다(배열로)
  const it = items.filter((item) => item?.BFS_docid == info?.docId);
  // console.log(it[0]?.BFS_docid);
  // console.log(items);
  // console.log(it);
  // console.log(inputGetData?.docId);
  // BuddyFindMap 컴포넌트에서 handleToggle 함수 수정
  // const handleToggle = () => {
  //   // Obj[0].MEM과 resultArrayData.BFS_docid가 같은 마커를 찾기
  //   const matchedMarker = items.find((item) => item.BFS_docid === Obj[0].MEM);

  //   // matchedMarker가 있을 때만 setShowMarker 호출
  //   if (matchedMarker) {
  //     setShowMarker((prevShowMarker) => !prevShowMarker);
  //     setIsToggle((prevIsToggle) => !prevIsToggle);
  //   }
  // };

  const areCoordinatesEqual = (coord1, coord2) => {
    return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
  };

  const processDuplicateCoordinates = (coordinatesArray) => {
    const processedArray = [];

    coordinatesArray.forEach((coordinates, index) => {
      // 중복된 좌표인지 확인
      const isDuplicate = processedArray.some((coord) =>
        areCoordinatesEqual(coord, coordinates)
      );

      // 중복된 좌표라면 조정값을 더해서 새로운 좌표 생성
      if (isDuplicate) {
        // const adjustedCoordinates = adjustCoordinates(coordinates);
        // processedArray.push(adjustedCoordinates);
      } else {
        processedArray.push(coordinates);
      }
    });

    return processedArray;
  };

  const handleLoad = async () => {
    try {
      const result = await getAddress("Buddy Find Setting");
      const updatedResult = result.map((item, index) => ({
        ...item,
        BFS_PLACE: item.BFS_PLACE || "",
        BFS_TIME: item.BFS_TIME || "",
        BFS_SPORTS: item.BFS_SPORTS || "",
        BFS_docid: item.BFS_docid || "",
        index,
      }));
      setItems(updatedResult);
      const docIds = updatedResult.map((item) => item.docId);
      // console.log("추출된 docIds:", docIds);
      console.log(updatedResult.BFS_docid);

      const newCoordinates = updatedResult.map((item) => ({
        ...item.coordinates,
        index: item.index,
      }));
      const processedCoordinates = processDuplicateCoordinates(newCoordinates);

      setCoordinatesTwo(processedCoordinates);
    } catch (error) {
      console.error("주소를 가져오는 도중 오류 발생:", error);
    }
  };

  const handleToggle = async () => {
    const what = window.confirm("마커를 삭제하시겠습니까?");
    if (what) {
      await deleteDatas("Buddy Find Setting", it[0]?.docId);
    }
    handleLoad();
    // Obj[0].MEM과 resultArrayData.BFS_docid가 같은 마커를 찾기
    const matchedMarker = items.find((item) => item.BFS_docid === info?.docId);
    // matchedMarker가 있을 때만 setShowMarker 호출
    if (matchedMarker) {
      // items 배열을 업데이트하여 matchedMarker만을 갖도록 함
      setItems((prevItems) => [...prevItems, matchedMarker]);

      // showMarker 상태를 현재의 반대 값으로 설정
      setShowMarker((prevShowMarker) => !prevShowMarker);
      setIsToggle((prevIsToggle) => !prevIsToggle);
    }
  };

  // const handleToggle = () => {
  //   console.log("handleToggle 함수 호출됨");
  //   console.log("selectedMarker:", selectedMarker);
  //   console.log("Obj[0].MEM:", Obj[0].MEM);
  //   console.log("showMarker:", showMarker);
  //   if (selectedMarker && selectedMarker.BFS_docid === Obj[0].MEM) {
  //     const matchedMarker = items.find(
  //       (item) => item.BFS_docid === selectedMarker.BFS_docid
  //     );

  //     if (matchedMarker) {
  //       const matchedMarkerIndex = items.findIndex(
  //         (item) => item.BFS_docid === selectedMarker.BFS_docid
  //       );

  //       setShowMarker((prevShowMarker) => !prevShowMarker);
  //       setIsToggle((prevIsToggle) => !prevIsToggle);

  //       // items 배열을 업데이트하여 matchedMarker만을 갖도록 함
  //       setItems((prevItems) => [
  //         ...prevItems.slice(0, matchedMarkerIndex),
  //         {
  //           ...matchedMarker,
  //           opacity: showMarker ? 0 : 1, // showMarker 값에 따라 opacity 설정
  //         },
  //         ...prevItems.slice(matchedMarkerIndex + 1),
  //       ]);
  //     }
  //   }
  // };

  let resultArrayData;
  useEffect(() => {
    const fetchData = async () => {
      try {
        resultArrayData = await getAddress("Buddy Find Setting");
        // console.log(resultArrayData);
        setResultArray(resultArrayData);
      } catch (error) {
        console.error("주소를 가져오는 도중 오류 발생:", error);
      }
    };
    displayLocationOnMap(center);

    fetchData();

    // console.log(resultArray);
  }, [center, resultArrayData]);

  function convertAddress() {
    const geocoder = new window.google.maps.Geocoder();
    const inputAddress = document.getElementById("addressInput").value;
    // const address = document.getElementById("addressInput").value;

    geocoder.geocode({ address: inputAddress }, function (results, status) {
      if (status === "OK") {
        const latitude = results[0].geometry.location.lat();
        const longitude = results[0].geometry.location.lng();

        setCoordinates({ lat: latitude, lng: longitude });

        // const resultDiv = document.getElementById("result");
        // resultDiv.innerHTML = "위도: " + latitude + "<br>경도: " + longitude;
        displayLocationOnMap({ lat: latitude, lng: longitude });
      } else {
        alert("실패했습니다: " + status);
      }
    });
  }
  // console.log(coordinates)

  // 버디 찾기 버튼을 눌렀을 때 호출되는 함수
  function displayLocationOnMap(coords) {
    // 좌표를 MapComponent로 전달
    setCoordinates(coords);
  }

  // const handleToggle = () => {
  //   setShowMarker(prevShowMarker => !prevShowMarker);
  //   setIsToggle(previsToggle => !previsToggle)
  // }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log(searchTerm);
  };

  // const handleSearch = (e, inputType) => {
  //   setSearchTerm((prevSearchTerm) => ({
  //     ...prevSearchTerm,
  //     [inputType]: e.target.value,
  //   }));
  // };

  return (
    <>
      <div className={styles.mapNav}>
        <div className={`${styles.buddy}`}>
          <span className={styles.text} onClick={handleToggle}>
            내 마커 지우기
          </span>
          {/* <div className={styles.toggle} >
            <div
              className={`${styles.circle} ${isToggle ? styles.active : ""}`}
            ></div>
          </div> */}
        </div>
      </div>

      <div className={styles.mapContainer}>
        <div className={styles.boxContainer}>
          <div className={styles.boxbtn}>
            <div className={styles.box}>
              <div>종목</div>
              <input
                className={styles.input}
                placeholder="장소를 검색해주세요"
                value={sport}
                onChange={handleSearch}
                // value={searchTerm.sport}
                // onChange={(e) => handleSearch(e, "sport")}
              />
            </div>
            <div className={styles.box}>
              <div>시간</div>
              <input
                className={styles.input}
                id="periodInput"
                placeholder="시간을 입력해주세요"
                value={period}
                onChange={handleSearch}
                // value={searchTerm.period}
                // onChange={(e) => handleSearch(e, "period")}
              />
            </div>
            <div className={styles.box}>
              <div>장소</div>
              <input
                className={styles.input}
                id="addressInput"
                placeholder="지역을 입력해주세요"
                value={addressTwo}
                onChange={(e) => setAddressTwo(e.target.value)}
              />
            </div>
          </div>
          <SelectBtn onClick={convertAddress}>버디찾기</SelectBtn>
        </div>
        <MapComponent
          info={info}
          items={items}
          setItems={setItems}
          member={member}
          setMember={setMember}
          storedMemberMEM={storedMemberMEM}
          address={addrss}
          memAddresses={memAddresses}
          setMemAddresses={setMemAddresses}
          coordinates={coordinates}
          coordinatesTwo={coordinatesTwo}
          setCoordinatesTwo={setCoordinatesTwo}
          setCoordinates={setCoordinates}
          markerOpacity={markerOpacity}
          showMarker={showMarker}
          setMarkerOpacity={setMarkerOpacity}
          selectedMarker={selectedMarker}
          setSelectedMarker={setSelectedMarker}
          selectedBFS_docid={selectedBFS_docid}
          setSelectedBFS_docid={setSelectedBFS_docid}
          setSearchTerm={setSearchTerm}
          searchTerm={searchTerm}
        />
      </div>
    </>
  );
}

export default BuddyFindMap;
