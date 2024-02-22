// 관리자 페이지 사용자 신고 리스트
import styles from "./ManagerReportList.module.css";

function ManagerMemberReport({ handleReportClick, reportList, reportContent }) {
  return (
    <>
      {/* 신고합니다. */}
      {reportList.map((member) => (
        <div
          className={
            reportContent?.id === member?.id
              ? styles.managerReportWrapSelect
              : styles.managerReportWrap
          }
          key={member?.id}
          onClick={() => handleReportClick(member?.id)}
        >
          {/* 유저 이름 */}
          <div className={styles.managerReport}>{member?.REPORT_TITLE}</div>
        </div>
      ))}
    </>
  );
}

export default ManagerMemberReport;
