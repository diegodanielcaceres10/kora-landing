import type { DraftConfig } from "../draft.types";

interface StepDrawProps {
  config: DraftConfig;
  setPlayersPerTeam: (count: number) => void;
  setPlayerNames: (names: string[]) => void;
  drawTeams: () => void;
  onNext: () => void;
  onBack: () => void;
}

export function StepDraw({ onNext, onBack }: StepDrawProps) {
  return (
    <div>
      <h2>Draw (placeholder)</h2>
      <button onClick={onBack}>Volver</button>
      <button onClick={onNext}>Continuar</button>
    </div>
  );
}
