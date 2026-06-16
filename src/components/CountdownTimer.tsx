import { useState, useEffect } from "react";
import styles from "./CountdownTimer.module.css";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownTimer() {
  
  const targetDate = new Date("2026-08-22T16:00:00+05:00").getTime();

  const calculateTimeLeft = (): TimeLeft => {
    const difference = targetDate - new Date().getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  
  const getWordForm = (number: number, titles: [string, string, string]) => {
    const cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  
  const formatNumber = (num: number) => String(num).padStart(2, "0");

  return (
    <div className={styles.timer}>
      {}
      <div className={styles["timer__item"]}>
        <span className={styles["timer__value"]}>
          {formatNumber(timeLeft.days)}
        </span>
        <span className={styles["timer__label"]}>
          {getWordForm(timeLeft.days, ["день", "дня", "дней"])}
        </span>
      </div>

      {}
      <div className={styles["timer__item"]}>
        <span className={styles["timer__value"]}>
          {formatNumber(timeLeft.hours)}
        </span>
        <span className={styles["timer__label"]}>
          {getWordForm(timeLeft.hours, ["час", "часа", "часов"])}
        </span>
      </div>

      {}
      <div className={styles["timer__item"]}>
        <span className={styles["timer__value"]}>
          {formatNumber(timeLeft.minutes)}
        </span>
        <span className={styles["timer__label"]}>
          {getWordForm(timeLeft.minutes, ["минута", "минуты", "минут"])}
        </span>
      </div>

      {}
      <div className={styles["timer__item"]}>
        <span className={styles["timer__value"]}>
          {formatNumber(timeLeft.seconds)}
        </span>
        <span className={styles["timer__label"]}>
          {getWordForm(timeLeft.seconds, ["секунда", "секунды", "секунд"])}
        </span>
      </div>
    </div>
  );
}
