import { forwardRef } from "react";
import type { DraftConfig } from "../../../draft.types";
import styles from "../export.module.scss";
import koraLogo from "../../../../../assets/kora-logo/kora-logo.png";
import koraBibs from "../../../../../assets/illustrations/kora-bibs.png";

interface ResultCardProps {
  config: DraftConfig;
}

export const ResultCard = forwardRef<HTMLDivElement, ResultCardProps>(
  function ResultCard({ config }, ref) {
    return (
      <div ref={ref} className={styles.card}>
        <div className={styles.card__header}>
          <img src={koraLogo} alt="Kora" className={styles.card__logo} />
        </div>

        <div className={styles.card__teams}>
          {config.teams.map((team) => {
            const players = config.players
              .filter((player) => player.teamId === team.id)
              .sort(
                (a, b) =>
                  (a.spotIndex ?? Number.MAX_SAFE_INTEGER) -
                  (b.spotIndex ?? Number.MAX_SAFE_INTEGER),
              );

            return (
              <div key={team.id} className={styles.card__team}>
                <div
                  className={[
                    styles.card__teamHeader,
                    styles[`card__teamHeader--${team.color}`],
                  ].join(" ")}
                >
                  <i className="fa-solid fa-shirt"></i>
                  {team.name}
                </div>
                <ul className={styles.card__roster}>
                  {players.map((player, index) => (
                    <li key={player.id} className={styles.card__player}>
                      <strong>{index + 1}</strong>
                      <span>{player.name}</span>
                      {player.isGoalkeeper && (
                        <span
                          className={styles.card__goalkeeperBadge}
                          aria-label="Arquero"
                        >
                          <i className="fa-solid fa-mitten"></i>
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className={styles.card__footer}>
          <div className={styles.card__credit}>
            <img src={koraLogo} alt="" />
            <span>Creado con Kora</span>
          </div>
          <img src={koraBibs} alt="" className={styles.card__bibs} />
        </div>
      </div>
    );
  },
);
