import { State } from "@/store";

export const VALUES_OBSTACLE = [
  {
    key: "error_at_obstacle",
    points: 10,
    i18n: "evaluation_card.obstacle.error_at_obstacle",
  },
  {
    key: "twisting_of_hose",
    points: 5,
    i18n: "evaluation_card.obstacle.twisting_of_hose",
  },
  {
    key: "open_coupling_pair",
    points: 20,
    i18n: "evaluation_card.obstacle.open_coupling_pair",
  },
  {
    key: "incorrect_laying_of_c_hose",
    points: 10,
    i18n: "evaluation_card.obstacle.incorrect_laying_of_c_hose",
  },
  {
    key: "device_left_or_lost",
    points: 5,
    i18n: "evaluation_card.obstacle.device_left_or_lost",
  },
  {
    key: "device_incorrectly_placed",
    points: 10,
    i18n: "evaluation_card.obstacle.device_incorrectly_placed",
  },
  {
    key: "incorrect_knot",
    points: 10,
    i18n: "evaluation_card.obstacle.incorrect_knot",
  },
  {
    key: "incorrect_work",
    points: 10,
    i18n: "evaluation_card.obstacle.incorrect_work",
  },
  {
    key: "speaking_while_working",
    points: 10,
    i18n: "evaluation_card.obstacle.speaking_while_working",
  },
] as const satisfies Omit<State["errors"][number], "occurrences">[];
