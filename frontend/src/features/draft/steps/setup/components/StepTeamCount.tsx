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
      <p className={styles.setup__description}>
        Elegí una opción rápida o ajustá el número manualmente.
      </p>

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
            {option}
          </button>
        ))}
      </div>

      <div className={styles.setup__stepper}>
        <button
          type="button"
          className={styles.setup__stepperButton}
          onClick={decrement}
          disabled={teamCount <= MIN_TEAMS}
          aria-label="Restar equipo"
        >
          −
        </button>
        <span className={styles.setup__stepperValue}>{teamCount}</span>
        <button
          type="button"
          className={styles.setup__stepperButton}
          onClick={increment}
          disabled={teamCount >= MAX_TEAMS}
          aria-label="Sumar equipo"
        >
          +
        </button>
      </div>

      <div className={styles.setup__actions}>
        <button
          type="button"
          className={styles.setup__secondaryButton}
          onClick={onBack}
        >
          Volver
        </button>
        <button
          type="button"
          className={styles.setup__primaryButton}
          onClick={onNext}
        >
          Continuar
        </button>
      </div>
    </section>
  );
}
