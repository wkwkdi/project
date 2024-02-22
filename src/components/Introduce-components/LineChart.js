import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";
import styles from "./LineChart.module.css";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
} from "chart.js/auto";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

const LineChart = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 100); // 예제: 스크롤 위치가 200 이상이면 isVisible을 true로 설정
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const chartData = {
    labels: ["1월", "2월", "3월", "4월", "5월"],
    datasets: [
      {
        type: "bar",
        label: "사용자 수 (바 그래프)",
        data: [50, 60, 45, 65, 70],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        yAxisID: "y-axis-1",
      },
      {
        type: "line",
        label: "사용자 수 (라인 차트)",
        data: [50, 60, 45, 65, 70],
        fill: false,
        backgroundColor: "rgba(54, 162, 235, 1)",
        borderColor: "rgb(54, 162, 235)",
        tension: 0.1,
        yAxisID: "y-axis-1",
      },
    ],
  };

  const options = {
    scales: {
      y: [
        {
          type: "linear",
          display: true,
          position: "right",
          id: "y-axis-1",
          interaction: true,
          // min: 0,
          // max: 100,
        },
      ],
    },
    animation: {
      duration: 1000,
      easing: "easeInOutQuad",
    },
    responsive: true,
    maintainAspectRadio: false,
    aspectRadios: 7,
  };

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    width: "500px",
  });

  return (
    <animated.div style={animationProps}>
      <div className={styles.LineChart}>
        {isVisible ? <Line data={chartData} options={options} /> : ""}
      </div>
    </animated.div>
  );
};

export default LineChart;
