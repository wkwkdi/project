// 관리자 페이지 사용자 정보 리스트
import styles from "./ManagerUserList.module.css";
import searchImg from "../../assets/search.svg";
import basicImg from "../../assets/user-solid.svg";

function ManagerMemberList({
  searchRef,
  handleEnterPress,
  memberSearchResult,
  memberAll,
  memberSearch,
  memberSelect,
}) {
  console.log(searchRef);
  console.log(handleEnterPress);
  console.log(memberSearchResult);
  console.log(memberAll);
  console.log(memberSearch);
  console.log(memberSelect);
  return (
    <>
      {/* 여기부터 */}
      <form className={styles.managerMemberSearchWrap}>
        <input
          className={styles.managerMemberSearch}
          type="text"
          ref={searchRef}
          onKeyPress={handleEnterPress} // Enter 키 누를 때 호출되는 함수 연결
        />
        <img className={styles.managerSearchImg} src={searchImg} alt="검색" />
      </form>
      {/* 회원 리스트 회원관리는 있지만 신고관리는 다른거로 대체 */}
      {/* 회원 리스트 회원관리는 있지만 신고관리는 다른거로 대체 */}
      {!memberSearchResult.length
        ? memberAll.map((member) => (
            <div
              className={
                memberSelect?.id === member?.id
                  ? styles.managerMemberWrapSelect
                  : styles.managerMemberWrap
              }
              key={member?.docId}
              onClick={() => memberSearch(member?.id)}
            >
              {/* 사진 */}
              <div className={styles.managerMemberCircle}>
                <img
                  className={styles.managerMemberImage}
                  src={member?.MEM_IMAGE || basicImg}
                />
              </div>
              {/* 유저 이름 */}
              <div className={styles.managerMember}>{member?.MEM_NAME}</div>
            </div>
          ))
        : memberSearchResult.map((result) => (
            <div
              className={
                memberSelect?.docId === result?.docId
                  ? styles.managerMemberWrapSelect
                  : styles.managerMemberWrap
              }
              key={result?.docId}
              onClick={() => memberSearch(result?.id)}
            >
              {/* 사진 */}
              <div className={styles.managerMemberCircle}>
                <img
                  className={styles.managerMemberImage}
                  src={result?.MEM_IMAGE || basicImg}
                />
              </div>
              {/* 유저 이름 */}
              <div className={styles.managerMember}>{result?.MEM_NAME}</div>
            </div>
          ))}
      {/* 여기까지 */}
    </>
  );
}

export default ManagerMemberList;
