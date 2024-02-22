import styles from "./BoardEmpty.module.css";

function BoardEmpty() {
  return (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyText}>게시글이 없습니다.</div>
    </div>
  );
}

export default BoardEmpty;
