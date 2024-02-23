// 관리자 페이지 사용자 신고 리스트
import styles from "./ManagerReportList.module.css";

function ManagerMemberReport({ handleReportClick, reportList, reportContent }) {
  return (
    <>
      {/* 신고합니다. */}
      {reportList.map((member) => (
        <div
          className={
            reportContent?.docId === member?.docId
              ? styles.managerReportWrapSelect
              : styles.managerReportWrap
          }
          key={member?.docId}
          onClick={() => handleReportClick(member?.docId)}
        >
          {/* 유저 이름 */}
          <div className={styles.managerReport}>{member?.REPORT_TITLE}</div>
        </div>
      ))}
    </>
  );
}

export default ManagerMemberReport;
