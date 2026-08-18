import { forwardRef } from "react";
import type { DraftConfig } from "../../../draft.types";
import styles from "../export.module.scss";

interface ResultCardProps {
  config: DraftConfig;
}

export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  function ResultCard({ config }, ref) {
    return (
      <div ref={ref} className={styles.card}>
        <div className={styles.card__header}>
          <span className={styles.card__brand}>KORA</span>
          <span className={styles.card__subtitle}>Equipos sorteados</span>
        </div>

        <div className={styles.card__teams}>
          {config.teams.map((team) => (
            <div key={team.id} className={styles.card__team}>
              <div
                className={[
                  styles.card__teamHeader,
                  styles[`card__teamHeader--${team.color}`],
                ].join(" ")}
              >
                {team.name}
              </div>
              <ul className={styles.card__roster}>
                {config.players
                  .filter((player) => player.teamId === team.id)
                  .sort(
                    (a, b) =>
                      (a.spotIndex ?? Number.MAX_SAFE_INTEGER) -
                      (b.spotIndex ?? Number.MAX_SAFE_INTEGER),
                  )
                  .map((player) => (
                    <li key={player.id} className={styles.card__player}>
                      <span>{player.name}</span>
                      {player.isGoalkeeper && (
                        <span
                          className={styles.card__goalkeeperBadge}
                          aria-label="Arquero"
                        >
                          🧤
                        </span>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    );
  },
);
