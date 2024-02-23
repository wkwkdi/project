import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import styles from "./MapComponent.module.css";
import { addChatRoom, addData, deleteDatas, getAddress } from "../api/firebase";
import ConvertAddress from "./utils/ConvertAddress";
import { Navigate, useNavigate } from "react-router-dom";
import dumbbellIcon from "../assets/dumbbell-solid.svg";
import footballIcon from "../assets/futbol-regular.svg";
import tableTennisIcon from "../assets/table-tennis-paddle-ball-solid.svg";
import volleyballIcon from "../assets/volleyball-solid.svg";
import basketballIcon from "../assets/basketball-solid.svg";
import WorkingIcon from "../assets/person-walking-solid.svg";
import swimmingIcon from "../assets/person-swimming-solid.svg";
import bowlingIcon from "../assets/bowling-ball-solid.svg";
import hikingIcon from "../assets/person-hiking-solid.svg";
import bikingIcon from "../assets/bicycle-solid.svg";

const MapComponent = ({
  addMarkerWithInfo,
  coordinates,
  setCoordinates,
  markerOpacity,
  setCoordinatesTwo,
  coordinatesTwo,
  memAddresses,
  setMemAddresses,
  items,
  setItems,
  selectedMarker,
  setSelectedMarker,
  setSearchTerm,
  searchTerm,
  info,
}) => {
  // const [items, setItems] = useState([]);
  // const [memAddresses, setMemAddresses] = useState([]);
  // const [markers, setMarkers] = useState([]);
  // const [selectedMarker, setSelectedMarker] = useState(null)
  const [infoWindows, setInfoWindows] = useState([]);
  const [map, setMap] = useState(null);
  const currentUser = JSON.parse(localStorage.getItem("Member"));
  const [meminfo, setMeminfo] = useState("");
  // 채팅 중복 확인
  const [chat, setChat] = useState([]);

  console.log(currentUser[0]);

  useEffect(() => {
    // items 상태가 변경될 때마다 MEM_ADDRESS 값을 로그에 출력합니다.
    setMemAddresses(
      items.map((item) => (item.BFS_PLACE ? item.BFS_PLACE : ""))
    );
    // console.log(memAddresses);
  }, [items]);

  console.log(items);

  const handleLoad = async () => {
    try {
      const chatData = await getAddress("Chat");
      setChat(chatData);

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
  const processDuplicateCoordinates = (coordinatesArray) => {
    const processedArray = [];

    coordinatesArray.forEach((coordinates, index) => {
      // 중복된 좌표인지 확인
      const isDuplicate = processedArray.some((coord) =>
        areCoordinatesEqual(coord, coordinates)
      );

      // 중복된 좌표라면 조정값을 더해서 새로운 좌표 생성
      if (isDuplicate) {
        const adjustedCoordinates = adjustCoordinates(coordinates);
        processedArray.push(adjustedCoordinates);
      } else {
        processedArray.push(coordinates);
      }
    });

    return processedArray;
  };

  const areCoordinatesEqual = (coord1, coord2) => {
    return coord1.lat === coord2.lat && coord1.lng === coord2.lng;
  };

  const adjustCoordinates = (coordinates) => {
    const adjustedLat = coordinates.lat + (Math.random() - 0.5) * 0.0002; // 조정 값 변경
    const adjustedLng = coordinates.lng + (Math.random() - 0.5) * 0.0002; // 조정 값 변경
    return { lat: adjustedLat, lng: adjustedLng };
  };

  // console.log(items);
  // console.log(coordinatesTwo);

  useEffect(() => {
    handleLoad();
  }, [searchTerm]);

  useEffect(() => {
    // coordinatesTwo를 인덱스를 기준으로 정렬하여 업데이트합니다.
    const sortedCoordinates = coordinatesTwo.sort((a, b) => a.index - b.index);
    setCoordinatesTwo(sortedCoordinates);
  }, [coordinatesTwo, setCoordinatesTwo, coordinates]);

  const docid = items.map((item) => item.docId);

  const handleMarkerClick = async (index, dataAll, docId) => {
    console.log(index);
    console.log(docId);
    console.log(dataAll);
    // const currentMockItem = items[index];
    const clickedMarkerCoordinates = coordinatesTwo[index];
    setSelectedMarker(clickedMarkerCoordinates);
    console.log(clickedMarkerCoordinates);
  };

  // const handleMarkerClick = (index, BFS_docid) => {
  //   setSelectedMarker({ index, BFS_docid });
  //   console.log("선택한 index", index);
  // };

  // 여기가 삭제 부분 마커-------------------------------------------------------------------------------------------------------------------------------
  // 관리자만 보임
  const deleteDarker = async (docId) => {
    console.log(docId);
    const abc = await deleteDatas("Buddy Find Setting", docId);
    if (abc) {
      alert("삭제되었습니다");
      handleLoad();
    } else {
      alert("삭제안됌");
    }
    console.log(`클릭한 docId : updatedResult.BFS_docid`);
  };

  let memdocId;
  console.log(chat);

  const navigation = useNavigate();
  console.log(chat);
  const naviClick = async (e) => {
    console.log(`선택된 사용자 정보 :`, e.target.lastChild.value);
    const memValue = e.target.lastChild.value;
    console.log(chat);

    // 채팅방에 내가 만든게 있는지 확인
    const otherArray = chat?.filter(
      (item) =>
        (item?.docId[0] === currentUser[0]?.MEM_NICKNAME &&
          item?.docId[1] === memValue) ||
        (item?.docId[1] === currentUser[0]?.MEM_NICKNAME &&
          item?.docId[0] === memValue)
    );
    console.log(otherArray); // ['liio89@nate.com', 'limyonso@gmail.com']

    // 채팅방 생성 및 이동
    if (otherArray[0]?.id) {
      alert("이미 채팅방이 있습니다.");
      navigation("/chatting", { state: otherArray[0]?.id });
    } else {
      const title = window.prompt("채팅방 제목을 입력하세요.");
      if (title) {
        const chatRoom = await addChatRoom(
          "Chat",
          currentUser[0]?.MEM_NICKNAME,
          memValue,
          title
        );
        console.log(chatRoom);
        if (chatRoom) {
          navigation("/chatting", { state: chatRoom?.doc });
        }
      }
    }
  };

  return (
    <>
      <div className={styles.flex}>
        <div className={styles.mapping}>
          <LoadScript googleMapsApiKey="AIzaSyCi36s8SAwoRdUQLvVgdvbGrzx84AcMNn4">
            <GoogleMap
              center={coordinates || { lat: 36.3286904, lng: 127.4229992 }}
              zoom={16}
              mapContainerStyle={{ width: "949px", height: "600px" }}
            >
              {/* ConvertAddress 컴포넌트의 사용 방법에 대한 가정 */}
              {/* items와 memAddresses를 props로 전달 */}
              <ConvertAddress
                map={map}
                addMarkerWithInfo={addMarkerWithInfo}
                items={items}
                memAddresses={memAddresses}
                setCoordinatesTwo={setCoordinatesTwo}
                setCoordinates={setCoordinates}
                setItems={setItems}
              />
              {coordinatesTwo.map((coordinates, index) => {
                const currentDocId = items;
                const currentMockItem = items[index];
                console.log(currentMockItem);
                // console.log(currentDocId);

                // MEM_ADDRESS가 존재할 때만 마커를 생성
                if (
                  currentMockItem &&
                  currentMockItem.BFS_PLACE &&
                  (currentMockItem.BFS_TIME.includes(searchTerm) ||
                    currentMockItem.BFS_SPORTS.includes(searchTerm))
                ) {
                  const spo = currentMockItem.BFS_SPORTS;

                  // 아이콘 선택
                  const selectedIcon =
                    spo === "농구"
                      ? basketballIcon
                      : spo === "탁구"
                      ? tableTennisIcon
                      : spo === "배구"
                      ? volleyballIcon
                      : spo === "축구"
                      ? footballIcon
                      : spo === "족구"
                      ? footballIcon
                      : spo === "걷기"
                      ? WorkingIcon
                      : spo === "수영"
                      ? swimmingIcon
                      : spo === "볼링"
                      ? bowlingIcon
                      : spo === "등산"
                      ? hikingIcon
                      : spo === "자전거"
                      ? bikingIcon
                      : null;
                  const selectedIconSize = {
                    width: 32, // 원래 아이콘의 폭
                    height: 32, // 원래 아이콘의 높이
                  };

                  // console.log("Item:", currentMockItem);
                  // console.log("Search Term:", searchTerm);
                  // console.log(
                  // "Condition Result:",
                  // currentMockItem.BFS_TIME.includes(searchTerm) ||
                  // currentMockItem.BFS_SPORTS.includes(searchTerm)
                  // );
                  return (
                    <Marker
                      key={index}
                      position={coordinates}
                      onClick={() =>
                        handleMarkerClick(
                          index,
                          currentDocId,
                          currentMockItem?.docId
                        )
                      }
                      icon={{
                        url: selectedIcon,
                        scaledSize:
                          window.google && window.google.maps
                            ? new window.google.maps.Size(32, 32)
                            : null,
                      }}
                      // onClick={() => handleMarkerClick(index)}
                      opacity={markerOpacity}
                    >
                      {selectedMarker &&
                        selectedMarker.lat === coordinatesTwo[index].lat &&
                        selectedMarker.lng === coordinatesTwo[index].lng && (
                          <InfoWindowF
                            position={selectedMarker}
                            onCloseClick={() => {
                              setSelectedMarker(null);
                            }}
                          >
                            <div>
                              {items
                                .filter(
                                  (item, i) =>
                                    coordinatesTwo[i].lat ===
                                      selectedMarker.lat &&
                                    coordinatesTwo[i].lng === selectedMarker.lng
                                )
                                .map((item, i) => (
                                  <div className={styles.box} key={i}>
                                    <div className={styles.infoWindowBox}>
                                      <p>{`닉네임 : ${item.BFS_NICKNAME}`}</p>
                                      <p>{`종목: \n ${item.BFS_SPORTS}`}</p>
                                      <p>{`시간: \n ${item.BFS_TIME}`}</p>
                                      {info?.manager && (
                                        <button
                                          className={styles.delMarler}
                                          onClick={() => deleteDarker(item?.id)}
                                        >
                                          X
                                        </button>
                                      )}
                                    </div>
                                    <div className={styles.info}>
                                      <p>{`한줄소개: \n  ${item.BFS_TITLE}`}</p>
                                      <button onClick={naviClick}>
                                        채팅 하러 가기
                                        <input
                                          type="hidden"
                                          value={item?.BFS_NICKNAME}
                                        />
                                      </button>
                                    </div>
                                  </div>
                                ))}
                            </div>
                          </InfoWindowF>
                        )}
                    </Marker>
                  );
                }

                return null; // MEM_ADDRESS가 없으면 null 반환하여 마커를 생성하지 않음
              })}
            </GoogleMap>
          </LoadScript>
        </div>
      </div>
    </>
  );
};

export default MapComponent;
