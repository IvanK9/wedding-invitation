import styles from "./Location.module.css";
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Location() {
  const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
        ref={elementRef as React.RefObject<HTMLButtonElement>}
        className={`${styles.location} scroll-fade ${isVisible ? 'scroll-fade--visible' : ''}`}
    >
      <div className={styles["location__container"]}>
        {}
        <h2 className={styles["location__title"]}>Место проведения</h2>

        {}
        <div className={styles["location__card"]}>
          <h3 className={styles["location__name"]}>Банкетный зал «Сенсация»</h3>

          <p className={styles["location__description"]}>
            Торжественная регистрация и праздничный банкет пройдут в одной
            локации.
          </p>

          <p className={styles["location__address"]}>
            Челябинск, ул. Академика Королева, д.3
          </p>
        </div>

        {}
        <div className={styles["location__map-wrapper"]}>
          <iframe
            src="https://yandex.com/map-widget/v1/?ll=61.299934%2C55.162493&mode=whatshere&whatshere%5Bpoint%5D=61.300514%2C55.162732&whatshere%5Bzoom%5D=17&z=17"
            className={styles["location__map"]}
            allowFullScreen={true}
            loading="lazy"
            title="Карта проезда к банкетному залу"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
