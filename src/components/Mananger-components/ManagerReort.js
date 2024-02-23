// 관리자 페이지 사용자 신고관리

import styled from "styled-components";
import styles from "./ManagerReport.module.css";
// import Button from "../Button";
import Button from "./../Button";
import { useEffect, useState } from "react";
import { deleteDatas, deleteImage, getAddress } from "../../api/firebase";

const Process = styled(Button)`
  font-size: 16px;
  font-weight: bold;
  color: red;
  border-color: rgb(233, 0, 0);
  outline: none;
  background-color: #fff;
  border-width: 2px;
`;

function ManagerReport({
  setReportList,
  reportContent,
  reportList,
  setReportContent,
}) {
  const handleLoad = async () => {
    const dataAll = await getAddress("Report");
    console.log(dataAll);
    setReportList(dataAll);
  };

  console.log(reportList);
  console.log(reportContent);

  // 유지하기 (신고글만 삭제)
  const keepBtn = async (imgUrl) => {
    if (imgUrl) {
      const deleteImg = deleteImage(imgUrl);
      alert("신고가 반려 되었습니다.");
      await deleteDatas("Report", reportContent?.docId);
      handleLoad();
      // 이미지 삭제 처리 함수
      // 이미지가 삭제 되었을때
      // if (deleteImg) {
      // }
    } else {
      // 이미지가 삭제 되었을때
      alert("삭제조치 되었습니다.");
      await deleteDatas("Report", reportContent?.docId);
      handleLoad();
    }
  };

  const handleDeleteBtn = async (imgUrl) => {
    console.log(imgUrl);
    // 게시글 삭제
    const deleteContent = await deleteDatas(
      "Board",
      reportContent?.REPORT_BOARD
    );
    if (deleteContent) {
      if (imgUrl) {
        // 이미지 삭제 처리 함수
        const deleteImg = deleteImage(imgUrl);
        // 이미지가 삭제 되었을때
        if (deleteImg) {
          alert("삭제조치 되었습니다.");
          await deleteDatas("Report", reportContent?.docId);
          handleLoad();
        }
      } else {
        // 이미지가 삭제 되었을때
        alert("삭제조치 되었습니다.");
        await deleteDatas("Report", reportContent?.docId);
        handleLoad();
      }
    } else {
      alert("삭제불가");
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  // 처음에 바로 처음꺼 띄워주는 코드
  useEffect(() => {
    if (reportList.length > 0) {
      setReportContent(reportList[0]);
    } else {
      setReportContent([]);
    }
  }, [reportList]);

  return (
    <>
      {/* 바디 */}
      <div className={styles.reportContainer}>
        {reportList.length > 0 ? (
          // 신고정보
          <div className={styles.reportInfoAll}>
            {/* 신고제목 / 신고자 이름 / 신고버튼 */}
            <div className={styles.reportRightHeader}>
              <div>
                {/* 신고 제목 */}
                <h2 style={{ marginBottom: "16px" }}>
                  {reportContent?.REPORT_TITLE}
                </h2>
                {/* 신고자 이름 */}
                <div>
                  <strong>닉네임: </strong>
                  {reportContent?.REPORT_NAME}
                </div>
              </div>
              <div className={styles.btnWrap}>
                <Process
                  onClick={() => keepBtn(reportContent?.REPORT_IMAGE)}
                  size="small"
                  round
                  style={{
                    color: "green",
                    borderColor: "green",
                    marginRight: "8px",
                  }}
                >
                  유지하기
                </Process>
                <Process
                  onClick={() => handleDeleteBtn(reportContent?.REPORT_IMAGE)}
                  size="small"
                  round
                >
                  처리하기
                </Process>
              </div>
            </div>
            {/* 신고 이미지 */}
            <div className={styles.reportImageWrap}>
              {/* 이미지가 있으며 나오고 없으면 없다는 문구 출력 */}
              {reportContent?.REPORT_IMAGE ? (
                <img
                  className={styles.reportImage}
                  src={reportContent?.REPORT_IMAGE}
                />
              ) : (
                <div className={styles.noImage}>
                  <div>사진이 없습니다.</div>
                </div>
              )}
            </div>
            {/* 신고 카테고리? */}
            <div className={styles.reportCategory}>
              <span>유형 : </span>
              {reportContent?.REPORT_CATEGORY}
            </div>
            {/* 신고내용 */}
            <div className={styles.reportContent}>
              {reportContent?.REPORT_CONTENT}
            </div>
          </div>
        ) : (
          <div className={styles.noReport}>
            <p className={styles.noReportText}>신고글이 없습니다.</p>
          </div>
        )}
      </div>
    </>
  );
}

export default ManagerReport;
