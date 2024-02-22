import Button from "../Button";
import styled from "styled-components";
import styles from "./Recommend.module.css";

const RecommendBtn = styled(Button)`
  font-size: 16px;
  background-color: #1e326d;
  font-weight: bold;
  color: white;
  margin-right: 16px;
`;

function Recommend({ content, recommendClick, handleReportClick }) {
  return (
    <div className={styles.buttonWrap}>
      <RecommendBtn
        size="small"
        $round
        onClick={() => recommendClick("추천", content?.docId)}
      >
        추천
      </RecommendBtn>
      <RecommendBtn
        size="small"
        $round
        onClick={() => recommendClick("비추천", content?.docId)}
      >
        비추천
      </RecommendBtn>

      <Button
        size="small"
        $round
        style={{ fontSize: "16px", fontWeight: "bold" }}
        onClick={handleReportClick}
      >
        신고
      </Button>
    </div>
  );
}

export default Recommend;
