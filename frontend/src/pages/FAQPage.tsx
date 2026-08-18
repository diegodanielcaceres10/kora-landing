import { useState } from "react";
import styles from "./page.module.scss";
import faqStyles from "./FAQPage.module.scss";

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
    answer: "No. Podés usar Kora sin registrarte.",
  },
];

export function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <header>
        <p className={styles.eyebrow}>FAQ</p>
        <h1 className={styles.title}>Preguntas frecuentes</h1>
      </header>

      <div className={faqStyles.grid}>
        {FAQ_ITEMS.map(({ question, answer }, i) => {
          const isOpen = openIndex === i;
          const answerId = `faq-answer-${i}`;

          return (
            <div
              key={question}
              className={[
                faqStyles.item,
                isOpen ? faqStyles["item--open"] : "",
              ].join(" ")}
            >
              <button
                type="button"
                className={faqStyles.question}
                aria-expanded={isOpen}
                aria-controls={answerId}
                onClick={() => setOpenIndex(isOpen ? null : i)}
              >
                <span>{question}</span>
                <i
                  className={[
                    "fa-solid fa-angle-down",
                    faqStyles.chevron,
                    isOpen ? faqStyles["chevron--open"] : "",
                  ].join(" ")}
                ></i>
              </button>

              <div
                id={answerId}
                className={[
                  faqStyles.answerWrapper,
                  isOpen ? faqStyles["answerWrapper--open"] : "",
                ].join(" ")}
              >
                <div className={faqStyles.answerInner}>
                  <p className={faqStyles.answer}>{answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
