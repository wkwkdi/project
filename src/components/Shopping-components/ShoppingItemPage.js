import { Link, useLocation, useNavigate } from "react-router-dom";
import ShoppingBanner from "./ShoppingBanner";
import styles from "./ShoppingItemPage.module.css";
import plusIcon from "../../assets/plus-solid.svg";
import minusIcon from "../../assets/minus-solid.svg";
import { useEffect, useRef, useState } from "react";
import ShowStar from "./ShowStar";
import xMark from "../../assets/xmark-solid.svg";
import {
  addStoreItemReviewData,
  deleteReviewData,
  deleteStoreItemData,
  addCartItem,
  getStoreItemData,
  getStoreItemDatas,
} from "../../api/firebase";
import xIcon from "../../assets/xmark-solid.svg";
import initialImg from "../../assets/modal-plus.svg";

const delivery = 3000;
const discount = 2000;

function ShoppingItemPage() {
  const props = useLocation();
  const { state } = props;
  console.log(state);
  const [number, setNumber] = useState(1);
  const [item, setItem] = useState({});
  const user = JSON.parse(localStorage.getItem("Member"));
  console.log(user[0]);
  const Manager = JSON.parse(localStorage.getItem("Manager"));
  console.log(item);
  // console.log(user[0].MEM_NAME);
  const [modalState, setModalState] = useState(false);
  const time = new Date().getTime();
  const [reviewWriteContents, setReviewWriteContents] = useState({
    STORE_REVIEW: "",
    STORE_RATING: 0,
    STORE_REVIEW_TIME: time,
    MEM_NICKNAME: user[0]?.MEM_NICKNAME,
    MEM: user[0]?.MEM,
  });
  const [inputs, setInputs] = useState([
    { preview: "initialValue", forFile: "initialValue", ref: useRef(null) },
    { preview: "initialValue", forFile: "initialValue", ref: useRef(null) },
    { preview: "initialValue", forFile: "initialValue", ref: useRef(null) },
  ]);

  console.log(inputs);

  const [reviews, setReviews] = useState(item.STORE_REVIEWS);
  const [thankModal, setThankModal] = useState(false);

  const [itemList, setItemList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onLoad = async () => {
      const tempItem = await getStoreItemData("Store", state?.STORE_DOCID);
      console.log(tempItem);
      setItem(tempItem);
    };
    onLoad();
    //reviews(후기)가 변할 때마다 렌더링 시켰다
  }, [reviews]);

  const handleTextValue = (e) => {
    // console.log(e.target.value);
    setReviewWriteContents((prev) => ({
      ...prev,
      STORE_REVIEW: e.target.value,
    }));
  };
  // console.log(reviewWriteContents);

  // 문서삭제
  const handleItemDelete = async () => {
    await deleteStoreItemData("Store", state);
    alert("스토어 아이템을 삭제했어요!");
    navigate("/shopping");
  };

  // 감사모달조절장치
  useEffect(() => {
    let timeoutId;

    if (thankModal) {
      // showModal이 true이면 3초 후에 모달을 닫음
      timeoutId = setTimeout(() => {
        setThankModal(false);
      }, 1500);
    }

    // cleanup 함수: 컴포넌트가 언마운트되거나 showModal 상태가 변경될 때 실행
    return () => {
      clearTimeout(timeoutId);
    };
  }, [thankModal]);

  // 리뷰작성
  const handleReviewSubmitBtn = async () => {
    const images = inputs.map((input) => input.forFile);
    // console.log(images);
    const reviewFormData = {
      ...reviewWriteContents,
      STORE_REVIEW_IMAGE: images,
    };
    console.log(reviewFormData);
    const upLoadReview = await addStoreItemReviewData(
      "Store",
      state?.STORE_DOCID,
      reviewFormData,
      item
    );
    setReviews(upLoadReview);
    setModalState(false);
  };

  // 리뷰삭제
  const handleReviewDelete = async () => {
    const newArr = await deleteReviewData("Store", item, user[0].MEM, state);

    setReviews(newArr);
  };

  // 모달이미지제어
  const handleChange = (e, index) => {
    const newInputs = [...inputs];
    newInputs[index].forFile = e.target.files[0];

    // 기존에 생성된 URL 해제
    if (
      typeof inputs[index].forFile === "object" &&
      inputs[index].preview !== "initailValue"
    ) {
      URL.revokeObjectURL(inputs[index].preview);
    }

    // 새로운 preview 생성
    if (typeof newInputs[index].forFile === "object") {
      const nextPreview = URL.createObjectURL(newInputs[index].forFile);
      newInputs[index].preview = nextPreview;
    } else {
      newInputs[index].preview = initialImg;
    }

    setInputs(newInputs);
  };

  const handlePrevImgDelete = (index) => {
    const newInputs = [...inputs];
    newInputs[index].forFile = "initialValue";
    newInputs[index].preview = "initialValue";
    setInputs(newInputs);
  };

  // 댓글 시간변환
  function timeChange(stemp) {
    const date = new Date(stemp);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 해주고, 두 자리 숫자로 변환
    const day = String(date.getDate()).padStart(2, "0"); // 일자를 두 자리 숫자로 변환
    const formattedDate = `${year}-${month}-${day}`;

    // console.log(formattedDate); // "yyyy-mm-dd" 형식의 날짜 출력
    return formattedDate;
  }
  // 평균별점구하는 함수?
  // function averageStarRating() {
  //   let number = 0;
  //   item.STORE_REVIEWS.map((el) => {
  //     number = number + el.STORE_RATING;
  //   });

  //   return number;
  // }

  let num = 0;
  item["STORE_REVIEWS"]?.map((el, index, arrey) => {
    index + 1 === arrey.length
      ? (num = (num + el.STORE_RATING) / arrey.length)
      : (num = num + el.STORE_RATING);
  });

  // 장바구니 담기
  const getItemToCart = async () => {
    console.log();
    const cartData = {
      CART_TIME: new Date().getTime(),
      CART_ITEM_CODE: item.STORE_ID,
      CART_ITEM_DOCID: state.STORE_DOCID,
      CART_ITEM_COUNT: number,
    };
    await addCartItem("ShoppingCart", user[0].MEM, cartData)
      .then(() => {
        navigate("/cart");
      })
      .catch((error) => {
        console.log(error);
        console.log("장바구니 저장 오류");
      });
  };

  // 관련상품 불러오기
  const getItem = async () => {
    const arr = await getStoreItemDatas("Store");

    setItemList(arr);
  };

  useEffect(() => {
    getItem();
  }, []);
  console.log(itemList);

  const temperArr = itemList.filter((el) => {
    return el.STORE_CATEGORY == item.STORE_CATEGORY;
  });

  const newArr = temperArr.slice().sort((a, b) => {
    const averageRatingA = () => {
      console.log("A함수진입");
      let numA = 0;
      if (a["STORE_REVIEWS"] && a["STORE_REVIEWS"].length >= 1) {
        a["STORE_REVIEWS"].forEach((el) => {
          numA += el.STORE_RATING;
        });
        numA /= a["STORE_REVIEWS"].length;
      }
      console.log(numA);
      return numA;
    };
    const averageRatingB = () => {
      let numB = 0;
      if (b["STORE_REVIEWS"] && b["STORE_REVIEWS"].length >= 1) {
        b["STORE_REVIEWS"].forEach((el) => {
          numB += el.STORE_RATING;
        });
        numB /= b["STORE_REVIEWS"].length;
      }
      console.log(numB);
      return numB;
    };
    // 정렬 기준에 따라 a와 b를 비교합니다.
    return averageRatingB() - averageRatingA();
  });

  // 스크롤 이벤트
  const containerRef = useRef(null);
  let scrollPosition = 0;

  const handleScroll = (event) => {
    // ul 요소의 너비를 기준으로 스크롤 위치를 업데이트
    const containerWidth = containerRef.current.offsetWidth;
    const scrollWidth = containerRef.current.scrollWidth - containerWidth;

    // 스크롤 이벤트 발생 시의 스크롤 위치 계산
    const delta = event.deltaY || event.detail || event.wheelDelta;
    if (delta > 0) {
      // 아래로 스크롤하는 경우
      scrollPosition = Math.min(scrollPosition + 30, scrollWidth);
    } else {
      // 위로 스크롤하는 경우
      scrollPosition = Math.max(scrollPosition - 30, 0);
    }

    // 스크롤 위치를 업데이트하여 스크롤 이동
    containerRef.current.scrollLeft = scrollPosition;

    // 이벤트 전파 방지
    event.preventDefault();
  };
  useEffect(() => {
    const container = containerRef.current;

    // container 영역에 대한 wheel 이벤트 핸들러 등록
    container.addEventListener("wheel", handleScroll);

    // 컴포넌트 언마운트 시 이벤트 핸들러 제거
    return () => {
      container.removeEventListener("wheel", handleScroll);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <ShoppingBanner title={`쇼핑`} summary={`필요한 제품을 찾아보세요!`} />
      <div className={styles.container}>
        {/* 헤더부분 */}
        <div className={styles.headBox}>
          <div className={styles.headBoxItem}>
            {item.STORE_IMAGES?.map((el, index) => {
              return index === 0 ? <img key={index} src={el} /> : null;
            })}
          </div>
          {/* 갯수 및 품절 */}
          <div className={`${styles.headBoxItem} ${styles.headBoxItemMiddle}`}>
            <p className={styles.itemTitle}>{item?.STORE_NAME}</p>
            <ShowStar num={num} />
            <div className={styles.line}></div>
            <div className={styles.isStock}>
              재고여부 : {item?.STORE_STOCK ? "구매가능" : "품절"}
            </div>
            {item.STORE_STOCK ? (
              <div className={styles.howMany}>
                <div className={styles.iconWrap}>
                  <img
                    src={plusIcon}
                    alt="plusIcon"
                    onClick={() => {
                      setNumber((prev) => prev + 1);
                    }}
                  />
                </div>
                <div className={styles.number}>{number}</div>
                <div className={styles.iconWrap}>
                  <img
                    src={minusIcon}
                    alt="plusIcon"
                    onClick={() => {
                      if (number > 1) {
                        setNumber((prev) => prev - 1);
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              <div style={{ fontSize: "32px", color: "var(--text-color)" }}>
                <img src={minusIcon} width={36} height={36} />
              </div>
            )}
          </div>
          {/* 액수 및 장바구니 버튼 */}
          <div className={styles.headBoxItem}>
            {item.STORE_STOCK ? (
              <>
                <div className={styles.priceBoxItem}>
                  <div>상품금액</div>
                  <div>{Number(item.STORE_PRICE).toLocaleString()} 원</div>
                </div>
                <div className={styles.priceBoxItem}>
                  <div>할인금액</div>
                  <div>- {discount.toLocaleString()} 원</div>
                </div>
                <div className={styles.priceBoxItem}>
                  <div>배송비</div>
                  <div> {delivery.toLocaleString()} 원</div>
                </div>
                <div className={`${styles.priceBoxItem} ${styles.total}`}>
                  <div>합계</div>
                  <div>
                    {" "}
                    {(
                      item.STORE_PRICE * number -
                      discount +
                      delivery
                    ).toLocaleString()}{" "}
                    원
                  </div>
                </div>
                {Manager ? (
                  <div className={styles.adminBtns}>
                    <Link to="/shopping/addItem" state={state}>
                      <div className={styles.basket}>수정</div>
                    </Link>
                    <div className={styles.basket} onClick={handleItemDelete}>
                      삭제
                    </div>
                  </div>
                ) : (
                  <div className={styles.basket} onClick={getItemToCart}>
                    장바구니
                  </div>
                )}
              </>
            ) : (
              <div className={styles.soldOut}>
                <p>죄송합니다.</p>
                <p>상품을 준비 중입니다.</p>
                <p>조금만 기다려주세요.</p>
                {Manager ? (
                  <div className={styles.adminBtns}>
                    <Link to="/shopping/addItem" state={state}>
                      <div className={styles.basket}>수정</div>
                    </Link>
                    <div className={styles.basket} onClick={handleItemDelete}>
                      삭제
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>
          {/* 상세정보 */}
        </div>
        <div className={styles.details}>
          <p className={styles.detailsHead}>상세정보</p>

          {item.STORE_IMAGES?.map(
            // 0번째 인덱스 포함 x
            (img, index) => {
              if (img !== "initialValue" && index !== 0) {
                return <img key={index} src={img} />;
              } else {
                return null;
              }
            }
          )}
          {/* 세부소개글 유무 고민 */}
          {/* <p className={styles.introduction}>{item.details.introduction}</p> */}
        </div>
        {/* 추천상품 */}
        <div className={`${styles.details} ${styles.recommendedItems}`}>
          <p className={styles.detailsHead}>추천상품</p>
          <ul
            className={styles.items}
            ref={containerRef}
            onWheel={handleScroll}
          >
            {newArr.map((el, index, arr) => {
              let num = 0;
              el["STORE_REVIEWS"]?.map((el, index, arrey) => {
                index + 1 === arrey.length
                  ? (num = (num + el.STORE_RATING) / arrey.length)
                  : (num = num + el.STORE_RATING);
              });
              return (
                <li key={index} className={styles.item}>
                  <div className={styles.itemWraper}>
                    <img src={el.STORE_IMAGES[0]} alt="상품사진" />
                  </div>
                  <Link
                    to={`/shopping/${el.STORE_DOCID}`}
                    onClick={() => {
                      setItem(el);
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    <h4 className={styles.name}>{el.STORE_NAME}</h4>
                  </Link>
                  {/* <p className={styles.font}>[{el.STORE_CATEGORY}]</p> */}
                  <ShowStar num={num} />
                </li>
              );
            })}
          </ul>
        </div>
        {/* 상품후기 */}
        <div className={`${styles.details} ${styles.reviews}`}>
          <p className={styles.detailsHead}>
            후기 ({item.STORE_REVIEWS ? item.STORE_REVIEWS.length : "0"})
            <span
              className={styles.reviewWriteBtn}
              onClick={() => {
                setModalState(true);
              }}
            >
              후기작성
            </span>
          </p>
          <ul className={styles.reviews}>
            {item?.STORE_REVIEWS
              ? item.STORE_REVIEWS.map((el, index) => (
                  <li className={styles.review} key={el.STORE_REVIEW_TIME}>
                    <div className={styles.MEM_NICKNAME}>
                      <p style={{ fontSize: "18px", fontWeight: "500" }}>
                        {el.MEM_NICKNAME}
                      </p>
                      {el.MEM === user[0].MEM ? (
                        <div className={styles.reviewEditAndDeleteBtn}>
                          {/* <span>수정</span> */}
                          {/* /  */}
                          <span onClick={() => handleReviewDelete()}>삭제</span>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className={styles.revierwName}>
                      <ShowStar num={el.STORE_RATING} />
                      <p>{timeChange(el.STORE_REVIEW_TIME)}</p>
                    </div>
                    {el.STORE_REVIEW_IMAGE &&
                    el.STORE_REVIEW_IMAGE.length > 0 &&
                    el.STORE_REVIEW_IMAGE.every(
                      (item, index, array) => item === array[0]
                    ) === false ? (
                      <div className={styles.reviewImageBox}>
                        {el.STORE_REVIEW_IMAGE?.map((img) => {
                          return img !== "initialValue" ? (
                            <img src={img} className={styles.reviewImage} />
                          ) : null;
                        })}
                      </div>
                    ) : null}
                    <p style={{ fontSize: "24px" }}>{el.STORE_REVIEW}</p>
                  </li>
                ))
              : ""}
          </ul>
        </div>
      </div>

      {/* 후기작성란 */}
      {modalState ? (
        <div className={styles.reviewWriteModal}>
          <div className={styles.background} />
          <div className={styles.reviewWriteBox}>
            <h4 className={styles.reviewWriteTitle}>리뷰작성하기</h4>
            <p className={styles.reviewWriteName}>
              닉네임 : {user[0].MEM_NICKNAME}
            </p>
            <ShowStar
              num={reviewWriteContents.STORE_RATING}
              setNum={setReviewWriteContents}
            />
            <textarea
              placeholder="이곳에 버디의 후기를 작성해주세요 >o<"
              className={styles.reviewWriteContents}
              onChange={handleTextValue}
            />
            <div
              className={styles.reviewWriteSubmitBtn}
              onClick={() => {
                handleReviewSubmitBtn();
                if (reviewWriteContents.STORE_RATING >= 5) {
                  setThankModal(true);
                }
              }}
            >
              작성완료
            </div>
            <img
              className={styles.reviewWriteModalClose}
              src={xMark}
              alt="리뷰모달닫기버튼"
              onClick={() => {
                setModalState(false);
              }}
            />
            <div className={styles.imgWrapper}>
              {/* 1번사진 */}
              <div key="img01" className={styles.modalImgBox}>
                <input
                  type="file"
                  onChange={(e) => {
                    handleChange(e, 0);
                  }}
                  ref={inputs[0].ref}
                  className={styles.modalImageHiddenInput}
                />
                <div className={styles.previewWrap}>
                  <img
                    src={
                      inputs[0].preview === "initialValue"
                        ? initialImg
                        : inputs[0].preview
                    }
                    alt="미리보기"
                    className={styles.modalImgPreview}
                  />
                </div>
                {inputs[0].preview === "initialValue" ? (
                  ""
                ) : (
                  <img
                    src={xIcon}
                    className={styles.ModalimgX}
                    onClick={() => {
                      handlePrevImgDelete(0);
                    }}
                  />
                )}
              </div>
              {/* 2번사진 */}
              {inputs[0].preview !== "initialValue" ? (
                <div key="img02" className={styles.modalImgBox}>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleChange(e, 1);
                    }}
                    ref={inputs[1].ref}
                    className={styles.modalImageHiddenInput}
                  />
                  <div className={styles.previewWrap}>
                    <img
                      src={
                        inputs[1].preview === "initialValue"
                          ? initialImg
                          : inputs[1].preview
                      }
                      alt="미리보기"
                      className={styles.modalImgPreview}
                    />
                  </div>
                  {inputs[1].preview === "initialValue" ? (
                    ""
                  ) : (
                    <img
                      src={xIcon}
                      className={styles.ModalimgX}
                      onClick={() => {
                        handlePrevImgDelete(1);
                      }}
                    />
                  )}
                </div>
              ) : null}
              {/* 3번사진 */}
              {inputs[1].preview !== "initialValue" ? (
                <div key="img03" className={styles.modalImgBox}>
                  <input
                    type="file"
                    onChange={(e) => {
                      handleChange(e, 2);
                    }}
                    ref={inputs[2].ref}
                    className={styles.modalImageHiddenInput}
                  />
                  <div className={styles.previewWrap}>
                    <img
                      src={
                        inputs[2].preview === "initialValue"
                          ? initialImg
                          : inputs[2].preview
                      }
                      alt="미리보기"
                      className={styles.modalImgPreview}
                    />
                  </div>
                  {inputs[2].preview === "initialValue" ? (
                    ""
                  ) : (
                    <img
                      src={xIcon}
                      className={styles.ModalimgX}
                      onClick={() => {
                        handlePrevImgDelete(1);
                      }}
                    />
                  )}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {/* 5점 감사 모달 */}
      {thankModal ? (
        <div className={styles.thanks}>소중한 리뷰 감사합니다!</div>
      ) : (
        ""
      )}
    </>
  );
}

export default ShoppingItemPage;
