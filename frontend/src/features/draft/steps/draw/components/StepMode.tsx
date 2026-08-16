import type { AssignmentMode } from "../../../draft.types";
import styles from "../draw.module.scss";

interface StepModeProps {
  onChoose: (mode: AssignmentMode) => void;
  onBack: () => void;
}

export function StepMode({ onChoose, onBack }: StepModeProps) {
  return (
    <section className={styles.draw__step}>
      <p className={styles.draw__eyebrow}>Etapa 2</p>
      <h1 className={styles.draw__title}>¿Cómo armamos los equipos?</h1>
      <p className={styles.draw__description}>
        Elegí si querés dejarlo en manos del azar o armar la alineación vos
        mismo.
      </p>

      <div className={styles.draw__modeGrid}>
        <button
          type="button"
          className={styles.draw__modeCard}
          onClick={() => onChoose("random")}
        >
          <span className={styles.draw__modeIcon} aria-hidden="true">
            🎲
          </span>
          <span className={styles.draw__modeName}>Sorteo</span>
          <span className={styles.draw__modeHint}>
            Repartimos a los jugadores al azar entre los equipos.
          </span>
        </button>

        <button
          type="button"
          className={styles.draw__modeCard}
          onClick={() => onChoose("manual")}
        >
          <span className={styles.draw__modeIcon} aria-hidden="true">
            ✋
          </span>
          <span className={styles.draw__modeName}>Manual</span>
          <span className={styles.draw__modeHint}>
            Arrastrá a cada jugador al equipo que quieras.
          </span>
        </button>
      </div>

      <div className={styles.draw__actions}>
        <button
          type="button"
          className={styles.draw__secondaryButton}
          onClick={onBack}
        >
          Volver
        </button>
      </div>
    </section>
  );
}
