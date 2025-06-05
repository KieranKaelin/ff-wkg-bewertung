import { State } from "@/store";

export const VALUES_RELAY = [
  {
    key: "open_coupling_pair",
    points: 10,
    i18n: "evaluation_card.relay.open_coupling_pair",
  },
  {
    key: "illegal_obstacle_or_exercise",
    points: 10,
    i18n: "evaluation_card.relay.illegal_obstacle_or_exercise",
  },
  {
    key: "stafette_not_in_goal",
    points: 20,
    i18n: "evaluation_card.relay.stafette_not_in_goal",
  },
] as const satisfies Omit<State["errors"][number], "occurrences">[];
