import styles from "./Body.module.css";
import Container from "./Container";
import Title from "./Title";
import cloud1 from "../assets/cloud1.svg";
import cloud2 from "../assets/cloud2.svg";
import cloud3 from "../assets/cloud3.svg";
import mountainLeft from "../assets/mountain-left.svg";
import mountainRight from "../assets/mountain-right.svg";
import mountainMiddle from "../assets/mountain-middle.svg";
import tree1 from "../assets/tree1.svg";
import tree2 from "../assets/tree2.svg";
import tree3 from "../assets/tree3.svg";
import tree4 from "../assets/tree4.svg";
import tree5 from "../assets/tree5.svg";
import tree6 from "../assets/tree6.svg";
import tree7 from "../assets/tree7.svg";
import tree8 from "../assets/tree8.svg";
import bannerChar1 from "../assets/main-banner-charicter1.svg";
import plusIcon from "../assets/plus-solid.svg";
import tempImg from "../assets/닭가슴살.png";
// import "./SequentialMountains.css";

import styled from "styled-components";
import { useContext, useEffect, useRef, useState } from "react";
import classnames from "classnames";
import MainMaps from "./main-components/MainMaps";
import { BuddizContext } from "./../contexts/buddizContexts";
import { getMainBoardData } from "../api/firebase";
import { Link, useNavigate } from "react-router-dom";
import { getStoreItemDatas } from "../api/firebase";
import ShowStar from "./Shopping-components/ShowStar";
import basketball from "../assets/basketball-solid.svg";
import dumbell from "../assets/dumbbell-solid.svg";

function Body() {
  // useContext 사용 예시
  // const temper = useContext(BuddizContext);
  // console.log(temper); // provider의 props가 객체로 넘어옴
  // const { locale, setLocale } = temper; // 구조분해할당
  // console.log(locale);
  // console.log(setLocale);

  // 게시글 5개 담을 state
  const [boardList, setBoardList] = useState([]);

  const clickIdx = useRef();

  const navigate = useNavigate();

  // 게시글 가져오는 함수
  const handleLoad = async () => {
    const getItems = await getMainBoardData("Board");
    if (getItems) {
      setBoardList(getItems);
    }
  };

  const handleClick = (e) => {
    const docId = e.target.id;
    console.log(docId);

    // 화면을 이동합니다.
    window.scrollTo({ top: 400, behavior: "smooth" });

    navigate("/board", { state: docId });
  };

  useEffect(() => {
    handleLoad();
  }, []);

  const ImgWraper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
  `;

  const mountain1Ref = useRef(null);
  const mountain2Ref = useRef(null);
  const mountain3Ref = useRef(null);
  const tree1Ref = useRef(null);
  const tree2Ref = useRef(null);
  const tree3Ref = useRef(null);
  const tree4Ref = useRef(null);
  const tree5Ref = useRef(null);
  const tree6Ref = useRef(null);
  const tree7Ref = useRef(null);
  const tree8Ref = useRef(null);
  const mainChar = useRef(null);
  const title = useRef(null);

  const [storeItem, setStoreItem] = useState([]);

  // console.log(title);

  useEffect(() => {
    const delay1 = 1900;
    const delay2 = 2300;
    const delay3 = 2700;
    const delay4 = 2900;
    const delay5 = 3000;
    const delay6 = 3100;
    const delay7 = 3200;
    const main = 3300;

    const animateMountain = (ref, delay) => {
      const timerId = setTimeout(() => {
        ref.current.classList.add(styles.animete);
      }, delay);

      console.log(timerId);
      // setTimeout의 리턴 값, 즉 타이머 ID를 반환
      return timerId;
    };

    const timers = [
      animateMountain(mountain1Ref, delay1),
      animateMountain(mountain2Ref, delay2),
      animateMountain(mountain3Ref, delay3),
      animateMountain(tree1Ref, delay4),
      animateMountain(tree2Ref, delay5),
      animateMountain(tree3Ref, delay6),
      animateMountain(tree4Ref, delay7),
      animateMountain(tree5Ref, delay7),
      animateMountain(tree6Ref, delay6),
      animateMountain(tree7Ref, delay5),
      animateMountain(tree8Ref, delay4),
      animateMountain(mainChar, delay7),
      animateMountain(title, main),
    ];

    // cleanup 함수
    return () => {
      // 모든 타이머 ID를 사용하여 clearTimeout 호출
      timers.forEach((timerId) => clearTimeout(timerId));
    };
  }, []);

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
      scrollPosition = Math.min(scrollPosition + 60, scrollWidth);
    } else {
      // 위로 스크롤하는 경우
      scrollPosition = Math.max(scrollPosition - 60, 0);
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

  const Container2 = styled(Container)`
    margin: 0 auto;
  `;

  const onLoad = async () => {
    const storeList = await getStoreItemDatas("Store");
    setStoreItem(storeList);
  };
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <>
      {/* 큰이미지 시작 */}
      <div className={styles.big}>
        <span ref={title} className={styles.span}>
          운동친구 <span className={styles.inSpan}>버디찾기</span> 서비스! 혼자
          운동하는 친구들을 위해 주변 친구들 찾아 운동하는 복합 커뮤니티
        </span>
        {/* 구름 */}
        <ImgWraper className={styles.cloudBox1}>
          <img src={cloud1} />
        </ImgWraper>
        <ImgWraper className={styles.cloudBox2}>
          <img src={cloud2} />
        </ImgWraper>
        <ImgWraper className={styles.cloudBox3}>
          <img src={cloud3} />
        </ImgWraper>
        <ImgWraper className={styles.cloudBox4}>
          <img src={cloud3} />
          {/* 산 */}
        </ImgWraper>
        <ImgWraper ref={mountain1Ref} className={styles.mountainLeft}>
          <img src={mountainLeft} />
        </ImgWraper>
        <ImgWraper ref={mountain2Ref} className={styles.mountainRight}>
          <img src={mountainRight} />
        </ImgWraper>
        <ImgWraper ref={mountain3Ref} className={styles.mountainMiddle}>
          <img src={mountainMiddle} />
        </ImgWraper>
        {/* 나무 */}
        <ImgWraper ref={tree1Ref} className={styles.tree1}>
          <img src={tree1} />
        </ImgWraper>
        <ImgWraper ref={tree2Ref} className={styles.tree2}>
          <img src={tree2} />
        </ImgWraper>
        <ImgWraper ref={tree3Ref} className={styles.tree3}>
          <img src={tree3} />
        </ImgWraper>
        <ImgWraper ref={tree4Ref} className={styles.tree4}>
          <img src={tree4} />
        </ImgWraper>
        <ImgWraper ref={tree5Ref} className={styles.tree5}>
          <img src={tree5} />
        </ImgWraper>
        <ImgWraper ref={tree6Ref} className={styles.tree6}>
          <img src={tree6} />
        </ImgWraper>
        <ImgWraper ref={tree7Ref} className={styles.tree7}>
          <img src={tree4} />
        </ImgWraper>
        <ImgWraper ref={tree8Ref} className={styles.tree8}>
          <img src={tree8} />
        </ImgWraper>
        {/* 캐릭터 */}
        <ImgWraper ref={mainChar} className={styles.bannerChar1}>
          <img src={bannerChar1} />
        </ImgWraper>
      </div>
      {/* 큰이미지 끝 */}
      {/* Body 시작 */}

      <div className={styles.container}>
        {/* 커뮤니티 시작 */}
        <section className={styles.Section}>
          <div className={styles.community}>
            <div className={styles.title}>
              베스트 커뮤니티(자유, 운동팁, 물어봐요!)
            </div>
            <ul className={styles.posts}>
              {boardList?.map((board) => (
                <li
                  className={styles.post}
                  key={board?.docId}
                  id={board?.docId}
                  onClick={handleClick}
                >
                  <p className={styles.postTitle} id={board?.docId}>
                    {board?.BOARD_TITLE}
                  </p>
                  <div className={styles.postIconWarper}>
                    <img src={plusIcon} alt="plusIcon" />
                  </div>
                </li>
              ))}
            </ul>
            <img
              src={basketball}
              alt="basketball"
              className={styles.basketball}
            />
          </div>
        </section>
        {/* 커뮤니티 끝 */}

        {/* 스토어 랭킹 시작 */}
        <div className={styles.Section}>
          <div className={styles.storeBox}>
            <div className={styles.title}>스토어 랭킹(식품~기구)</div>
            <ul
              className={styles.items}
              ref={containerRef}
              onWheel={handleScroll}
            >
              {storeItem.map((el, index, arr) => (
                <li key={index} className={styles.item}>
                  <div className={styles.itemWraper}>
                    <img src={el.STORE_IMAGES[0]} alt="상품사진" />
                  </div>
                  <Link
                    state={el}
                    to={`/shopping/${el.STORE_DOCID}`}
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                    }}
                  >
                    <h4 className={styles.name}>{el.STORE_NAME}</h4>
                  </Link>
                  <p className={styles.font}>[{el.STORE_CATEGORY}]</p>
                  {(() => {
                    let num = 0;
                    el["STORE_REVIEWS"]?.map((el, index, arrey) => {
                      index + 1 === arrey.length
                        ? (num = (num + el.STORE_RATING) / arrey.length)
                        : (num = num + el.STORE_RATING);
                    });
                    return <ShowStar num={num} />;
                  })()}
                </li>
              ))}
            </ul>
            <img src={dumbell} alt="dumbell" className={styles.dumbell} />
          </div>
        </div>
        {/* 스토어 랭킹 끝 */}
        {/* Body 끝 */}
      </div>
    </>
  );
}

export default Body;
