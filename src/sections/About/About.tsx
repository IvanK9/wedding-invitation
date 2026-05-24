import styles from "./About.module.css";

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles["about__container"]}>
        <h2 className={styles["about__title"]}>Дорогие родные и близкие!</h2>

        <div className={styles["about__text-block"]}>
          <p className={styles["about__paragraph"]}>
            В нашей жизни произошло много важных событий, но этот день станет
            по-настоящему особенным. Мы приняли решение связать свои судьбы и
            создать новую семью.
          </p>
          <p className={styles["about__paragraph"]}>
            Разделить этот счастливый момент мы хотим с самыми близкими и
            дорогими людьми. Приглашаем вас стать свидетелями начала нашей
            долгой совместной истории и провести этот незабываемый день вместе с
            нами.
          </p>
        </div>

        <p className={styles["about__signature"]}>
          Ждем вас на нашем празднике!
        </p>
      </div>
    </section>
  );
};
