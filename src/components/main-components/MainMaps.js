import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindowF,
  MarkerF,
  useJsApiLoader,
} from "@react-google-maps/api";
import dumbbellIcon from "../../assets/dumbbell-solid.svg";
import footballIcon from "../../assets/futbol-regular.svg";
import tableTennisIcon from "../../assets/table-tennis-paddle-ball-solid.svg";
import volleyballIcon from "../../assets/volleyball-solid.svg";
import basketballIcon from "../../assets/basketball-solid.svg";
import WorkingIcon from "../../assets/person-walking-solid.svg";
import swimmingIcon from "../../assets/person-swimming-solid.svg";
import bowlingIcon from "../../assets/bowling-ball-solid.svg";
import hikingIcon from "../../assets/person-hiking-solid.svg";
import bikingIcon from "../../assets/bicycle-solid.svg";

import styles from "./MainMaps.module.css";

const containerStyle = {
  width: "100%",
  height: "100%",
};

// DW아카데미 : 36.328699, 127.422998
// const center = {
//   lat: 36.328699,
//   lng: 127.422998,
// };

// 지도 아이콘 설정
const myStyles = [
  {
    featureType: "poi",
    elementType: "labels",
    stylers: [{ visibility: "off" }],
  },
];

const arr1 = [
  {
    name: "헬스",
    date: 240131,
    time: [8, 13],
    location: { lat: 36.328546, lng: 127.422258 },
    url: dumbbellIcon,
  },
  {
    name: "축구",
    date: 240221,
    time: [8, 13],
    location: { lat: 36.328402, lng: 127.42314 },
    url: footballIcon,
  },
  {
    name: "탁구",
    date: 240311,
    time: [8, 12],
    location: { lat: 36.328931, lng: 127.422356 },
    url: tableTennisIcon,
  },
  {
    name: "배구",
    date: 241131,
    time: [8, 13],
    location: { lat: 36.328419, lng: 127.421318 },
    url: volleyballIcon,
  },
  {
    name: "농구",
    date: 240812,
    time: [1, 13],
    location: { lat: 36.328932, lng: 127.424947 },
    url: basketballIcon,
  },
  {
    name: "겹치1",
    date: 240912,
    time: [7, 13],
    location: { lat: 36.328699, lng: 127.422998 },
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  },
  {
    name: "겹치2",
    date: 241111,
    time: [13, 20],
    location: { lat: 36.328699, lng: 127.422998 },
    url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  },
];

const arr2 = [
  {
    name: "걷기",
    date: 241112,
    time: [1, 2],
    location: { lat: 36.328546, lng: 127.422258 },
    url: WorkingIcon,
  },
  {
    name: "수영",
    date: 241231,
    time: [8, 9],
    location: { lat: 36.328402, lng: 127.42314 },
    url: swimmingIcon,
  },
  {
    name: "볼링",
    date: 240101,
    time: [9, 14],
    location: { lat: 36.328931, lng: 127.422356 },
    url: bowlingIcon,
  },
  {
    name: "등산",
    date: 240603,
    time: [13, 14],
    location: { lat: 36.328419, lng: 127.421318 },
    url: hikingIcon,
  },
  {
    name: "자전거",
    date: 240303,
    time: [20, 21],
    location: { lat: 36.328932, lng: 127.424947 },
    url: bikingIcon,
  },
];

function MainMaps() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyBMgk8uqSEJuNqTYH1mH8ZqQm77xOREeP8",
    version: "weekly",
    language: "ko",
  });

  const [map, setMap] = React.useState(null);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [center, setCenter] = useState({
    lat: 36.328699,
    lng: 127.422998,
  });
  const [renderingArray, setRenderingArray] = useState(arr1);
  console.log(renderingArray);

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    // const bounds = new window.google.maps.LatLngBounds(center);
    // map.fitBounds(bounds);

    // 언어 설정을 onLoad에서 수행
    // map.setOptions({ language: "ko", region: "KR", styles: myStyles });
    // 콘솔에 맵 인스턴스 출력
    // console.log("Map instance:", map);

    // fitBounds 메소드가 있는지 확인
    // if (map.fitBounds) {
    //   const bounds = new window.google.maps.LatLngBounds(center);
    //   map.fitBounds(bounds);
    // } else {
    //   console.error("fitBounds method is not available on the map object.");
    // }

    setMap(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRenderingArray((prev) => (prev === arr1 ? arr2 : arr1));
    }, 5000);

    return () => clearTimeout(timer);
  }, [renderingArray]);

  const handleMarkerClick = (marker) => {
    const markersAtSamePosition = renderingArray.filter(
      (m) =>
        m.location.lat === marker.location.lat &&
        m.location.lng === marker.location.lng
    );

    setSelectedMarker(markersAtSamePosition);
    setCenter(marker.location);
  };

  const closeInfoWindow = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={18}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        disableDefaultUI: true,
      }}
    >
      {renderingArray.map((el, index) => (
        <React.Fragment key={el.name + index}>
          <MarkerF
            className={styles.Marker}
            onLoad={onLoad}
            position={el.location}
            icon={{
              url: el.url,
              scaledSize: new window.google.maps.Size(32, 32),
            }}
            onClick={(e) => {
              setCenter(el.location);
              // console.log(selectedMarker);
              handleMarkerClick(el);
            }}
          />
        </React.Fragment>
      ))}
      {/* {console.log(selectedMarker?.length)} */}
      {selectedMarker && (
        <InfoWindowF
          position={selectedMarker[0].location}
          options={{ pixelOffset: new window.google.maps.Size(0, -25) }}
          onCloseClick={closeInfoWindow}
        >
          <div className={styles.info}>
            {/* <h1 className={styles.infoTitle}>대림헬스장</h1> */}
            <ul>
              {selectedMarker.map((marker, index) => (
                <li className={styles.infoLi} key={index}>
                  <div
                    className={
                      selectedMarker?.length <= 1
                        ? styles.infoBox2
                        : styles.infoBox1
                    }
                  >
                    <p>
                      {marker.name}인 / {marker.name} / {marker.date} /{" "}
                      {`${marker.time[0]} - ${marker.time[1]}`} / 소개
                    </p>
                    <div>1:1 대화하기</div>
                  </div>
                </li>
              ))}
            </ul>
            {/* <p>모두 운동해요!</p> */}
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MainMaps);
