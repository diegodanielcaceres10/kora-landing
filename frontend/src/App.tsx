// src/App.tsx
import { useDraftWizard } from "./features/draft/hooks/useDraftWizard";
import { StepWelcome } from "./features/draft/steps/welcome/welcome";
import { StepSetup } from "./features/draft/steps/setup/setup";
import { StepDraw } from "./features/draft/steps/draw/draw";
import { StepExport } from "./features/draft/steps/export/export";

function App() {
  const wizard = useDraftWizard();

  switch (wizard.step) {
    case "welcome":
      return <StepWelcome onStart={wizard.goNext} />;

    case "setup":
      return (
        <StepSetup
          config={wizard.config}
          setTeamCount={wizard.setTeamCount}
          setPlayersPerTeam={wizard.setPlayersPerTeam}
          addPlayer={wizard.addPlayer}
          addPlayers={wizard.addPlayers}
          removePlayer={wizard.removePlayer}
          toggleGoalkeeper={wizard.toggleGoalkeeper}
          onNext={wizard.goNext}
          onBack={wizard.goBack}
        />
      );

    case "draw":
      return (
        <StepDraw
          config={wizard.config}
          setAssignmentMode={wizard.setAssignmentMode}
          resetAssignments={wizard.resetAssignments}
          assignPlayerToTeam={wizard.assignPlayerToTeam}
          unassignPlayer={wizard.unassignPlayer}
          drawTeams={wizard.drawTeams}
          onNext={wizard.goNext}
          onBack={wizard.goBack}
        />
      );

    case "export":
      return (
        <StepExport
          config={wizard.config}
          onBack={wizard.goBack}
          onReset={wizard.reset}
        />
      );
  }
}

export default App;
