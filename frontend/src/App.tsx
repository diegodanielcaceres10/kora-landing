// src/App.tsx
import { useDraftWizard } from "./features/draft/hooks/useDraftWizard";
import { StepWelcome } from "./features/draft/steps/StepWelcome";
import { StepDraw } from "./features/draft/steps/StepDraw";
import { StepExport } from "./features/draft/steps/StepExport";

function App() {
  const wizard = useDraftWizard();

  switch (wizard.step) {
    case "welcome":
      return <StepWelcome onStart={wizard.goNext} />;

    case "draw":
      return (
        <StepDraw
          config={wizard.config}
          setPlayersPerTeam={wizard.setPlayersPerTeam}
          setPlayerNames={wizard.setPlayerNames}
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
