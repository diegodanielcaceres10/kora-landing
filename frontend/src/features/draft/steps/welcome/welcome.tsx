import { useState } from "react";
import styles from "./welcome.module.scss";
import koraLogo from "../../../../assets/kora-logo/kora-logo.png";
import koraBibs from "../../../../assets/illustrations/kora-bibs.png";
import { AppHeader } from "../../components/AppHeader";

interface StepWelcomeProps {
  onStart: () => void;
}

const FAQ_ITEMS = [
  {
    question: "¿Es gratis usar Kora?",
    answer:
      "Sí, Kora es 100% gratuito. No necesitás pagar nada ni crear una cuenta para armar tus equipos.",
  },
  {
    question: "¿Puedo editar los equipos después del sorteo?",
    answer:
      "Sí. Antes de confirmar el resultado podés pasar a modo manual y reacomodar jugadores entre equipos arrastrándolos.",
  },
  {
    question: "¿Cuántos jugadores puedo agregar?",
    answer:
      "Depende de cuántos equipos y jugadores por equipo elijas: hasta 6 equipos, con hasta 11 jugadores cada uno.",
  },
  {
    question: "¿Cómo comparto los equipos?",
    answer:
      "Una vez confirmado el sorteo, descargás una imagen lista para compartir por WhatsApp o donde quieras.",
  },
  {
    question: "¿Puedo elegir la cantidad de equipos y jugadores?",
    answer:
      "Sí, vos definís cuántos equipos armar y cuántos jugadores va a tener cada uno antes de sortear.",
  },
  {
    question: "¿Necesito crear una cuenta para usar Kora?",
    answer:
      "No. Podés usar Kora sin registrarte — el inicio de sesión es opcional.",
  },
];

export function StepWelcome({ onStart }: StepWelcomeProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <main className={styles.page}>
      <AppHeader />

      <section className={styles.welcome}>
        <div className={styles.welcome__content}>
          <div className={styles.welcome__logo}>
            <img src={koraLogo} alt="" />
          </div>
          <h1 className={styles.welcome__title}>
            Sorteá los equipos
            <br />
            <span className={styles.welcome__highlight}>en 10 segundos</span>
          </h1>

          <p className={styles.welcome__description}>
            Juntá a tu gente, armamos los equipos
            <br />y a jugar. Así de simple.
          </p>

          <div className={styles.welcome__actions}>
            <button
              type="button"
              className={styles.welcome__primaryButton}
              onClick={onStart}
            >
              <i className="fa-solid fa-user-group"></i>
              Armar equipos ahora
            </button>
            <button type="button" className={styles.welcome__secondaryButton}>
              <i className="fa-solid fa-circle-info"></i>
              Cómo funciona
            </button>
          </div>
        </div>
        <div className={styles.welcome__content}>
          <div className={styles.welcome__illustration} aria-hidden="true">
            <img src={koraBibs} alt="" />
          </div>

          <ul className={styles.welcome__stats}>
            <li>
              <i className="fa-solid fa-gift"></i>100% gratis
            </li>
            <li>
              <i className="fa-solid fa-bolt"></i>Rápido y fácil
            </li>
            <li>
              <i className="fa-solid fa-share-nodes"></i>Listo para compartir
            </li>
          </ul>
        </div>
      </section>

      <section className={styles.faq}>
        <p className={styles.faq__eyebrow}>FAQ</p>
        <h2 className={styles.faq__title}>Preguntas frecuentes</h2>

        <div className={styles.faq__grid}>
          {FAQ_ITEMS.map(({ question, answer }, i) => {
            const isOpen = openFaqIndex === i;
            const answerId = `faq-answer-${i}`;

            return (
              <div
                key={question}
                className={[
                  styles.faq__item,
                  isOpen ? styles["faq__item--open"] : "",
                ].join(" ")}
              >
                <button
                  type="button"
                  className={styles.faq__question}
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                >
                  <span>{question}</span>
                  <i
                    className={[
                      "fa-solid fa-angle-down",
                      styles.faq__chevron,
                      isOpen ? styles["faq__chevron--open"] : "",
                    ].join(" ")}
                  ></i>
                </button>

                <div
                  id={answerId}
                  className={[
                    styles.faq__answerWrapper,
                    isOpen ? styles["faq__answerWrapper--open"] : "",
                  ].join(" ")}
                >
                  <div className={styles.faq__answerInner}>
                    <p className={styles.faq__answer}>{answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footer__meta}>
          <p>© 2026 Kora • Diego Daniel Caceres</p>
        </div>
      </footer>
    </main>
  );
}
