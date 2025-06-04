import { State } from "@/store";

export const VALUES_RELAY = [
  {
    key: "error_at_obstacle",
    points: 10,
    i18n: "evaluation_card.youth.error_at_obstacle",
  },
  {
    key: "twisting_of_hose",
    points: 5,
    i18n: "evaluation_card.youth.twisting_of_hose",
  },
] as const satisfies Omit<State["errors"][number], "occurrences">[];
