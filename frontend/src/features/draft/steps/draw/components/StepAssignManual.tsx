import { useState, type DragEvent } from "react";
import type { DraftConfig } from "../../../draft.types";
import styles from "../draw.module.scss";

interface StepAssignManualProps {
  config: DraftConfig;
  assignPlayerToTeam: (playerId: string, teamId: string) => void;
  unassignPlayer: (playerId: string) => void;
  onChangeMode: () => void;
  onConfirm: () => void;
  canConfirm: boolean;
}

export function StepAssignManual({
  config,
  assignPlayerToTeam,
  unassignPlayer,
  onChangeMode,
  onConfirm,
  canConfirm,
}: StepAssignManualProps) {
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  const unassigned = config.players.filter((player) => player.teamId === null);

  const handleDragStart = (
    event: DragEvent<HTMLLIElement>,
    playerId: string,
  ) => {
    event.dataTransfer.setData("text/plain", playerId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>, zone: string) => {
    event.preventDefault();
    if (dragOverZone !== zone) setDragOverZone(zone);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>, zone: string) => {
    event.preventDefault();
    const playerId = event.dataTransfer.getData("text/plain");
    setDragOverZone(null);
    if (!playerId) return;

    if (zone === "unassigned") {
      unassignPlayer(playerId);
    } else {
      assignPlayerToTeam(playerId, zone);
    }
  };

  return (
    <section className={styles.draw__step}>
      <p className={styles.draw__eyebrow}>Etapa 2</p>
      <h1 className={styles.draw__title}>Armá los equipos</h1>
      <p className={styles.draw__description}>
        Arrastrá cada jugador desde "Sin asignar" hacia el equipo que
        quieras.
      </p>

      <div
        className={[
          styles.draw__pool,
          dragOverZone === "unassigned" ? styles["draw__pool--over"] : "",
        ].join(" ")}
        onDragOver={(event) => handleDragOver(event, "unassigned")}
        onDragLeave={() => setDragOverZone(null)}
        onDrop={(event) => handleDrop(event, "unassigned")}
      >
        <p className={styles.draw__poolLabel}>
          Sin asignar ({unassigned.length})
        </p>
        <ul className={styles.draw__poolList}>
          {unassigned.map((player) => (
            <li
              key={player.id}
              className={styles.draw__playerChip}
              draggable
              onDragStart={(event) => handleDragStart(event, player.id)}
            >
              {player.name}
              {player.isGoalkeeper && <span aria-hidden="true"> 🧤</span>}
            </li>
          ))}
          {unassigned.length === 0 && (
            <li className={styles.draw__poolEmpty}>Todos asignados</li>
          )}
        </ul>
      </div>

      <div className={styles.draw__teamsGrid}>
        {config.teams.map((team) => {
          const roster = config.players.filter(
            (player) => player.teamId === team.id,
          );
          const isFull = roster.length >= config.playersPerTeam;

          return (
            <div
              key={team.id}
              className={[
                styles.draw__teamColumn,
                dragOverZone === team.id ? styles["draw__teamColumn--over"] : "",
              ].join(" ")}
              onDragOver={(event) => handleDragOver(event, team.id)}
              onDragLeave={() => setDragOverZone(null)}
              onDrop={(event) => handleDrop(event, team.id)}
            >
              <div
                className={[
                  styles.draw__teamHeader,
                  styles[`draw__teamHeader--${team.color}`],
                ].join(" ")}
              >
                <span>{team.name}</span>
                <span className={styles.draw__teamCount}>
                  {roster.length}/{config.playersPerTeam}
                </span>
              </div>
              <ul className={styles.draw__teamRoster}>
                {roster.map((player) => (
                  <li
                    key={player.id}
                    className={styles.draw__rosterItem}
                    draggable
                    onDragStart={(event) => handleDragStart(event, player.id)}
                  >
                    {player.name}
                    {player.isGoalkeeper && <span aria-hidden="true"> 🧤</span>}
                  </li>
                ))}
                {roster.length === 0 && (
                  <li className={styles.draw__teamEmpty}>Soltá acá</li>
                )}
              </ul>
              {isFull && (
                <p className={styles.draw__teamFullNote}>Equipo completo</p>
              )}
            </div>
          );
        })}
      </div>

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
          disabled={!canConfirm}
        >
          Confirmar
        </button>
      </div>
    </section>
  );
}
