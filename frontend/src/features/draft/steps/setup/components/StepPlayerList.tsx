import { useState, type FormEvent } from "react";
import type { Player } from "../../../draft.types";
import styles from "../setup.module.scss";

interface StepPlayerListProps {
  players: Player[];
  totalNeeded: number;
  onAdd: (name: string) => void;
  onRemove: (id: string) => void;
  onToggleGoalkeeper: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepPlayerList({
  players,
  totalNeeded,
  onAdd,
  onRemove,
  onToggleGoalkeeper,
  onNext,
  onBack,
}: StepPlayerListProps) {
  const [name, setName] = useState("");
  const canContinue = totalNeeded > 0 && players.length >= totalNeeded;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim()) return;
    onAdd(name);
    setName("");
  };

  return (
    <section className={styles.setup__step}>
      <p className={styles.setup__eyebrow}>Paso 3 de 3</p>
      <h1 className={styles.setup__title}>Sumá a los jugadores</h1>
      <p className={styles.setup__description}>
        Tocá el guante para marcar quién ataja.
      </p>

      <form className={styles.setup__playerForm} onSubmit={handleSubmit}>
        <input
          type="text"
          className={styles.setup__input}
          placeholder="Nombre del jugador"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" className={styles.setup__addButton}>
          Agregar
        </button>
      </form>

      <p
        className={[
          styles.setup__counter,
          canContinue ? styles["setup__counter--complete"] : "",
        ].join(" ")}
      >
        {players.length} / {totalNeeded} jugadores
      </p>

      <ul className={styles.setup__playerList}>
        {players.map((player) => (
          <li key={player.id} className={styles.setup__playerItem}>
            <span className={styles.setup__playerName}>{player.name}</span>
            <button
              type="button"
              className={[
                styles.setup__goalkeeperButton,
                player.isGoalkeeper
                  ? styles["setup__goalkeeperButton--active"]
                  : "",
              ].join(" ")}
              onClick={() => onToggleGoalkeeper(player.id)}
              aria-pressed={player.isGoalkeeper}
              title="Marcar como arquero"
            >
              🧤
            </button>
            <button
              type="button"
              className={styles.setup__removeButton}
              onClick={() => onRemove(player.id)}
              aria-label={`Quitar a ${player.name}`}
            >
              ×
            </button>
          </li>
        ))}
      </ul>

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
          disabled={!canContinue}
        >
          Continuar
        </button>
      </div>
    </section>
  );
}
