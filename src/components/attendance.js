import React, { useState } from "react";
import styles from "./attendance.module.css"; // CSS 파일 임포트

function Attendance() {
  const [attendance, setAttendance] = useState({});

  const Obj = JSON.parse(localStorage.getItem("Member"));
  console.log(Obj);
  // 출석체크 버튼 클릭 시 호출되는 함수
  const handleAttendance = (date) => {
    const newAttendance = { ...attendance, [date]: true };
    setAttendance(newAttendance);
    // 여기서는 실제 출석체크 로직을 추가할 수 있습니다.
    const currentDate = new Date();
    console.log(currentDate.getDate());

    // 예를 들어, 서버에 출석 정보를 보내는 등의 작업을 수행할 수 있습니다.
  };

  // 현재 연도와 월을 가져오는 함수
  const getCurrentYearMonth = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
    return { year, month };
  };
  // 해당 월의 달력 데이터를 생성하는 함수
  const generateCalendarData = () => {
    const { year, month } = getCurrentYearMonth();
    const { firstDay, lastDay } = getMonthFirstLastDay(year, month);
    const startDate = new Date(firstDay);
    const calendarData = [];

    while (startDate <= lastDay) {
      const date = startDate.getDate();
      const isWeekend = startDate.getDay() === 0 || startDate.getDay() === 6;
      const isAttended = attendance[date] || false;
      calendarData.push({ date, isWeekend, isAttended });
      startDate.setDate(startDate.getDate() + 1);
      // console.log({ date, isWeekend, isAttended });
    }

    return calendarData;
  };

  // 현재 월의 첫 날과 마지막 날을 가져오는 함수
  const getMonthFirstLastDay = (year, month) => {
    const firstDay = new Date(year, month - 1, 1); // 현재 월의 첫 번째 날
    const lastDay = new Date(year, month, 0); // 현재 월의 마지막 날
    return { firstDay, lastDay };
  };

  // 달력 데이터를 가져옵니다.
  const calendarData = generateCalendarData();
  const { year, month } = getCurrentYearMonth();

  return (
    <div className={styles.attendanceCalendar}>
      <h1>
        {year}년 {month}월 출석체크 달력
      </h1>
      <div className={styles.calendarGrid}>
        {calendarData.map((day) => (
          <div
            key={day.date}
            className={`${styles.calendarCell} ${
              day.isWeekend ? styles.weekend : ""
            } ${day.isAttended ? styles.attended : ""}`}
            onClick={() => handleAttendance(day.date)}
          >
            <span>{day.date}</span>
            {day.isAttended && (
              <span className={styles.attendanceMark}>&#10003;</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Attendance;
