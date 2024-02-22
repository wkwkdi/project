import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { useSpring, animated } from "react-spring";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement,
} from "chart.js/auto";
import styles from "./Pyramid.module.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  BarElement
);

const Pyramid = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsVisible(scrollPosition > 800);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const chartData = {
    labels: ["60-", "50-59", "40-49", "30-39", "20-29", "10-19"].reverse(),
    datasets: [
      {
        type: "bar",
        label: "남성",
        stack: "Stack 0",
        data: [4, 10, 16, 20, 22, 12].reverse().map((k) => -k),
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        // yAxisID: 'y-axis-1',
        borderRadius: 6,
        indexAxis: "y",
      },
      {
        type: "bar",
        label: "여성",
        stack: "Stack 0",
        data: [5, 12, 18, 24, 20, 15].reverse(),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        // yAxisID: 'y-axis-1',
        indexAxis: "y",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    scales: {
      y: [
        {
          indexAxis: "y",
          type: "linear",
          display: false,
          position: "right",
          id: "y-axis-1",
          interaction: true,
          min: 0,
          max: 100,
        },
      ],
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuad",
    },
    responsive: true,
    ticks: {
      autoSkip: true,
      maxRotation: 0,
      minRotation: 0,
      labelOffset: 0,
      padding: 0,
    },
    xAxes: {
      suggestedMin: 0,
      suggestedMax: 30,
      ticks: {
        autoSkip: true,
        maxRotation: 0,
        minRotation: 0,
        labelOffset: 0,
        padding: 0,
        font: {
          size: 12,
        },
        callback: function (k) {
          return k < 0 ? `${-k}%` : `${k}%`;
        },
      },
    },
  };

  const animationProps = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? "translateY(0)" : "translateY(20px)",
    width: "500px",
  });

  return (
    <animated.div style={animationProps}>
      <div className={styles.Pyramid}>
        {isVisible ? <Line data={chartData} options={options} /> : ""}
      </div>
    </animated.div>
  );
};

export default Pyramid;
