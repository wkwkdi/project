// 신고 컴포넌트
import { useEffect, useRef, useState } from "react";
import styles from "./Report.module.css";
import Button from "./Button";
import styled from "styled-components";
import { addData, uploadImage } from "../api/firebase";
import closeImg from "../assets/xmark-solid.svg";
import { React } from "react";

const ReportBtn = styled(Button)`
  font-size: 20px;
  width: 200px;
  height: 50px;
  background-color: #1e326d;
  color: white;
  &:hover {
    font-weight: bold;
  }
`;

const REPORTS = [
  "비방/욕설",
  "부적절한 콘텐츠",
  "사용자 행동 위반",
  "개인 정보 침해",
  "저작권 위반",
];

function Report({ localInfo, setReportBtn, content }) {
  // 신고 종류 열기
  const [isOpen, setIsOpen] = useState(false);
  // 신고 종류 버튼 클릭
  const [reportCheck, setReportCheck] = useState("비방/욕설");
  //  신고하기 버튼 클릭
  const [reportInput, setReportInput] = useState("");
  // 파일(이미지) 담는 state
  const [file, setFile] = useState(null);
  // 제목 입력 state
  const [titleInput, setTitleInput] = useState("");

  const inputFileRef = useRef(null);

  console.log(content);

  const handleButtonClick = (e) => {
    // 버블링 막는 위로가는 함수 막는거
    e.stopPropagation();
    // 리스트 버튼 클릭시 리스트 열림
    setIsOpen(!isOpen);
  };

  //   신고 종류 선택
  const handleReportClick = (report) => {
    setReportCheck(report);
  };

  // 신고 제목 입력
  const handleTitleInput = (e) => {
    setTitleInput(e.target.value);
  };

  // 신고 내용 바꿈
  const handleContentChange = (e) => {
    setReportInput(e.target.value);
  };

  // 커스터마이징 파일선택 클릭
  const handleFileSelectClick = () => {
    inputFileRef.current.click();
  };

  //   신고하기 버튼
  const handleReportCancel = async (text) => {
    if (text === "신고") {
      let imageUrl = "";

      if (file) {
        imageUrl = await uploadImage("Report", file);
      }

      const report = await addData("Report", {
        REPORT_TITLE: titleInput,
        REPORT_NAME: localInfo?.name,
        REPORT_CONTENT: reportInput,
        REPORT_CATEGORY: reportCheck,
        REPORT_IMAGE: imageUrl,
        REPORT_BOARD: content?.docId,
      });

      if (report) {
        alert("신고가 접수되었습니다.");
        setReportBtn(false);
      }
    } else {
      setReportBtn(false);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    // 이제 선택한 파일에 대한 작업을 수행할 수 있습니다.
  };

  useEffect(() => {
    // 리스트가 열려있으면 빠져나감
    if (!isOpen) return;
    // 버튼 외의 영역 누를때 닫히는 함수
    const handleClickOutside = () => setIsOpen(false);

    // window화면 클릭하면 닫히는 함수 실행
    window.addEventListener("click", handleClickOutside);

    // cleanUp함수
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      {/* 신고 모달 */}
      <div className={styles.reportContainer}>
        {/* 신고 내용 전체 */}
        <div className={styles.reportWrap}>
          {/* 신고 배경 하얀색 */}
          <div className={styles.reportBox}>
            {/* 신고하기 와 X */}
            <div className={styles.reportHeader}>
              <h2>신고하기</h2>
              <div className={styles.reportClose}>
                <img
                  src={closeImg}
                  alt="창 닫기"
                  onClick={() => handleReportCancel("취소")}
                />
              </div>
            </div>
            {/* 신고 입력값 가운데 정렬 */}
            <div className={styles.report}>
              {/* 신고제목 */}
              <div className={styles.reportTitle}>
                <h3>제목</h3>
                <input
                  className={styles.reportInput}
                  type="text"
                  value={titleInput}
                  onChange={handleTitleInput}
                />
              </div>

              {/* 상단 신고합니다 이름 */}
              <div className={styles.reportName}>
                <p>이름(닉네임)</p>
                <input
                  type="text"
                  readOnly
                  value={localInfo?.name}
                  className={styles.reportReadName}
                />
              </div>

              {/* 전체 감싸준 div */}
              <div className={styles.dropdownContainer}>
                {/* 처음에 보여주는 버튼? 칸? */}
                <div
                  className={styles.dropdownMain}
                  onClick={handleButtonClick}
                >
                  {reportCheck || "비방/욕설"}
                </div>
                {/* div를 클릭했다면 아래 코드 실행 */}
                {isOpen && (
                  //   게시판 목록 어디에 쓸건지 나오는 리스트
                  <div className={styles.dropdownList}>
                    {/* 맨위에서 정한 목록 배열을 map으로 풀어서 나열 */}
                    {REPORTS.map((report, index) => (
                      <div
                        onClick={() => handleReportClick(report)}
                        key={index}
                        className={styles.option}
                      >
                        {report}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {/* 신고 내용 */}
              <div>
                <p>내용</p>
                <textarea
                  className={styles.reportContent}
                  onChange={handleContentChange}
                  value={reportInput}
                />
              </div>
              {/* 파일첨부 */}
              <div className={styles.reportFileSelectWrap}>
                <input
                  hidden
                  type="file"
                  ref={inputFileRef}
                  onChange={handleFileChange}
                />
                <div className={styles.fileReportWrap}>
                  <div className={styles.fileReport}>
                    <div
                      onClick={handleFileSelectClick}
                      className={styles.reportFileSelect}
                    >
                      파일선택
                    </div>
                    {file ? "파일 1개" : ""}
                  </div>
                  <div>
                    <ReportBtn round onClick={() => handleReportCancel("신고")}>
                      신고
                    </ReportBtn>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Report;
