import { getSheetsAccessToken } from "@/sheets/access-token";
import { useStore } from "@/store";
import { useSettingsStore } from "@/store/settings";
import { SHEET_AREAS } from "@/sheets/const";

export const postEvaluation = async () => {
  const { settings, location } = useSettingsStore.getState();
  const store = useStore.getState();

  const accessToken = await getSheetsAccessToken();

  const sheet =
    location === "obstacle" ? SHEET_AREAS.obstacleAll : SHEET_AREAS.relayAll;
  await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${settings!.sheetId}/values/${sheet}:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        range: sheet,
        values: [
          [
            store.team?.startNumber,
            store.team?.groupName,
            store.team?.category,
            store.elapsedTime,
            store.errors.reduce(
              (acc, cur) => acc + cur.occurrences * cur.points,
              0,
            ),
            settings!.evaluator,
            ...store.errors.map((e) => e.occurrences * e.points),
            new Date().toISOString(),
          ],
        ],
      }),
    },
  );
};
