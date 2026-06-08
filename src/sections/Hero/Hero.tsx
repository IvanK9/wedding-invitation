import { useState, useRef } from "react";
import styles from "./Hero.module.css";
import heroSong from "../../assets/music/Grechka-Lyubi_menya_lyubi.mp3";

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch((err) => {
        console.log(
          "Автовоспроизведение заблокировано браузером, нужен клик:",
          err,
        );
      });
    }
    setIsPlaying(!isPlaying);
  };

  const scrollToNextSection = () => {
    const nextSection = document.getElementById('about'); // Ищем блок по id
    if (nextSection) {
      nextSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <section className={styles.hero}>
      <audio ref={audioRef} src={heroSong} loop />

      <button
        onClick={toggleMusic}
        className={styles["hero__music-button"]}
        aria-label={isPlaying ? "Поставить на паузу" : "Включить музыку"}
      >
        {isPlaying ? (
          <div className={styles["hero__music-bars"]}>
            <span
              className={`${styles["hero__music-bar"]} ${styles["hero__music-bar--first"]}`}
            ></span>
            <span
              className={`${styles["hero__music-bar"]} ${styles["hero__music-bar--second"]}`}
            ></span>
            <span
              className={`${styles["hero__music-bar"]} ${styles["hero__music-bar--third"]}`}
            ></span>
          </div>
        ) : (
          <svg
            xmlns="http://w3.org"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{
              width: "18px",
              height: "18px",
              transform: "translateX(1px)",
            }}
          >
            <path
              fillRule="evenodd"
              d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z"
              clipRule="evenodd"
            />
          </svg>
        )}
      </button>

      <div className={styles["hero__content"]}>
        <p className={styles["hero__subtitle"]}>Приглашаем на свадьбу</p>

        <div className={styles["hero__names"]}>
          <h1 className={styles["hero__name"]}>Иван</h1>
          <span className={styles["hero__ampersand"]}>&</span>
          <h1 className={styles["hero__name"]}>Дарья</h1>
        </div>

        <div className={styles["hero__divider"]}></div>

        <div className={styles["hero__date-block"]}>
          <p className={styles["hero__date"]}>22.08.2026</p>
          <p className={styles["hero__day"]}>Суббота</p>
        </div>

        <button className={styles["hero__scroll-btn"]} onClick={scrollToNextSection} aria-label="Прокрутить вниз">
          <svg
            xmlns="http://w3.org"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5L12 21m0 0l-7.5-7.5M12 21V3"
            />
          </svg>
        </button>
      </div>

      <div
        className={`${styles["hero__decor"]} ${styles["hero__decor--left"]}`}
      ></div>
      <div
        className={`${styles["hero__decor"]} ${styles["hero__decor--right"]}`}
      ></div>
    </section>
  );
}
