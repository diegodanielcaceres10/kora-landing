import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import type { DraftConfig } from "../../draft.types";
import { AppHeader } from "../../components/AppHeader";
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
  const [clipboardMessage, setClipboardMessage] = useState<string | null>(null);

  const shareTitle = "Sorteo de equipos Kora";
  const shareText = "Mirá cómo quedaron los equipos del partido.";

  const createResultImage = async () => {
    if (!cardRef.current) return null;

    return toPng(cardRef.current, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#063326",
    });
  };

  const downloadImage = (dataUrl: string) => {
    const link = document.createElement("a");
    link.download = "kora-equipos.png";
    link.href = dataUrl;
    link.click();
  };

  const createResultFile = async () => {
    const dataUrl = await createResultImage();
    if (!dataUrl) return null;

    const blob = await (await fetch(dataUrl)).blob();
    return new File([blob], "kora-equipos.png", { type: "image/png" });
  };

  const handleDownload = async () => {
    setIsExporting(true);
    setError(null);
    setClipboardMessage(null);

    try {
      const dataUrl = await createResultImage();
      if (!dataUrl) return;
      downloadImage(dataUrl);
    } catch {
      setError("No se pudo generar la imagen. Probá de nuevo.");
    } finally {
      setIsExporting(false);
    }
  };

  const handleShareWhatsApp = async () => {
    setIsExporting(true);
    setError(null);
    setClipboardMessage(null);

    try {
      const file = await createResultFile();
      if (!file) return;

      const shareData = {
        title: shareTitle,
        text: shareText,
        files: [file],
      };

      if (!navigator.canShare?.(shareData)) {
        setError(
          "Este navegador no permite compartir imágenes directamente. Probá desde el celular.",
        );
        return;
      }

      await navigator.share(shareData);
    } catch {
      setError("No se pudo compartir la imagen por WhatsApp.");
    } finally {
      setIsExporting(false);
    }
  };

  const createPlainTextResult = () =>
    config.teams
      .map((team) => {
        const players = config.players
          .filter((player) => player.teamId === team.id)
          .sort(
            (a, b) =>
              (a.spotIndex ?? Number.MAX_SAFE_INTEGER) -
              (b.spotIndex ?? Number.MAX_SAFE_INTEGER),
          )
          .map((player, index) => {
            const goalkeeperLabel = player.isGoalkeeper ? " (Arquero)" : "";
            return `${index + 1}. ${player.name}${goalkeeperLabel}`;
          });

        return `${team.name}\n${players.join("\n")}`;
      })
      .join("\n\n");

  const handleCopyPlainText = async () => {
    setError(null);
    setClipboardMessage(null);

    try {
      await navigator.clipboard.writeText(createPlainTextResult());
      setClipboardMessage("Listado copiado al portapapeles.");
    } catch {
      setError("No se pudo copiar el listado.");
    }
  };

  return (
    <main className={styles.page}>
      <AppHeader />

      <section className={styles.export}>
        <div className={styles.export__content}>
          <div className={styles.export__preview}>
            <ResultCard ref={cardRef} config={config} />
          </div>

          {error && <p className={styles.export__error}>{error}</p>}
          {clipboardMessage && (
            <p className={styles.export__clipboardMessage}>
              {clipboardMessage}
            </p>
          )}

          <section className={styles.export__share}>
            <h1 className={styles.export__shareTitle}>Compartir resultado</h1>
            <div className={styles.export__shareActions}>
              <button
                type="button"
                className={[
                  styles.export__shareButton,
                  styles["export__shareButton--whatsapp"],
                ].join(" ")}
                onClick={handleShareWhatsApp}
                disabled={isExporting}
              >
                <span>
                  <i className="fa-brands fa-whatsapp"></i>
                </span>
                WhatsApp
              </button>
              <button
                type="button"
                className={styles.export__shareButton}
                onClick={handleCopyPlainText}
              >
                <span>
                  <i className="fa-solid fa-clipboard-list"></i>
                </span>
                Copiar texto
              </button>
              <button
                type="button"
                className={styles.export__shareButton}
                onClick={handleDownload}
                disabled={isExporting}
              >
                <span>
                  <i className="fa-solid fa-download"></i>
                </span>
                Descargar
              </button>
            </div>
          </section>

          <div className={styles.export__actions}>
            <button
              type="button"
              className={styles.export__secondaryButton}
              onClick={onBack}
            >
              <i className="fa-solid fa-arrow-left"></i>
              Volver
            </button>
            <button
              type="button"
              className={styles.export__primaryButton}
              onClick={onReset}
            >
              Nuevo sorteo
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
