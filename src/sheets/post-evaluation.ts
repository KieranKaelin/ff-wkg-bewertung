import { getSheetsAccessToken } from "@/sheets/access-token";
import { useStore } from "@/store";
import { useSettingsStore } from "@/store/settings";

export const GOOGLE_SHEETS_PAGE = "Sheet1!A2";

export const postEvaluation = async () => {
  const settings = useSettingsStore.getState().settings!;
  const store = useStore.getState();

  const accessToken = await getSheetsAccessToken();

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
            settings.evaluator,
            store.team?.startNumber,
            store.team?.groupName,
            store.team?.category,
            store.elapsedTime,
            store.errors.reduce(
              (acc, cur) => acc + cur.occurrences * cur.points,
              0,
            ),
            ...store.errors.map((e) => e.occurrences * e.points),
            new Date().toISOString(),
          ],
        ],
      }),
    },
  );
};
