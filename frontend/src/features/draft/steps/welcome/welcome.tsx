import styles from "./welcome.module.scss";

interface StepWelcomeProps {
  onStart: () => void;
}

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <main className={styles.welcome}>
      <div className={styles.welcome__content}>
        <header className={styles.welcome__brand}>
          <span className={styles.welcome__name}>Kora</span>
        </header>

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
          <img src="/src/assets/illustrations/kora-bibs.png" alt="" />
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
