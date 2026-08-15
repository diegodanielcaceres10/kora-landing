import {
  MIN_PLAYERS_PER_TEAM,
  MAX_PLAYERS_PER_TEAM,
  PLAYERS_PER_TEAM_OPTIONS,
} from "../../../draft.constants";
import styles from "../setup.module.scss";

interface StepPlayersPerTeamProps {
  playersPerTeam: number;
  onChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPlayersPerTeam({
  playersPerTeam,
  onChange,
  onNext,
  onBack,
}: StepPlayersPerTeamProps) {
  const decrement = () =>
    onChange(Math.max(MIN_PLAYERS_PER_TEAM, playersPerTeam - 1));
  const increment = () =>
    onChange(Math.min(MAX_PLAYERS_PER_TEAM, playersPerTeam + 1));

  return (
    <section className={styles.setup__step}>
      <p className={styles.setup__eyebrow}>Paso 2 de 3</p>
      <h1 className={styles.setup__title}>¿Cuántos jugadores por equipo?</h1>
      <p className={styles.setup__description}>
        Incluí al arquero en la cuenta.
      </p>

      <div className={styles.setup__chips}>
        {PLAYERS_PER_TEAM_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={[
              styles.setup__chip,
              option === playersPerTeam ? styles["setup__chip--active"] : "",
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
          disabled={playersPerTeam <= MIN_PLAYERS_PER_TEAM}
          aria-label="Restar jugador"
        >
          −
        </button>
        <span className={styles.setup__stepperValue}>{playersPerTeam}</span>
        <button
          type="button"
          className={styles.setup__stepperButton}
          onClick={increment}
          disabled={playersPerTeam >= MAX_PLAYERS_PER_TEAM}
          aria-label="Sumar jugador"
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
