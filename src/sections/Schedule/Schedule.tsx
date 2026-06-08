
import styles from "./Schedule.module.css";


interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

export default function Schedule () {
  
  const timelineData: TimelineItem[] = [
    {
      time: "16:00",
      title: "Сбор гостей",
      description:
        "Приветственный фуршет и знакомство гостей.",
    },
    {
      time: "16:30",
      title: "Торжественная церемония",
      description:
        "Самый трогательный момент — церемония и обмен кольцами.",
    },
    {
      time: "17:00",
      title: "Свадебный ужин",
      description:
        "Начало праздничного банкета, поздравления, конкурсы и зажигательные танцы.",
    },
    {
      time: "21:00",
      title: "Свадебный торт",
      description:
        "Разрезание главного свадебного десерта и уютное завершение официальной части.",
    },
    {
      time: "23:00",
      title: "Окончание вечера",
      description:
        "Объятия и завершение нашего прекрасного праздника.",
    },
  ];

  return (
    <section className={styles.schedule}>
      <div className={styles["schedule__container"]}>
        {}
        <h2 className={styles["schedule__title"]}>План дня</h2>

        {}
        <div className={styles["schedule__timeline"]}>
          {timelineData.map((item, index) => (
            <div key={index} className={styles["schedule__item"]}>
              {}
              <span className={styles["schedule__time"]}>{item.time}</span>

              {}
              <h4 className={styles["schedule__event-title"]}>{item.title}</h4>

              {}
              <p className={styles["schedule__description"]}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
