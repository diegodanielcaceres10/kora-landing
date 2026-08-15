import { useState, useCallback } from "react";
import type { WizardStep, DraftConfig, Player } from "../draft.types";
import { DEFAULT_TEAM_COUNT, DEFAULT_TEAMS } from "../draft.constants";

const createEmptyConfig = (): DraftConfig => ({
  teamCount: DEFAULT_TEAM_COUNT,
  playersPerTeam: 0,
  teams: DEFAULT_TEAMS.map((t, i) => ({
    id: `team-${i}`,
    name: i === 0 ? "Equipo A" : "Equipo B",
    color: t.color,
  })),
  players: [],
});

export function useDraftWizard() {
  const [step, setStep] = useState<WizardStep>("welcome");
  const [config, setConfig] = useState<DraftConfig>(createEmptyConfig());

  const goNext = useCallback(() => {
    setStep((current) => {
      if (current === "welcome") return "draw";
      if (current === "draw") return "export";
      return current;
    });
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => {
      if (current === "export") return "draw";
      if (current === "draw") return "welcome";
      return current;
    });
  }, []);

  const setPlayersPerTeam = useCallback((count: number) => {
    setConfig((prev) => ({ ...prev, playersPerTeam: count }));
  }, []);

  const setPlayerNames = useCallback((names: string[]) => {
    setConfig((prev) => ({
      ...prev,
      players: names.map((name, i) => ({
        id: `player-${i}`,
        name,
        teamId: null,
      })),
    }));
  }, []);

  const drawTeams = useCallback(() => {
    setConfig((prev) => {
      const shuffled = [...prev.players].sort(() => Math.random() - 0.5);
      const playersWithTeams: Player[] = shuffled.map((player, i) => ({
        ...player,
        teamId: prev.teams[i % prev.teams.length].id,
      }));
      return { ...prev, players: playersWithTeams };
    });
  }, []);

  const reset = useCallback(() => {
    setConfig(createEmptyConfig());
    setStep("welcome");
  }, []);

  return {
    step,
    config,
    goNext,
    goBack,
    setPlayersPerTeam,
    setPlayerNames,
    drawTeams,
    reset,
  };
}
