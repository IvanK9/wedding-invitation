import styles from "./Timer.module.css";
import CountdownTimer from "../../components/CountdownTimer";

export default function TimerSection() {
  return (
    <section className={styles.timer__section}>
      <div className={styles["timer__section-container"]}>
        {}
        <h3 className={styles["timer__section-title"]}>До торжества осталось</h3>

        {}
        <CountdownTimer />
      </div>
    </section>
  );
};
