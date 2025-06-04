import { getSheetsAccessToken } from "@/sheets/access-token";
import { useStore } from "@/store";
import { LocalStorage } from "@/store/localStorage";

export const GOOGLE_SHEETS_PAGE = "Sheet1!A2";

export const postEvaluation = async () => {
  const settings = LocalStorage.get();
  if (!settings) {
    throw new Error("settings is not defined");
  }

  const accessToken = await getSheetsAccessToken();

  const store = useStore.getState();

  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${settings.sheetId}/values/${GOOGLE_SHEETS_PAGE}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        range: "Sheet1!A2",
        values: [
          [
            store.groupName,
            store.startNumber,
            store.category,
            store.withEvaluation,
            store.elapsedTime,
            ...store.errors.map((e) => e.occurrences * e.points),
          ],
        ],
      }),
    },
  );
};
