import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const PROTECTED =
  '{"data":"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","iv":"XttEX5HRn6WApvLj+E0dlg==","keyMetadata":{"algorithm":"PBKDF2","params":{"iterations":900000}},"salt":"vKhixRyCDj35XAwfr4Y9yYrQvnXUgEPxn+FwM7BDYbo="}';

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
