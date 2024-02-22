import React, { useState } from "react";

const ParkSelector = ({ setAddress }) => {
  const [metroStation, setMetroStation] = useState("");
  const [selectedPark, setSelectedPark] = useState("");

  const handleMetroStationChange = (event) => {
    setMetroStation(event.target.value);
    setSelectedPark(""); // Reset selectedPark when metroStation changes
  };

  const getParkLabel = (parkValue) => {
    // 함수를 사용하여 선택된 parkValue에 대한 라벨을 가져옵니다.
    switch (parkValue) {
      case "wuri":
        return "우리들공원";
      case "deahung":
        return "대흥공원";
      case "yangji":
        return "양지근린공원";
      case "chung":
        return "서대전공원";
      case "jung":
        return "테미공원";
      case "DW":
        return "DW아카데미";
      default:
        return "";
    }
  };
  const updateAddress = (parkValue) => {
    const parkLabel = getParkLabel(parkValue);
    setAddress(parkLabel);
  };
  return (
    <div>
      <label>Metro Station:</label>
      <select value={metroStation} onChange={handleMetroStationChange}>
        <option>장소선택</option>
        <option value="chung">중앙로역</option>
        <option value="jung">중구청역</option>
      </select>

      {metroStation === "chung" && (
        <div>
          <label>Park:</label>
          <select
            value={selectedPark}
            onChange={(e) => {
              setSelectedPark(e.target.value);
              updateAddress(e.target.value);
            }}
          >
            <option>장소선택</option>
            <option value="wuri">우리들공원</option>
            <option value="deahung">대흥공원</option>
            <option value="DW">DW아카데미</option>
          </select>
        </div>
      )}

      {metroStation === "jung" && (
        <div>
          <label>Park:</label>
          <select
            value={selectedPark}
            onChange={(e) => {
              setSelectedPark(e.target.value);
              updateAddress(e.target.value);
            }}
          >
            <option>장소선택</option>
            <option value="chung">서대전공원</option>
            <option value="yang">대전양지근린공원</option>
            <option value="jung">테미공원</option>
          </select>
        </div>
      )}

      {/* Use getParkLabel function to get the label for the selectedPark */}
      {/* <p>Selected Park: {getParkLabel(selectedPark)}</p> */}
    </div>
  );
};

export default ParkSelector;
