import classNames from "classnames";
import styles from "./Img.module.css";

function Img({ className, children, onClick }) {
  return (
    <div onClick={onClick} className={classNames(styles.img, className)}>
      {children}
    </div>
  );
}

export default Img;
