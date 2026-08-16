import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { DraftConfig } from "../../draft.types";
import { ResultCard } from "./components/ResultCard";
import styles from "./export.module.scss";

interface StepExportProps {
  config: DraftConfig;
  onBack: () => void;
  onReset: () => void;
}

export function StepExport({ config, onBack, onReset }: StepExportProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleDownload = async () => {
    if (!cardRef.current) return;

    setIsExporting(true);
    setError(null);

    try {
      const dataUrl = await toPng(cardRef.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = "kora-equipos.png";
      link.href = dataUrl;
      link.click();
    } catch {
      setError("No se pudo generar la imagen. Probá de nuevo.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <main className={styles.export}>
      <div className={styles.export__content}>
        <p className={styles.export__eyebrow}>Etapa 2 · Paso 3</p>
        <h1 className={styles.export__title}>Equipos confirmados</h1>
        <p className={styles.export__description}>
          Revisá el resultado y descargalo como imagen para compartirlo.
        </p>

        <div className={styles.export__preview}>
          <ResultCard ref={cardRef} config={config} />
        </div>

        {error && <p className={styles.export__error}>{error}</p>}

        <div className={styles.export__actions}>
          <button
            type="button"
            className={styles.export__secondaryButton}
            onClick={onBack}
          >
            Volver
          </button>
          <button
            type="button"
            className={styles.export__primaryButton}
            onClick={handleDownload}
            disabled={isExporting}
          >
            {isExporting ? "Generando..." : "Descargar imagen"}
          </button>
        </div>

        <button
          type="button"
          className={styles.export__resetButton}
          onClick={onReset}
        >
          Empezar un sorteo nuevo
        </button>
      </div>
    </main>
  );
}
