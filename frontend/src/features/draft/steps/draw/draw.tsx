import { useMemo, useState, type DragEvent } from "react";
import type { AssignmentMode, DraftConfig, Team } from "../../draft.types";
import { AppHeader } from "../../components/AppHeader";
import styles from "./draw.module.scss";

interface StepDrawProps {
  config: DraftConfig;
  setAssignmentMode: (mode: AssignmentMode) => void;
  resetAssignments: () => void;
  assignPlayerToTeam: (playerId: string, teamId: string) => void;
  unassignPlayer: (playerId: string) => void;
  drawTeams: () => void;
  onNext: () => void;
  onBack: () => void;
}

const FORMATION_SPOTS = [
  { x: 50, y: 10 },
  { x: 26, y: 30 },
  { x: 50, y: 30 },
  { x: 74, y: 30 },
  { x: 22, y: 55 },
  { x: 50, y: 48 },
  { x: 78, y: 55 },
  { x: 36, y: 78 },
  { x: 64, y: 78 },
];

export function StepDraw({
  config,
  setAssignmentMode,
  resetAssignments,
  assignPlayerToTeam,
  unassignPlayer,
  drawTeams,
  onNext,
  onBack,
}: StepDrawProps) {
  const [selectedTeamId, setSelectedTeamId] = useState(
    config.teams[0]?.id ?? "",
  );
  const [dragOverZone, setDragOverZone] = useState<string | null>(null);

  const selectedTeam =
    config.teams.find((team) => team.id === selectedTeamId) ?? config.teams[0];

  const assignedCount = config.players.filter(
    (player) => player.teamId !== null,
  ).length;
  const availableCount = config.players.length - assignedCount;
  const allAssigned =
    config.players.length > 0 &&
    config.players.every((player) => player.teamId !== null);

  const playersByTeam = useMemo(
    () =>
      config.teams.reduce<Record<string, typeof config.players>>(
        (acc, team) => ({
          ...acc,
          [team.id]: config.players.filter(
            (player) => player.teamId === team.id,
          ),
        }),
        {},
      ),
    [config.players, config.teams],
  );

  const handleDragStart = (event: DragEvent<HTMLElement>, playerId: string) => {
    event.dataTransfer.setData("text/plain", playerId);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (event: DragEvent<HTMLElement>, zone: string) => {
    event.preventDefault();
    if (dragOverZone !== zone) setDragOverZone(zone);
  };

  const handleDropOnTeam = (event: DragEvent<HTMLElement>, team: Team) => {
    event.preventDefault();
    const playerId = event.dataTransfer.getData("text/plain");
    setDragOverZone(null);
    if (!playerId) return;

    setAssignmentMode("manual");
    setSelectedTeamId(team.id);
    assignPlayerToTeam(playerId, team.id);
  };

  const handleDropOnAvailable = (event: DragEvent<HTMLElement>) => {
    event.preventDefault();
    const playerId = event.dataTransfer.getData("text/plain");
    setDragOverZone(null);
    if (!playerId) return;

    setAssignmentMode("manual");
    unassignPlayer(playerId);
  };

  const handleDrawTeams = () => {
    setAssignmentMode("random");
    drawTeams();
  };

  const handleResetAssignments = () => {
    resetAssignments();
    setSelectedTeamId(config.teams[0]?.id ?? "");
  };

  return (
    <main className={styles.page}>
      <AppHeader />

      <section className={styles.draw}>
        <div className={styles.draw__content}>
          <aside className={styles.draw__sidebar}>
            <div className={styles.draw__intro}>
              <p className={styles.draw__eyebrow}>Alineacion de equipos</p>
              <h1 className={styles.draw__title}>Asigná los jugadores</h1>
              <p className={styles.draw__description}>
                Arrastrá cada jugador al equipo que quieras. También podés
                sortearlos automáticamente.
              </p>
            </div>

            <button
              type="button"
              className={styles.draw__shuffleButton}
              onClick={handleDrawTeams}
            >
              <i className="fa-solid fa-shuffle"></i>
              Sortear equipos
            </button>

            <div className={styles.draw__summary}>
              <span>
                <i className="fa-solid fa-shirt"></i>
                {config.teamCount} Equipos
              </span>
              <span>
                <i className="fa-solid fa-user-group"></i>
                {assignedCount}/{config.players.length} Jugadores
              </span>
            </div>

            <div
              className={[
                styles.draw__playerPanel,
                dragOverZone === "available"
                  ? styles["draw__playerPanel--over"]
                  : "",
              ].join(" ")}
              onDragOver={(event) => handleDragOver(event, "available")}
              onDragLeave={() => setDragOverZone(null)}
              onDrop={handleDropOnAvailable}
            >
              <div className={styles.draw__panelHeader}>
                <h2>Jugadores disponibles</h2>
                <span>{availableCount}</span>
              </div>

              <ul className={styles.draw__playerList}>
                {config.players.map((player) => {
                  return (
                    <li
                      key={player.id}
                      className={styles.draw__playerItem}
                      draggable
                      onDragStart={(event) => handleDragStart(event, player.id)}
                    >
                      <i className="fa-solid fa-grip-vertical"></i>
                      <strong>{player.name}</strong>
                      <span
                        className={[
                          styles.draw__badge,
                          player.isGoalkeeper
                            ? styles["draw__badge--keeper"]
                            : "",
                        ].join(" ")}
                      >
                        <i
                          className={
                            player.isGoalkeeper
                              ? "fa-solid fa-mitten"
                              : "fa-solid fa-shirt"
                          }
                        ></i>
                      </span>
                    </li>
                  );
                })}
              </ul>

              <div className={styles.draw__dropHint}>
                <i className="fa-regular fa-hand-pointer"></i>
                Arrastrá acá para dejar sin asignar
              </div>
            </div>
          </aside>

          <div className={styles.draw__board}>
            <div className={styles.draw__teamTabs}>
              {config.teams.map((team) => {
                const roster = playersByTeam[team.id] ?? [];

                return (
                  <button
                    key={team.id}
                    type="button"
                    className={[
                      styles.draw__teamTab,
                      styles[`draw__teamTab--${team.color}`],
                      selectedTeam?.id === team.id
                        ? styles["draw__teamTab--active"]
                        : "",
                      dragOverZone === team.id
                        ? styles["draw__teamTab--over"]
                        : "",
                    ].join(" ")}
                    onClick={() => setSelectedTeamId(team.id)}
                    onDragOver={(event) => handleDragOver(event, team.id)}
                    onDragLeave={() => setDragOverZone(null)}
                    onDrop={(event) => handleDropOnTeam(event, team)}
                  >
                    <span>
                      <i className="fa-solid fa-shirt"></i>
                      {team.name}
                    </span>
                    <strong>
                      {roster.length}/{config.playersPerTeam}
                    </strong>
                  </button>
                );
              })}
            </div>

            <div
              className={[
                styles.draw__field,
                selectedTeam
                  ? styles[`draw__field--${selectedTeam.color}`]
                  : "",
                selectedTeam && dragOverZone === selectedTeam.id
                  ? styles["draw__field--over"]
                  : "",
              ].join(" ")}
              onDragOver={(event) =>
                selectedTeam && handleDragOver(event, selectedTeam.id)
              }
              onDragLeave={() => setDragOverZone(null)}
              onDrop={(event) =>
                selectedTeam && handleDropOnTeam(event, selectedTeam)
              }
            >
              <div className={styles.draw__pitchLines} aria-hidden="true">
                <span className={styles.draw__boxTop}></span>
                <span className={styles.draw__centerLine}></span>
                <span className={styles.draw__centerCircle}></span>
              </div>

              {FORMATION_SPOTS.map((spot, index) => {
                const player = selectedTeam
                  ? playersByTeam[selectedTeam.id]?.[index]
                  : undefined;

                return (
                  <div
                    key={index}
                    className={styles.draw__spot}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                  >
                    <span
                      className={[
                        styles.draw__spotIcon,
                        player ? styles["draw__spotIcon--filled"] : "",
                        player
                          ? styles[`draw__spotIcon--${selectedTeam.color}`]
                          : "",
                      ].join(" ")}
                    >
                      <i
                        className={
                          player?.isGoalkeeper
                            ? "fa-solid fa-mitten"
                            : "fa-solid fa-shirt"
                        }
                      ></i>
                    </span>
                    <small>{player?.name ?? "Arrastrá un jugador"}</small>
                  </div>
                );
              })}
            </div>

            <div className={styles.draw__actions}>
              <button
                type="button"
                className={styles.draw__secondaryButton}
                onClick={onBack}
              >
                <i className="fa-solid fa-arrow-left"></i>
                Volver
              </button>
              <button
                type="button"
                className={styles.draw__ghostButton}
                onClick={handleResetAssignments}
                disabled={assignedCount === 0}
              >
                Limpiar asignaciones
              </button>
              <button
                type="button"
                className={styles.draw__primaryButton}
                onClick={onNext}
                disabled={!allAssigned}
              >
                Continuar
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
