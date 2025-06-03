import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { YOUTH_VALUES } from "@/store/values.youth";

export interface State {
  startNumber: number;
  groupName: string;
  category: "bronze" | "silver";
  withEvaluation: boolean;
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
  reset: () => void;
};

const initialState = (): State => ({
  startNumber: 1,
  groupName: "Steinbrunn 1",
  category: "bronze",
  withEvaluation: true,
  elapsedTime: 62.85,
  errors: YOUTH_VALUES.map((v) => ({ ...v, occurrences: 0 })),
});

export const useStore = create<State & Actions>()(
  devtools(
    persist(
      (set) => ({
        ...initialState(),
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
        reset: () => set(() => initialState()),
      }),
      {
        name: "store",
      },
    ),
  ),
);
