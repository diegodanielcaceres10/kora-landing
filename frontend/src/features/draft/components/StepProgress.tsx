import styles from "./StepProgress.module.scss";

export type GlobalStep = 1 | 2 | 3;

interface StepProgressProps {
  currentStep: GlobalStep;
  summaries?: Partial<Record<GlobalStep, string>>;
}

const STEPS: { step: GlobalStep; label: string }[] = [
  { step: 1, label: "Equipos" },
  { step: 2, label: "Jugadores" },
  { step: 3, label: "Lista" },
];

export function StepProgress({ currentStep, summaries }: StepProgressProps) {
  return (
    <div className={styles.progress}>
      {STEPS.map(({ step, label }, i) => (
        <div className={styles.progress__step} key={step}>
          <div className={styles.progress__node}>
            <span
              className={[
                styles.progress__circle,
                step < currentStep ? styles["progress__circle--done"] : "",
                step === currentStep ? styles["progress__circle--active"] : "",
              ].join(" ")}
            >
              {step < currentStep ? (
                <i className="fa-solid fa-check"></i>
              ) : (
                step
              )}
            </span>
            <span
              className={[
                styles.progress__label,
                step === currentStep ? styles["progress__label--active"] : "",
              ].join(" ")}
            >
              {label}
            </span>
            {summaries?.[step] && step < currentStep && (
              <span className={styles.progress__summary}>
                {summaries[step]}
              </span>
            )}
          </div>

          {i < STEPS.length - 1 && (
            <span
              className={[
                styles.progress__line,
                step < currentStep ? styles["progress__line--done"] : "",
                step === currentStep ? styles["progress__line--current"] : "",
              ].join(" ")}
            />
          )}
        </div>
      ))}
    </div>
  );
}
