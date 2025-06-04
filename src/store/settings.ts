import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type State = {
  settings:
    | {
        evaluator: string;
        serviceAccount: string;
        privateKey: string;
        sheetId: string;
      }
    | undefined;
  location: "settings" | "obstacle" | "relay" | undefined;
};
type Actions = {
  set: (settings: State["settings"]) => void;
  setLocation: (location: "obstacle" | "relay" | "settings") => void;
};

export const useSettingsStore = create<State & Actions>()(
  persist(
    (set) => ({
      settings: undefined,
      location: undefined,
      set: (settings) => set({ settings }),
      setLocation: (location) => set({ location }),
    }),
    {
      name: "settings-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
