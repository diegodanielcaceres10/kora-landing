import styles from "./welcome.module.scss";
import koraIcon from "/favicon.png";
import koraLogo from "../../../../assets/kora-logo/kora-logo.png";
import koraBibs from "../../../../assets/illustrations/kora-bibs.png";

interface StepWelcomeProps {
  onStart: () => void;
}

const NAV_LINKS = ["Inicio", "Cómo funciona", "FAQ", "Sobre Kora"];

const FAQ_ITEMS = [
  "¿Es gratis usar Kora?",
  "¿Puedo editar los equipos después del sorteo?",
  "¿Cuántos jugadores puedo agregar?",
  "¿Cómo comparto los equipos?",
  "¿Puedo elegir la cantidad de equipos y jugadores?",
  "¿Necesito crear una cuenta para usar Kora?",
];

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <main className={styles.page}>
      <header className={styles.nav}>
        <div className={styles.nav__content}>
          <div className={styles.nav__logo}>
            <button type="button" className={styles.nav__menu}>
              <i className="fa-solid fa-bars-staggered"></i>
            </button>
            <img src={koraIcon} alt="" />
          </div>

          <nav className={styles.nav__links}>
            {NAV_LINKS.map((link, i) => (
              <span
                key={link}
                className={[
                  styles.nav__link,
                  i === 0 ? styles["nav__link--active"] : "",
                ].join(" ")}
              >
                {link}
              </span>
            ))}
          </nav>

          <button type="button" className={styles.nav__button}>
            <i className="fa-regular fa-circle-user"></i>
            <span>Iniciar sesión</span>
          </button>
        </div>
      </header>

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
          {FAQ_ITEMS.map((question) => (
            <div key={question} className={styles.faq__item}>
              <span>{question}</span>
              <i className="fa-solid fa-angle-down"></i>
            </div>
          ))}
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
