import { useState } from "react";
import styles from "./welcome.module.scss";
import koraLogo from "../../../../assets/kora-logo/kora-logo.png";
import koraBibs from "../../../../assets/illustrations/kora-bibs.png";
import authorLogo from "../../../../assets/diegodanielcaceres.png";
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
    answer: "No. Podés usar Kora sin registrarte.",
  },
];

const HOW_IT_WORKS_ITEMS = [
  {
    icon: "fa-solid fa-sliders",
    title: "Configurá el partido",
    description:
      "Elegí cuántos equipos querés armar y cuántos jugadores tiene cada lado.",
  },
  {
    icon: "fa-solid fa-clipboard-list",
    title: "Cargá a los jugadores",
    description:
      "Sumá los nombres de quienes juegan y revisá que esté todo listo antes del sorteo.",
  },
  {
    icon: "fa-solid fa-wand-magic-sparkles",
    title: "Sorteá y compartí",
    description:
      "Generá los equipos, ajustalos si hace falta y descargá una imagen para mandar al grupo.",
  },
];

export function StepWelcome({ onStart }: StepWelcomeProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <main className={styles.page}>
      <AppHeader />

      <section id="inicio" className={styles.welcome}>
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
            <button
              type="button"
              className={styles.welcome__secondaryButton}
              onClick={() =>
                document
                  .getElementById("tutorial")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
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

      <section id="tutorial" className={styles.tutorial}>
        <div className={styles.tutorial__header}>
          <p className={styles.tutorial__eyebrow}>Cómo funciona</p>
          <h2 className={styles.tutorial__title}>
            Armá equipos claros sin perder tiempo
          </h2>
        </div>

        <div className={styles.tutorial__grid}>
          {HOW_IT_WORKS_ITEMS.map(({ icon, title, description }, i) => (
            <article key={title} className={styles.tutorial__item}>
              <span className={styles.tutorial__number}>
                {(i + 1).toString().padStart(2, "0")}
              </span>
              <i className={[icon, styles.tutorial__icon].join(" ")}></i>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="faq" className={styles.faq}>
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

      <section id="sobre-kora" className={styles.about}>
        <div className={styles.about__content}>
          <p className={styles.about__eyebrow}>Sobre Kora</p>
          <h2 className={styles.about__title}>
            Una forma simple de resolver el sorteo antes de jugar
          </h2>
          <p className={styles.about__description}>
            Kora nació para esos partidos donde nadie quiere perder diez minutos
            repartiendo jugadores. Elegís la cantidad de equipos, cargás la
            lista y dejás que la app haga el trabajo rápido, claro y sin
            vueltas.
          </p>
        </div>

        <a
          className={styles.about__author}
          href="https://diegodanielcaceres10.github.io/nura/"
          target="_blank"
          rel="noreferrer"
          aria-label="Portfolio de Diego Daniel Caceres"
        >
          <div className={styles.about__logo}>
            <img src={authorLogo} alt="Diego Daniel Caceres" />
          </div>
          <i className="fa-solid fa-arrow-up-right-from-square"></i>
        </a>
      </section>

      <footer className={styles.footer}>
        <div className={styles.footer__meta}>
          <p>© 2026 Kora • Diego Daniel Caceres</p>
        </div>
      </footer>
    </main>
  );
}
