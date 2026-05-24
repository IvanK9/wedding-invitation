import React, { useState } from "react";
import styles from "./RSVP.module.css";

interface FormData {
  name: string;
  attendance: "yes" | "no" | "";
  guestsCount: "1" | "2";
}

interface FormErrors {
  name?: string;
  attendance?: string;
}

export default function RSVP() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    attendance: "",
    guestsCount: "1",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const TELEGRAM_BOT_TOKEN = import.meta.env.VITE_TELEGRAM_BOT_TOKEN;
  const TELEGRAM_CHAT_ID = import.meta.env.VITE_TELEGRAM_CHAT_ID;
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SCRIPT_URL;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim())
      newErrors.name = "Пожалуйста, введите ваше имя и фамилию";
    else if (formData.name.trim().length < 3)
      newErrors.name = "Имя должно быть не короче 3-х символов";
    if (!formData.attendance)
      newErrors.attendance = "Пожалуйста, выберите один из вариантов";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    const payload = {
      name: formData.name.trim(),
      attendance: formData.attendance,
      guestsCount:
        formData.attendance === "yes" ? Number(formData.guestsCount) : 0,
    };

    const attendanceText =
      payload.attendance === "yes" ? "✅ Придет" : "❌ Не придет";
    const guestsText =
      payload.attendance === "yes"
        ? `\n👥 Количество мест: ${payload.guestsCount}`
        : "";
    const telegramMessage = `🔔 *Новый ответ на приглашение!*\n\n👤 Имя: ${payload.name}\n📊 Статус: ${attendanceText}${guestsText}`;

    try {
      const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
      const telegramPromise = fetch(telegramUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
          text: telegramMessage,
          parse_mode: "Markdown",
        }),
      });

      const googlePromise = fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      await Promise.all([telegramPromise, googlePromise]);

      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка при отправке данных:", error);
      alert("Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.rsvp}>
      <div className={styles["rsvp__container"]}>
        <h2 className={styles["rsvp__title"]}>Подтверждение присутствия</h2>

        {!isSubmitted ? (
          <>
            <p className={styles["rsvp__subtitle"]}>
              Будем признательны, если вы ответите до 1 августа 2026 года
            </p>

            <form
              className={styles["rsvp__form"]}
              onSubmit={handleSubmit}
              noValidate
            >
              <div className={styles["rsvp__field-group"]}>
                <label className={styles["rsvp__label"]} htmlFor="name">
                  Ваше имя и фамилия:
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Иван Иванов"
                  className={`${styles["rsvp__input"]} ${errors.name ? styles["rsvp__input--error"] : ""}`}
                  disabled={isSubmitting}
                />
                {errors.name && (
                  <span className={styles["rsvp__error-text"]}>
                    {errors.name}
                  </span>
                )}
              </div>

              <div className={styles["rsvp__field-group"]}>
                <span className={styles["rsvp__label"]}>
                  Планируете ли вы присутствовать?
                </span>
                <div className={styles["rsvp__options-grid"]}>
                  <label
                    className={`${styles["rsvp__option-label"]} ${errors.attendance ? styles["rsvp__option-label--error"] : ""}`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={formData.attendance === "yes"}
                      onChange={handleInputChange}
                      className={styles["rsvp__radio"]}
                      disabled={isSubmitting}
                    />
                    <span
                      className={`${styles["rsvp__custom-indicator"]} ${styles["rsvp__custom-indicator--radio"]}`}
                    ></span>
                    Я приду / Мы придем
                  </label>
                  <label
                    className={`${styles["rsvp__option-label"]} ${errors.attendance ? styles["rsvp__option-label--error"] : ""}`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={formData.attendance === "no"}
                      onChange={handleInputChange}
                      className={styles["rsvp__radio"]}
                      disabled={isSubmitting}
                    />
                    <span
                      className={`${styles["rsvp__custom-indicator"]} ${styles["rsvp__custom-indicator--radio"]}`}
                    ></span>
                    Не смогу прийти
                  </label>
                </div>
                {errors.attendance && (
                  <span className={styles["rsvp__error-text"]}>
                    {errors.attendance}
                  </span>
                )}
              </div>

              {formData.attendance === "yes" && (
                <div className={styles["rsvp__field-group"]}>
                  <span className={styles["rsvp__label"]}>
                    Количество мест:
                  </span>
                  <div className={styles["rsvp__options-grid"]}>
                    <label className={styles["rsvp__option-label"]}>
                      <input
                        type="radio"
                        name="guestsCount"
                        value="1"
                        checked={formData.guestsCount === "1"}
                        onChange={handleInputChange}
                        className={styles["rsvp__radio"]}
                        disabled={isSubmitting}
                      />
                      <span
                        className={`${styles["rsvp__custom-indicator"]} ${styles["rsvp__custom-indicator--radio"]}`}
                      ></span>
                      Приду один / одна
                    </label>
                    <label className={styles["rsvp__option-label"]}>
                      <input
                        type="radio"
                        name="guestsCount"
                        value="2"
                        checked={formData.guestsCount === "2"}
                        onChange={handleInputChange}
                        className={styles["rsvp__radio"]}
                        disabled={isSubmitting}
                      />
                      <span
                        className={`${styles["rsvp__custom-indicator"]} ${styles["rsvp__custom-indicator--radio"]}`}
                      ></span>
                      Приду с парой (+1 гость)
                    </label>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className={styles["rsvp__submit-btn"]}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Отправка..." : "Отправить ответ"}
              </button>
            </form>
          </>
        ) : (
          <div className={styles["rsvp__form"]}>
            <p className={styles["rsvp__success-message"]}>
              Спасибо! Ваш ответ успешно отправлен и учтен при планировании
              праздника.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
