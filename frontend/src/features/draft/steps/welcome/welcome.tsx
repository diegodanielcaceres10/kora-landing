import styles from "./welcome.module.scss";
import koraLogo from "../../../../assets/kora-logo/kora-logo.png";
import koraBibs from "../../../../assets/illustrations/kora-bibs.png";

interface StepWelcomeProps {
  onStart: () => void;
}

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__content}>
        <div className={styles.welcome__brand}>
          <img src={koraLogo} alt="Kora Logo" />
        </div>

        <section className={styles.welcome__hero}>
          <h1 className={styles.welcome__title}>
            Sorteá los equipos
            <br />
            en 10 segundos
          </h1>

          <p className={styles.welcome__description}>
            Juntá a tu gente, armamos los equipos
            <br />y a jugar. Asi de simple.
          </p>
        </section>

        <div className={styles.welcome__illustration} aria-hidden="true">
          <img src={koraBibs} alt="Kora Welcome Illustration" />
        </div>

        <button
          type="button"
          className={styles.welcome__button}
          onClick={onStart}
        >
          <span>Armar equipos</span>
        </button>
      </div>
    </main>
  );
}
