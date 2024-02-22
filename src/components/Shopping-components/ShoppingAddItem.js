import { useEffect, useRef, useState } from "react";
import styles from "./ShoppingAddItem.module.css";
import ShoppingBanner from "./ShoppingBanner";
import xIcon from "../../assets/xmark-solid.svg";
import initialImg from "../../assets/initialImg.svg";
import { addStoreItemData } from "../../api/firebase";
import { useLocation, useNavigate } from "react-router-dom";

function ShoppingAddItem() {
  const [preview, setPreview] = useState("initialValue");
  const [preview2, setPreview2] = useState("initialValue");
  const [preview3, setPreview3] = useState("initialValue");
  const [preview4, setPreview4] = useState("initialValue");
  const [forFile, setForFile] = useState("initialValue");
  const [forFile2, setForFile2] = useState("initialValue");
  const [forFile3, setForFile3] = useState("initialValue");
  const [forFile4, setForFile4] = useState("initialValue");
  const imgRef = useRef(null);
  const detailsImgRef = useRef(null);
  const detailsImgRef1 = useRef(null);
  const detailsImgRef2 = useRef(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState(false);
  const [category, setCategory] = useState("장비");
  const location = useLocation();
  const { state } = location;
  console.log(state);

  useEffect(() => {
    if (!state) return;

    if (state) {
      setTitle(state.STORE_NAME);
      setCategory(state.STORE_CATEGORY);
      setPrice(state.STORE_PRICE);
      setStock(state.STORE_STOCK);
      setForFile(
        state.STORE_IMAGES[0] ? state.STORE_IMAGES[0] : "initialValue"
      );
      setForFile2(
        state.STORE_IMAGES[1] ? state.STORE_IMAGES[1] : "initialValue"
      );
      setForFile3(
        state.STORE_IMAGES[2] ? state.STORE_IMAGES[2] : "initialValue"
      );
      setForFile4(
        state.STORE_IMAGES[3] ? state.STORE_IMAGES[3] : "initialValue"
      );
    }
  }, []);

  // 파일 선택
  const handleChange = (e, set) => {
    console.log(e.target.files[0]);
    // console.log(e);
    // console.log(imgRef);
    set(e.target.files[0]);
  };
  // 재고유무 체크
  const handleSelectBOxChange = (e) => {
    console.log(e.target.value);
    setCategory(e.target.value);
  };

  // 삭제
  const handleprevImgDelete = (setPreview, setFile) => {
    setPreview("initialValue");
    setFile("initialValue");
  };

  // main 사진
  useEffect(() => {
    if (!forFile) return;

    console.log(forFile);

    // File일 경우
    if (typeof forFile === "object" && forFile instanceof File) {
      const nextPreview = URL.createObjectURL(forFile);
      setPreview(nextPreview);
      return () => {
        URL.revokeObjectURL(nextPreview);
      };
      // 문자열(url일 경우)
    } else if (typeof forFile === "string") {
      setPreview(forFile);
    }
  }, [forFile]);

  //   컨텐츠 1 사진
  useEffect(() => {
    if (!forFile2) return;

    console.log(forFile2);

    // File일 경우
    if (typeof forFile2 === "object" && forFile2 instanceof File) {
      const nextPreview = URL.createObjectURL(forFile2);
      setPreview2(nextPreview);
      return () => {
        URL.revokeObjectURL(nextPreview);
      };
      // 문자열(url일 경우)
    } else if (typeof forFile2 === "string") {
      setPreview2(forFile2);
    }
  }, [forFile2]);

  //   컨텐츠 2 사진
  useEffect(() => {
    if (!forFile3) return;

    console.log(forFile3);

    // File일 경우
    if (typeof forFile3 === "object" && forFile3 instanceof File) {
      const nextPreview = URL.createObjectURL(forFile3);
      setPreview3(nextPreview);
      return () => {
        URL.revokeObjectURL(nextPreview);
      };
      // 문자열(url일 경우)
    } else if (typeof forFile3 === "string") {
      setPreview3(forFile3);
    }
  }, [forFile3]);
  //   컨텐츠 3 사진
  useEffect(() => {
    if (!forFile4) return;

    console.log(forFile4);

    // File일 경우
    if (typeof forFile4 === "object" && forFile4 instanceof File) {
      const nextPreview = URL.createObjectURL(forFile4);
      setPreview4(nextPreview);
      return () => {
        URL.revokeObjectURL(nextPreview);
      };
      // 문자열(url일 경우)
    } else if (typeof forFile4 === "string") {
      setPreview4(forFile4);
    }
  }, [forFile4]);

  const navigate = useNavigate();

  //   아이쳄 등록하기
  const handleSubmit = async () => {
    // arr에 null값이 들어가지 않아서 filter를 이용하여 존재하는 값만으로 배열을 새로 만드는 과정
    // 그러나 이제 문자열을 기본값으로 주어지기에 거의 유명무실해진 코드
    const images = [forFile, forFile2, forFile3, forFile4].filter(
      (file) => file !== null
    );

    const datas = {
      STORE_NAME: title,
      STORE_CATEGORY: category,
      STORE_PRICE: price,
      STORE_STOCK: stock,
      STORE_IMAGES: images,
    };
    console.log(datas);

    try {
      await addStoreItemData("Store", datas, state ? state : null);
      navigate("/shopping");
    } catch (error) {
      alert("저장실패");
    }
  };

  return (
    <>
      <ShoppingBanner
        title={`물품추가`}
        summary={`이곳에선 물품을 추가합니다.`}
      />
      <div className={styles.container}>
        <div className={styles.headBox}>
          {/* 이미지추가 */}
          <div className={styles.imgBox}>
            <input
              type="file"
              onChange={(e) => {
                handleChange(e, setForFile);
              }}
              ref={imgRef}
              className={styles.hiddenInput}
            />
            <div className={styles.previewWrap}>
              <img
                src={preview === "initialValue" ? initialImg : preview}
                alt="미리보기"
                className={styles.preview}
              />
            </div>
            <img
              src={xIcon}
              className={styles.imgX}
              onClick={() => handleprevImgDelete(setPreview, setForFile)}
            />
          </div>
          <div className={styles.infoBox}>
            <div className={styles.infoBar}>
              <p>제품명 : </p>
              <input
                type="text"
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className={styles.infoBar}>
              <p>카테고리 : </p>
              <select
                defaultValue="장비"
                className={styles.selectBox}
                onChange={(e) => handleSelectBOxChange(e)}
              >
                <option value="장비">장비</option>
                <option value="의류">의류</option>
                <option value="식품">식품</option>
                <option value="기타">기타</option>
              </select>
            </div>
            <div className={styles.infoBar}>
              <p>가격 : </p>
              <input
                type="text"
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>
            <div className={styles.infoBar}>
              <p>재고상태 : </p>
              <div className={styles.stockBtns}>
                <label className={styles.stockBtnWrap}>
                  판매가능
                  <input
                    className={styles.stockBtn}
                    name="stock"
                    type="radio"
                    checked={stock}
                    onChange={() => {
                      setStock(true);
                    }}
                  />
                </label>
                <label className={styles.stockBtnWrap}>
                  품절
                  <input
                    className={styles.stockBtn}
                    name="stock"
                    type="radio"
                    checked={!stock}
                    onChange={() => {
                      setStock(false);
                    }}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.contentBox}>
          <p className={styles.contentDescription}>상세보기</p>
          {/* 컨텐츠 1 */}
          <div className={styles.content}>
            <input
              type="file"
              onChange={(e) => {
                handleChange(e, setForFile2);
              }}
              ref={detailsImgRef}
              className={styles.hiddenInput}
            />
            <div className={styles.previewWrap}>
              <img
                src={preview2 === "initialValue" ? initialImg : preview2}
                alt="미리보기"
                className={styles.preview}
              />
            </div>
            <img
              src={xIcon}
              className={styles.imgX}
              onClick={() => {
                handleprevImgDelete(setPreview2, setForFile2);
                handleprevImgDelete(setPreview3, setForFile3);
                handleprevImgDelete(setPreview4, setForFile4);
              }}
            />
          </div>
          {/* 컨텐츠 2 */}
          {preview2 !== "initialValue" ? (
            <div className={styles.content}>
              <input
                type="file"
                onChange={(e) => {
                  handleChange(e, setForFile3);
                }}
                ref={detailsImgRef1}
                className={styles.hiddenInput}
              />
              <div className={styles.previewWrap}>
                <img
                  src={preview3 === "initialValue" ? initialImg : preview3}
                  alt="미리보기"
                  className={styles.preview}
                />
              </div>
              <img
                src={xIcon}
                className={styles.imgX}
                onClick={() => {
                  handleprevImgDelete(setPreview3, setForFile3);
                  handleprevImgDelete(setPreview4, setForFile4);
                }}
              />
            </div>
          ) : (
            ""
          )}

          {/* 컨텐츠 3 */}
          {preview3 !== "initialValue" ? (
            <div className={styles.content}>
              <input
                type="file"
                onChange={(e) => {
                  handleChange(e, setForFile4);
                }}
                ref={detailsImgRef2}
                className={styles.hiddenInput}
              />
              <div className={styles.previewWrap}>
                <img
                  src={preview4 === "initialValue" ? initialImg : preview4}
                  alt="미리보기"
                  className={styles.preview}
                />
              </div>
              <img
                src={xIcon}
                className={styles.imgX}
                onClick={() => handleprevImgDelete(setPreview4, setForFile4)}
              />
            </div>
          ) : (
            ""
          )}
          {/* 종료 */}
          <div
            className={styles.submit}
            onClick={() => {
              handleSubmit();
            }}
          >
            등록하기
          </div>
        </div>
      </div>
    </>
  );
}

export default ShoppingAddItem;

// 나중에 중복코드를 줄이자
// import { useEffect, useRef, useState } from "react";
// import styles from "./ShoppingAddItem.module.css";
// import ShoppingBanner from "./ShoppingBanner";
// import xIcon from "../../assets/xmark-solid.svg";
// import initialImg from "../../assets/dolly-solid.svg";

// function ShoppingAddItem() {
//   const [inputs, setInputs] = useState([
//     { preview: null, forFile: null, ref: useRef(null) },
//     { preview: null, forFile: null, ref: useRef(null) },
//     { preview: null, forFile: null, ref: useRef(null) },
//   ]);

//   const handleChange = (e, index) => {
//     const newInputs = [...inputs];
//     newInputs[index].forFile = e.target.files[0];
//     setInputs(newInputs);
//   };

//   const handlePrevImgDelete = (index) => {
//     const newInputs = [...inputs];
//     newInputs[index].forFile = null;
//     setInputs(newInputs);
//   };

//   useEffect(() => {
//     inputs.forEach((input, index) => {
//       if (input.forFile) {
//         const nextPreview = URL.createObjectURL(input.forFile);
//         input.preview = nextPreview;

//         return () => {
//           URL.revokeObjectURL(nextPreview);
//         };
//       }
//     });
//   }, [inputs]);

//   return (
//     <>
//       <ShoppingBanner title={`물품추가`} summary={`이곳에선 물품을 추가합니다.`} />
//       <div className={styles.container}>
//         <div className={styles.headBox}>
//           {/* 이미지추가 */}
//           {inputs.map((input, index) => (
//             <div key={index} className={styles.imgBox}>
//               <input
//                 type="file"
//                 onChange={(e) => handleChange(e, index)}
//                 ref={input.ref}
//                 className={styles.hiddenInput}
//               />
//               <div className={styles.previewWrap}>
//                 <img
//                   src={input.preview || initialImg}
//                   alt="미리보기"
//                   className={styles.preview}
//                 />
//               </div>
//               <img
//                 src={xIcon}
//                 className={styles.imgX}
//                 onClick={() => handlePrevImgDelete(index)}
//               />
//             </div>
//           ))}
//           {/* 나머지 코드 생략 */}
//         </div>
//       </div>
//     </>
//   );
// }

// export default ShoppingAddItem;
