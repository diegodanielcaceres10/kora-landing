interface StepWelcomeProps {
  onStart: () => void;
}

export function StepWelcome({ onStart }: StepWelcomeProps) {
  return (
    <div>
      <h1>Kora</h1>
      <button onClick={onStart}>Armar equipos</button>
    </div>
  );
}
