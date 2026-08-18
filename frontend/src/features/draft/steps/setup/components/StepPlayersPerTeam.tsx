import {
  MIN_PLAYERS_PER_TEAM,
  MAX_PLAYERS_PER_TEAM,
  PLAYERS_PER_TEAM_OPTIONS,
} from "../../../draft.constants";
import styles from "../setup.module.scss";

interface StepPlayersPerTeamProps {
  teamCount: number;
  playersPerTeam: number;
  onChange: (count: number) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPlayersPerTeam({
  teamCount,
  playersPerTeam,
  onChange,
  onNext,
  onBack,
}: StepPlayersPerTeamProps) {
  const decrement = () =>
    onChange(Math.max(MIN_PLAYERS_PER_TEAM, playersPerTeam - 1));
  const increment = () =>
    onChange(Math.min(MAX_PLAYERS_PER_TEAM, playersPerTeam + 1));

  const totalPlayers = teamCount * playersPerTeam;

  return (
    <section className={styles.setup__step}>
      <p className={styles.setup__eyebrow}>Paso 2 de 3</p>
      <h1 className={styles.setup__title}>¿Cuántos jugadores por equipo?</h1>
      <p className={styles.setup__description}>Elegí una opción rápida...</p>

      <div className={styles.setup__options}>
        {PLAYERS_PER_TEAM_OPTIONS.map((option) => (
          <button
            key={option}
            type="button"
            className={[
              styles.setup__option,
              option === playersPerTeam ? styles["setup__option--active"] : "",
            ].join(" ")}
            onClick={() => onChange(option)}
          >
            {option}
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
          disabled={playersPerTeam <= MIN_PLAYERS_PER_TEAM}
          aria-label="Restar jugador"
        >
          <i className="fa-solid fa-minus"></i>
        </button>
        <span className={styles.setup__divider} aria-hidden="true" />
        <span className={styles.setup__value}>{playersPerTeam}</span>
        <span className={styles.setup__divider} aria-hidden="true" />
        <button
          type="button"
          className={styles.setup__button}
          onClick={increment}
          disabled={playersPerTeam >= MAX_PLAYERS_PER_TEAM}
          aria-label="Sumar jugador"
        >
          <i className="fa-solid fa-plus"></i>
        </button>
      </div>

      <p className={styles.setup__note}>
        <i className="fa-solid fa-circle-info"></i>
        Con <strong>{teamCount} equipos</strong>, necesitás{" "}
        <strong>{totalPlayers} jugadores</strong> en total.
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
