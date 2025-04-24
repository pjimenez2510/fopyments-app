const BASE_KEY = "goals";
export const GOALS_KEYS = {
  GOALS: [BASE_KEY],
  GOAL: (id: string) => [BASE_KEY, id],
  GOAL_USERS: (id: string) => [BASE_KEY, id, "users"],
  SHARED_GOAL_USERS: (id: string) => [BASE_KEY, "shared", id, "users"],
};
