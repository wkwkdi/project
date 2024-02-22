import React, { useState } from "react";
import styles from "./AddressSearch.module.css";
import styled from "styled-components";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

const AddressSearch = ({ onAddressChange }) => {
  const [postcode, setPostcode] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [jibunAddress, setJibunAddress] = useState("");
  const [detailAddress, setDetailAddress] = useState("");

  const SelectBtn = styled(Button)`
    width: 120px;
    height: 30px;
    font-size: 16px;
    background-color: #1e326d;
    color: #fff;
  `;

  const handleInputChange = (field, value) => {
    onAddressChange({
      postcode,
      roadAddress,
      jibunAddress,
      detailAddress,
      [field]: value,
    });

    switch (field) {
      case "postcode":
        setPostcode(value);
        break;
      case "roadAddress":
        setRoadAddress(value);
        break;
      case "jibunAddress":
        setJibunAddress(value);
        break;
      case "detailAddress":
        setDetailAddress(value);
        break;
      default:
        break;
    }
  };

  const navigate = useNavigate();
  const handleSearchClick = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        const roadAddr = data.roadAddress;
        const extraRoadAddr = data.buildingName
          ? " (" + data.buildingName + ")"
          : "";

        setPostcode(data.zonecode);
        setRoadAddress(roadAddr);
        setJibunAddress(data.jibunAddress);

        const guideTextBox = document.getElementById("guide");
        if (data.autoRoadAddress) {
          const expRoadAddr = data.autoRoadAddress + extraRoadAddr;
          guideTextBox.innerHTML = "(예상 도로명 주소: " + expRoadAddr + ")";
          guideTextBox.style.display = "block";
        } else if (data.autoJibunAddress) {
          const expJibunAddr = data.autoJibunAddress;
          guideTextBox.innerHTML = "(예상 지번 주소: " + expJibunAddr + ")";
          guideTextBox.style.display = "block";
        } else {
          guideTextBox.innerHTML = "";
          guideTextBox.style.display = "none";
        }

        onAddressChange({
          postcode: data.zonecode,
          roadAddress: data.roadAddress,
          jibunAddress: data.jibunAddress,
          detailAddress,
        });
      },
    }).open();
    navigate("/Login/SignUp");
  };

  return (
    <div>
      <input
        type="text"
        id="sample4_postcode"
        placeholder="우편번호"
        className={styles.width}
        value={postcode}
        onChange={(e) => handleInputChange("postcode", e.target.value)}
      />
      <SelectBtn onClick={handleSearchClick} className={styles.btn}>
        우편번호 찾기
      </SelectBtn>
      <br />
      <input
        type="text"
        id="sample4_roadAddress"
        placeholder="도로명주소"
        className={styles.width}
        value={roadAddress}
        onChange={(e) => handleInputChange("roadAddress", e.target.value)}
      />
      <input
        type="text"
        id="sample4_jibunAddress"
        placeholder="지번주소"
        className={`${styles.width} ${styles.paddingleft}`}
        value={jibunAddress}
        onChange={(e) => handleInputChange("jibunAddress", e.target.value)}
      />
      <span id="guide" style={{ color: "#999", display: "none" }}></span>
      <br />
      <input
        type="text"
        id="sample4_detailAddress"
        placeholder="상세주소"
        className={styles.maxWidth}
        value={detailAddress}
        onChange={(e) => handleInputChange("detailAddress", e.target.value)}
      />
    </div>
  );
};

export default AddressSearch;
