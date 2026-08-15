import type { TeamColor } from "./draft.types";

export const MIN_TEAMS = 2;
export const MAX_TEAMS = 8;
export const DEFAULT_TEAM_COUNT = 2;
export const TEAM_COUNT_OPTIONS = [2, 3, 4, 6];

export const MIN_PLAYERS_PER_TEAM = 3;
export const MAX_PLAYERS_PER_TEAM = 11;
export const DEFAULT_PLAYERS_PER_TEAM = 5;
export const PLAYERS_PER_TEAM_OPTIONS = [5, 6, 7, 8, 11];

export const TEAM_COLOR_PALETTE: TeamColor[] = [
  "gold",
  "coral",
  "sky",
  "violet",
];
