import styles from "./Timer.module.css";
import CountdownTimer from "../../components/CountdownTimer";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function TimerSection() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
        ref={elementRef as React.RefObject<HTMLButtonElement>}
        className={`${styles.timer__section} scroll-fade ${isVisible ? 'scroll-fade--visible' : ''}`}
    >
      <div className={styles["timer__section-container"]}>
        {}
        <h3 className={styles["timer__section-title"]}>До торжества осталось</h3>

        {}
        <CountdownTimer />
      </div>
    </section>
  );
};
