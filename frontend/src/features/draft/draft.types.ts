export type WizardStep = "welcome" | "draw" | "export";

export interface Player {
  id: string;
  name: string;
  teamId: string | null;
}

export interface Team {
  id: string;
  name: string;
  color: "gold" | "coral";
}

export interface DraftConfig {
  teamCount: number;
  playersPerTeam: number;
  teams: Team[];
  players: Player[];
}
