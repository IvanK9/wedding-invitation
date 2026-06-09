// src/sections/Details/Details.tsx
import styles from './Details.module.css';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';

export default function Details() {
    const { elementRef, isVisible } = useScrollAnimation();

  return (
    <section 
        ref={elementRef as React.RefObject<HTMLButtonElement>}
        className={`${styles.details} scroll-fade ${isVisible ? 'scroll-fade--visible' : ''}`}
    >
      <div className={styles['details__container']}>
        <h2 className={styles['details__title']}>Важные детали</h2>
        <div className={styles['details__list']}>
          <div className={styles['details__item']}>
            <span className={styles['details__number']}>I. Подарки</span>
            <p className={styles['details__text']}>
              Мы будем очень рады, если вместо цветов вы подарите нам виниловую пластинку, 
              вашу любимую книгу или бутылку вина для нашей домашней коллекции.
            </p>
          </div>
          <div className={styles['details__item']}>
            <span className={styles['details__number']}>II. Пожелание</span>
            <p className={styles['details__text']}>
              От всего сердца просим вас воздержаться от криков «Горько!» на банкете. 
              Для нас очень важно сохранить атмосферу уютного и непринужденного семейного праздника.
            </p>
          </div>
          <div className={styles['details__item']}>
            <span className={styles['details__number']}>III. Формат</span>
            <p className={styles['details__text']}>
              Обратите внимание, что формат мероприятия не предполагает наличие аниматоров 
              и детской площадки. Пожалуйста, позаботьтесь заранее о том, чтобы провести этот вечер без детей.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
