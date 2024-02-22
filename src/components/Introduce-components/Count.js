import { useEffect, useState } from "react";
import styles from "./Count.module.css";


function Count() {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 400);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (isVisible) {
      const timer = setInterval(() => {
        setCount((prev) => {
          if (prev === 756) {
            clearInterval(timer);
            return prev;
          }

          return prev + 1;
        });
      }, 0.001);

      return () => {
        clearInterval(timer);
      };
    }

    if (!isVisible) {
      setCount(0)
    }
  }, [isVisible]);

  return (
    <>
    <div className={styles.Count}>
      {isVisible ? <h1>{count}</h1> : ''}
    </div>
       
    </>

  );
}

export default Count;