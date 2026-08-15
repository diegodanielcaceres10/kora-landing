export type WizardStep = "welcome" | "setup" | "draw" | "export";

export type SetupSubStep = "teams" | "playersPerTeam" | "players";

export type TeamColor = "gold" | "coral" | "sky" | "violet";

export interface Player {
  id: string;
  name: string;
  teamId: string | null;
  isGoalkeeper: boolean;
}

export interface Team {
  id: string;
  name: string;
  color: TeamColor;
}

export interface DraftConfig {
  teamCount: number;
  playersPerTeam: number;
  teams: Team[];
  players: Player[];
}
