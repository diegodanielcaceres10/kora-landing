import type { DraftConfig } from "../../../draft.types";
import styles from "../draw.module.scss";

interface StepAssignRandomProps {
  config: DraftConfig;
  drawTeams: () => void;
  onChangeMode: () => void;
  onConfirm: () => void;
}

export function StepAssignRandom({
  config,
  drawTeams,
  onChangeMode,
  onConfirm,
}: StepAssignRandomProps) {
  const hasDrawn = config.players.some((player) => player.teamId !== null);

  return (
    <section className={styles.draw__step}>
      <p className={styles.draw__eyebrow}>Etapa 2</p>
      <h1 className={styles.draw__title}>Sorteo de equipos</h1>
      <p className={styles.draw__description}>
        {hasDrawn
          ? "Así quedaron los equipos. Podés volver a sortear las veces que quieras."
          : "Tocá sortear para repartir a los jugadores al azar."}
      </p>

      {!hasDrawn && (
        <button
          type="button"
          className={styles.draw__drawButton}
          onClick={drawTeams}
        >
          <span aria-hidden="true">🎲</span> Sortear equipos
        </button>
      )}

      {hasDrawn && (
        <>
          <div className={styles.draw__teamsGrid}>
            {config.teams.map((team) => (
              <div key={team.id} className={styles.draw__teamColumn}>
                <div
                  className={[
                    styles.draw__teamHeader,
                    styles[`draw__teamHeader--${team.color}`],
                  ].join(" ")}
                >
                  <span>{team.name}</span>
                </div>
                <ul className={styles.draw__teamRoster}>
                  {config.players
                    .filter((player) => player.teamId === team.id)
                    .map((player) => (
                      <li key={player.id} className={styles.draw__rosterItem}>
                        {player.name}
                        {player.isGoalkeeper && (
                          <span aria-hidden="true"> 🧤</span>
                        )}
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </div>

          <button
            type="button"
            className={styles.draw__redrawButton}
            onClick={drawTeams}
          >
            Volver a sortear
          </button>
        </>
      )}

      <div className={styles.draw__actions}>
        <button
          type="button"
          className={styles.draw__secondaryButton}
          onClick={onChangeMode}
        >
          Cambiar modo
        </button>
        <button
          type="button"
          className={styles.draw__primaryButton}
          onClick={onConfirm}
          disabled={!hasDrawn}
        >
          Confirmar
        </button>
      </div>
    </section>
  );
}
