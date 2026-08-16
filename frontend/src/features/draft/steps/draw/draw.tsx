import { useState } from "react";
import type { AssignmentMode, DraftConfig, DrawSubStep } from "../../draft.types";
import { StepMode } from "./components/StepMode";
import { StepAssignRandom } from "./components/StepAssignRandom";
import { StepAssignManual } from "./components/StepAssignManual";
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
  const [subStep, setSubStep] = useState<DrawSubStep>(
    config.assignmentMode ? "assign" : "mode",
  );

  const handleChooseMode = (mode: AssignmentMode) => {
    setAssignmentMode(mode);
    setSubStep("assign");
  };

  const handleChangeMode = () => {
    resetAssignments();
    setSubStep("mode");
  };

  const allAssigned =
    config.players.length > 0 &&
    config.players.every((player) => player.teamId !== null);

  return (
    <main className={styles.draw}>
      <div className={styles.draw__content}>
        {subStep === "mode" && (
          <StepMode onChoose={handleChooseMode} onBack={onBack} />
        )}

        {subStep === "assign" && config.assignmentMode === "random" && (
          <StepAssignRandom
            config={config}
            drawTeams={drawTeams}
            onChangeMode={handleChangeMode}
            onConfirm={onNext}
          />
        )}

        {subStep === "assign" && config.assignmentMode === "manual" && (
          <StepAssignManual
            config={config}
            assignPlayerToTeam={assignPlayerToTeam}
            unassignPlayer={unassignPlayer}
            onChangeMode={handleChangeMode}
            onConfirm={onNext}
            canConfirm={allAssigned}
          />
        )}
      </div>
    </main>
  );
}
