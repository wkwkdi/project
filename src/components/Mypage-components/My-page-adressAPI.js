import React, { useEffect, useState } from "react";
import styles from "./My-page-adressAPI.module.css";

const AddressForm = ({
  setAdr,
  postcode,
  setPostcode,
  address,
  setAddress,
  detailAddress,
  setDetailAddress,
  extraAddress,
  setExtraAddress,
}) => {
  //   console.log(detailAddress);
  //   setAdr({ address, detailAddress });
  useEffect(() => {
    setAdr({ address, detailAddress, postcode });
  }, [detailAddress]);

  const execDaumPostcode = () => {
    new window.daum.Postcode({
      oncomplete: function (data) {
        let addr = "";
        let extraAddr = "";

        if (data.userSelectedType === "R") {
          addr = data.roadAddress;
        } else {
          addr = data.jibunAddress;
        }

        if (data.userSelectedType === "R") {
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }

          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }

          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }

          setExtraAddress(extraAddr);
        } else {
          setExtraAddress("");
        }

        setPostcode(data.zonecode);
        setAddress(addr);
        setDetailAddress("");
      },
    }).open();
  };

  return (
    <div className={styles.adressBox}>
      <div>
        <input
          type="text"
          id="sample6_postcode"
          placeholder="우편번호"
          value={postcode}
          readOnly
          className={styles.postcode}
        />
        <input
          type="button"
          onClick={execDaumPostcode}
          value="우편번호 찾기"
          className={styles.searchBtn}
        />
      </div>

      <input
        type="text"
        id="sample6_address"
        placeholder="주소"
        value={address}
        readOnly
      />

      <input
        type="text"
        id="sample6_detailAddress"
        placeholder="상세주소"
        value={detailAddress}
        onChange={(e) => {
          setDetailAddress(e.target.value);
          //   console.log(detailAddress);
          //   setAdr({ address, detailAddress: e.target.value });
        }}
      />
      <input
        type="text"
        id="sample6_extraAddress"
        placeholder="참고항목"
        value={extraAddress}
        readOnly
      />
    </div>
  );
};

export default AddressForm;
