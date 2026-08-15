import { useState, useCallback } from "react";
import type { WizardStep, DraftConfig, Player, Team } from "../draft.types";
import {
  DEFAULT_TEAM_COUNT,
  DEFAULT_PLAYERS_PER_TEAM,
  TEAM_COLOR_PALETTE,
} from "../draft.constants";

const buildTeams = (count: number): Team[] =>
  Array.from({ length: count }, (_, i) => ({
    id: `team-${i}`,
    name: `Equipo ${String.fromCharCode(65 + i)}`,
    color: TEAM_COLOR_PALETTE[i % TEAM_COLOR_PALETTE.length],
  }));

const createEmptyConfig = (): DraftConfig => ({
  teamCount: DEFAULT_TEAM_COUNT,
  playersPerTeam: DEFAULT_PLAYERS_PER_TEAM,
  teams: buildTeams(DEFAULT_TEAM_COUNT),
  players: [],
});

export function useDraftWizard() {
  const [step, setStep] = useState<WizardStep>("welcome");
  const [config, setConfig] = useState<DraftConfig>(createEmptyConfig());

  const goNext = useCallback(() => {
    setStep((current) => {
      if (current === "welcome") return "setup";
      if (current === "setup") return "draw";
      if (current === "draw") return "export";
      return current;
    });
  }, []);

  const goBack = useCallback(() => {
    setStep((current) => {
      if (current === "export") return "draw";
      if (current === "draw") return "setup";
      if (current === "setup") return "welcome";
      return current;
    });
  }, []);

  const setTeamCount = useCallback((count: number) => {
    setConfig((prev) => ({
      ...prev,
      teamCount: count,
      teams: buildTeams(count),
    }));
  }, []);

  const setPlayersPerTeam = useCallback((count: number) => {
    setConfig((prev) => ({ ...prev, playersPerTeam: count }));
  }, []);

  const addPlayer = useCallback((name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return;

    setConfig((prev) => ({
      ...prev,
      players: [
        ...prev.players,
        {
          id: `player-${Date.now()}-${prev.players.length}`,
          name: trimmed,
          teamId: null,
          isGoalkeeper: false,
        },
      ],
    }));
  }, []);

  const removePlayer = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      players: prev.players.filter((player) => player.id !== id),
    }));
  }, []);

  const toggleGoalkeeper = useCallback((id: string) => {
    setConfig((prev) => ({
      ...prev,
      players: prev.players.map((player) =>
        player.id === id
          ? { ...player, isGoalkeeper: !player.isGoalkeeper }
          : player,
      ),
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
    setTeamCount,
    setPlayersPerTeam,
    addPlayer,
    removePlayer,
    toggleGoalkeeper,
    drawTeams,
    reset,
  };
}
