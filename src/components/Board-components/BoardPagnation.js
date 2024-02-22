// Pagination.js

import React from "react";
import styles from "./BoardPagnation.module.css"; // 프로젝트 구조에 따라 import 문을 조정해야 할 수 있습니다.

const BoardPagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map((number) => (
          <li key={number} className={styles.pageItem}>
            <a
              onClick={() => paginate(number)}
              href="#"
              className={styles.pageLink}
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BoardPagination;
