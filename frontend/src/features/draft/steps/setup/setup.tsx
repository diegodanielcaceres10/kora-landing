import { useState } from "react";
import type { DraftConfig, SetupSubStep } from "../../draft.types";
import { StepTeamCount } from "./components/StepTeamCount";
import { StepPlayersPerTeam } from "./components/StepPlayersPerTeam";
import { StepPlayerList } from "./components/StepPlayerList";
import styles from "./setup.module.scss";

interface StepSetupProps {
  config: DraftConfig;
  setTeamCount: (count: number) => void;
  setPlayersPerTeam: (count: number) => void;
  addPlayer: (name: string) => void;
  removePlayer: (id: string) => void;
  toggleGoalkeeper: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
}

const SUB_STEP_ORDER: SetupSubStep[] = ["teams", "playersPerTeam", "players"];

export function StepSetup({
  config,
  setTeamCount,
  setPlayersPerTeam,
  addPlayer,
  removePlayer,
  toggleGoalkeeper,
  onNext,
  onBack,
}: StepSetupProps) {
  const [subStep, setSubStep] = useState<SetupSubStep>("teams");
  const subStepIndex = SUB_STEP_ORDER.indexOf(subStep);

  const goToNextSubStep = () => {
    if (subStepIndex === SUB_STEP_ORDER.length - 1) {
      onNext();
      return;
    }
    setSubStep(SUB_STEP_ORDER[subStepIndex + 1]);
  };

  const goToPrevSubStep = () => {
    if (subStepIndex === 0) {
      onBack();
      return;
    }
    setSubStep(SUB_STEP_ORDER[subStepIndex - 1]);
  };

  return (
    <main className={styles.setup}>
      <div className={styles.setup__content}>
        <div className={styles.setup__progress} aria-hidden="true">
          {SUB_STEP_ORDER.map((item, i) => (
            <span
              key={item}
              className={[
                styles.setup__dot,
                i === subStepIndex ? styles["setup__dot--active"] : "",
                i < subStepIndex ? styles["setup__dot--done"] : "",
              ].join(" ")}
            />
          ))}
        </div>

        {subStep === "teams" && (
          <StepTeamCount
            teamCount={config.teamCount}
            onChange={setTeamCount}
            onNext={goToNextSubStep}
            onBack={goToPrevSubStep}
          />
        )}

        {subStep === "playersPerTeam" && (
          <StepPlayersPerTeam
            playersPerTeam={config.playersPerTeam}
            onChange={setPlayersPerTeam}
            onNext={goToNextSubStep}
            onBack={goToPrevSubStep}
          />
        )}

        {subStep === "players" && (
          <StepPlayerList
            players={config.players}
            totalNeeded={config.teamCount * config.playersPerTeam}
            onAdd={addPlayer}
            onRemove={removePlayer}
            onToggleGoalkeeper={toggleGoalkeeper}
            onNext={goToNextSubStep}
            onBack={goToPrevSubStep}
          />
        )}
      </div>
    </main>
  );
}
