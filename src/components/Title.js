import classNames from "classnames";
import styles from "./Title.module.css";

function Title({ className, children }) {
  return <div className={classNames(styles.title, className)}>{children}</div>;
}

export default Title;
