import {
  MIN_TEAMS,
  MAX_TEAMS,
  TEAM_COUNT_OPTIONS,
} from "../../../draft.constants";
import styles from "../setup.module.scss";

interface StepTeamCountProps {
  teamCount: number;
  onChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepTeamCount({
  teamCount,
  onChange,
  onNext,
  onBack,
}: StepTeamCountProps) {
  const decrement = () => onChange(Math.max(MIN_TEAMS, teamCount - 1));
  const increment = () => onChange(Math.min(MAX_TEAMS, teamCount + 1));

  return (
    <section className={styles.setup__step}>
      <p className={styles.setup__eyebrow}>Paso 1 de 3</p>
      <h1 className={styles.setup__title}>¿Cuántos equipos?</h1>
      <p className={styles.setup__description}>Elegí una opción rápida...</p>

      <div className={styles.setup__chips}>
        {TEAM_COUNT_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={[
              styles.setup__chip,
              option === teamCount ? styles["setup__chip--active"] : "",
            ].join(" ")}
            onClick={() => onChange(option)}
          >
            <span className={styles.setup__shirt}>
              {Array.from({ length: option }).map((_, i) => (
                <i key={i} className="fa-solid fa-shirt"></i>
              ))}
            </span>
            <span className={styles.setup__number}>{option}</span>
          </button>
        ))}
      </div>

      <p className={styles.setup__description}>
        o ajustá el número manualmente.
      </p>

      <div className={styles.setup__stepperCard}>
        <button
          type="button"
          className={styles.setup__button}
          onClick={decrement}
          disabled={teamCount <= MIN_TEAMS}
          aria-label="Restar equipo"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className={styles.setup__divider} aria-hidden="true" />
        <span className={styles.setup__value}>{teamCount}</span>
        <span className={styles.setup__divider} aria-hidden="true" />
        <button
          type="button"
          className={styles.setup__button}
          onClick={increment}
          disabled={teamCount >= MAX_TEAMS}
          aria-label="Sumar equipo"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <p className={styles.setup__helper}>
        Mínimo {MIN_TEAMS} equipos <span aria-hidden="true">•</span> Máximo{" "}
        {MAX_TEAMS} equipos
      </p>

      <div className={styles.setup__actions}>
        <button
          type="button"
          className={styles.setup__secondaryButton}
          onClick={onBack}
        >
          <i className="fa-solid fa-arrow-left"></i>
          Volver
        </button>
        <button
          type="button"
          className={styles.setup__primaryButton}
          onClick={onNext}
        >
          Continuar
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </section>
  );
}
