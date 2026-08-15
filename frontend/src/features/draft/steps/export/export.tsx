import type { DraftConfig } from "../../draft.types";

interface StepExportProps {
  config: DraftConfig;
  onBack: () => void;
  onReset: () => void;
}

export function StepExport({ config, onBack, onReset }: StepExportProps) {
  return (
    <div>
      <h2>Export (placeholder)</h2>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <button onClick={onBack}>Volver</button>
      <button onClick={onReset}>Empezar de nuevo</button>
    </div>
  );
}
