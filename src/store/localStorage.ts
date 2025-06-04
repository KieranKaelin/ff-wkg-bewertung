type SettingsType = {
  evaluator: string;
  serviceAccount: string;
  privateKey: string;
  sheetId: string;
};

const key = "FLJA_BEWERTUNG_SETTINGS";

const get = (): SettingsType | null =>
  JSON.parse(localStorage.getItem(key) ?? "null");
const set = (settings: SettingsType): void =>
  localStorage.setItem(key, JSON.stringify(settings));

export const LocalStorage = { get, set };
