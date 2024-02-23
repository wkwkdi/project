// 관리자 페이지
import styles from "./Manager.module.css";
import { useContext, useEffect, useRef, useState } from "react";

import { deleteDatas, getAddress, updateData } from "../api/firebase";
import { BuddizContext } from "../contexts/buddizContexts";
import styled from "styled-components";
import Button from "../components/Button";
import ManagerReport from "../components/Mananger-components/ManagerReort";
import ManagerReportList from "../components/Mananger-components/ManagerReportList";
import ManagerUserInfo from "../components/Mananger-components/ManagerUserInfo";
import ManagerUserList from "../components/Mananger-components/ManagerUserList";

const MemberBtn = styled(Button)`
  width: 221px;
  height: 35px;
  background-color: ${(props) =>
    props.location == "회원관리" ? "#1E326D" : "#ffffff"};
  color: ${(props) => (props.location == "회원관리" ? "white" : "black")};
  font-size: 18px;
`;

const ReportBtn = styled(Button)`
  width: 221px;
  height: 35px;
  background-color: ${(props) =>
    props.location == "신고관리" ? "#1E326D" : "#ffffff"};
  color: ${(props) => (props.location == "신고관리" ? "white" : "black")};
  font-size: 18px;
`;

function Manager() {
  // 회원관리와 신고관리 무었을 눌렀는지 확인용 state
  const [btnClick, setBtnClick] = useState("회원관리");
  // 회원 전체를 담을 state
  const [memberAll, setMemberAll] = useState([]);
  // 어떤 회원을 눌렀는지 확인하기 위한 state
  const [member, setMember] = useState({});
  // 관리자 docId 스테이트
  const [managerDocId, setManagerDocId] = useState("");
  // 신고내역 담을 state
  const [reportList, setReportList] = useState([]);
  // 검색 후 나온 결과 state
  const [memberSearchResult, setMemberSearchResult] = useState("");
  // 어떤 신고내역을 눌렀는지 확인 state
  const [reportContent, setReportContent] = useState([]);
  // useContext 고민
  const temper = useContext(BuddizContext);

  const searchRef = useRef();

  // console.log(temper); // provider의 props가 객체로 넘어옴

  const handleLoad = async () => {
    const dataAll = await getAddress("Member");
    console.log(dataAll);
    if (dataAll) {
      setMemberAll(dataAll);
    }
  };

  // 사용자 이름 클릭했을때 정보 나오는 코드
  const memberSearch = async (id) => {
    const user = memberAll.find((mem) => mem?.id == id);
    console.log(user);
    setMember(user);
  };
  // 처음에 들어왔을때 맨 처음에 있는 사용자의 정보 바로 띄워주는 코드
  useEffect(() => {
    if (memberAll.length > 0) {
      if (memberSearchResult.length > 0) {
        // 만약 검색 결과가 있으면 검색 결과의 첫 번째 회원을 설정
        setMember(memberSearchResult[0]);
      } else {
        // 그렇지 않으면 전체 회원 중 첫 번째 회원을 설정
        setMember(memberAll[0]);
      }
    }
  }, [memberAll, memberSearchResult]);

  // 회원관리와 신고관리 버튼중 어떤것을 눌렀는지 확인
  const handleBtnClick = (text) => {
    setBtnClick(text);
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // 관리자 docId 스토리지에 가져오기
  const getLocalStoryManager = (key) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  useEffect(() => {
    const manager = getLocalStoryManager("Manager");
    console.log(manager);
    const managerdocId = manager.MG_docId;
    setManagerDocId(managerdocId);
  }, []);

  // input 에서 enter눌렀을때 검색 하는 코드
  const handleEnterPress = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const searchKeyword = searchRef.current.value;
      // 검색어를 이용하여 게시물 필터링
      const searchItems = memberAll.filter(({ MEM_NAME }) =>
        MEM_NAME.includes(searchKeyword)
      );
      console.log(searchItems);
      setMemberSearchResult(searchItems);
    }
  };

  // 어떤 신고란을 클릭했는지
  const handleReportClick = (docId) => {
    const reportIdx = reportList.find((de) => de?.docId == docId);
    setReportContent(reportIdx);
  };

  return (
    <>
      {/* 배너 */}
      <div className={styles.managerBanner}>
        <div className={styles.managerText}>관리자</div>
      </div>
      {/* 화면 전체 감싸는 div */}
      <div className={styles.managerContainer}>
        {/* 왼쪽 화면 */}
        <div className={styles.managerLeftWrap}>
          <div className={styles.managerLeft}>
            <div className={styles.managerBtnWrap}>
              <MemberBtn
                round
                location={btnClick}
                onClick={() => handleBtnClick("회원관리")}
              >
                회원관리
              </MemberBtn>

              <ReportBtn
                round
                location={btnClick}
                onClick={() => handleBtnClick("신고관리")}
              >
                신고관리
              </ReportBtn>
            </div>
            {btnClick == "회원관리" ? (
              <ManagerUserList
                searchRef={searchRef}
                handleEnterPress={handleEnterPress}
                memberSearchResult={memberSearchResult}
                memberAll={memberAll}
                memberSearch={memberSearch}
                memberSelect={member}
              />
            ) : (
              <ManagerReportList
                handleReportClick={handleReportClick}
                reportList={reportList}
                reportContent={reportContent}
              />
            )}
          </div>
        </div>
        {/* 오른쪽화면 */}
        <div>
          {btnClick == "회원관리" ? (
            <ManagerUserInfo handleLoad={handleLoad} member={member} />
          ) : (
            <ManagerReport
              setReportList={setReportList}
              reportContent={reportContent}
              setReportContent={setReportContent}
              reportList={reportList}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Manager;
