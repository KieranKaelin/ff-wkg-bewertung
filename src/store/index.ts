import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { VALUES_OBSTACLE } from "@/store/values.obstacle";
import { Teams } from "@/sheets/get-teams";
import { VALUES_RELAY } from "@/store/values.relay";

export interface State {
  team: Teams[number] | undefined;
  elapsedTime: number;
  errors: {
    key: string;
    points: number;
    occurrences: number;
    i18n: string;
  }[];
}

type Actions = {
  addError: (key: string) => void;
  subError: (key: string) => void;
  setTime: (time: number) => void;
  setTeam: (team: Teams[number] | undefined) => void;
  reset: (location: "obstacle" | "relay") => void;
};

const initialState = (location: "obstacle" | "relay"): State => ({
  team: undefined,
  elapsedTime: 0,
  errors: (location === "obstacle" ? VALUES_OBSTACLE : VALUES_RELAY).map(
    (v) => ({ ...v, occurrences: 0 }),
  ),
});

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState("obstacle"),
        addError: (key) =>
          set(({ errors }) => ({
            errors: errors.map((e) => {
              if (e.key === key) {
                e.occurrences += 1;
              }
              return e;
            }),
          })),
        subError: (key) =>
          set(({ errors }) => ({
            errors: errors.map((e) => {
              if (e.key === key) {
                e.occurrences = Math.max(e.occurrences - 1, 0);
              }
              return e;
            }),
          })),
        setTime: (time) => set(() => ({ elapsedTime: time })),
        setTeam: (team) => set(() => ({ team })),
        reset: (location) => set(() => initialState(location)),
      }),
      {
        name: "store",
      },
    ),
  ),
);
