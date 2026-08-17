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
  const isComplete = totalNeeded > 0 && players.length >= totalNeeded;
  const canAdd = totalNeeded === 0 || players.length < totalNeeded;

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!name.trim() || !canAdd) return;
    onAdd(name);
    setName("");
  };

  return (
    <section
      className={[styles.setup__step, styles["setup__step--narrow"]].join(" ")}
    >
      <p className={styles.setup__eyebrow}>Paso 3 de 3</p>
      <h1 className={styles.setup__title}>Sumá a los jugadores</h1>
      <p className={styles.setup__description}>
        Tocá el guante para marcar quién ataja.
      </p>

      <form className={styles.setup__form} onSubmit={handleSubmit}>
        <input
          name="player"
          type="text"
          className={styles.setup__input}
          placeholder={
            canAdd ? "Nombre del jugador" : "Ya completaste la lista"
          }
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={!canAdd}
        />
        {canAdd && (
          <button
            type="submit"
            className={styles.setup__add}
            disabled={!canAdd}
          >
            Agregar
          </button>
        )}
      </form>

      <p
        className={[
          styles.setup__counter,
          isComplete ? styles["setup__counter--complete"] : "",
        ].join(" ")}
      >
        {players.length} / {totalNeeded} jugadores
      </p>

      <ul className={styles.setup__list}>
        {players.map((player) => (
          <li key={player.id} className={styles.setup__player}>
            <span className={styles.setup__name}>{player.name}</span>
            <button
              type="button"
              className={[
                styles.setup__goalkeeper,
                player.isGoalkeeper ? styles["setup__goalkeeper--active"] : "",
              ].join(" ")}
              onClick={() => onToggleGoalkeeper(player.id)}
              aria-pressed={player.isGoalkeeper}
              title="Marcar como arquero"
            >
              🧤
            </button>
            <button
              type="button"
              className={styles.setup__remove}
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
          <i className="fa-solid fa-arrow-left"></i>
          Volver
        </button>
        <button
          type="button"
          className={styles.setup__primaryButton}
          onClick={onNext}
          disabled={!isComplete}
        >
          Continuar
          <i className="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    </section>
  );
}
