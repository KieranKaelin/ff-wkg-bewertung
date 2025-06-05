import { getSheetsAccessToken } from "@/sheets/access-token";
import { z } from "zod/v4";
import { useSettingsStore } from "@/store/settings";
import { SHEET_AREAS } from "@/sheets/const";

const TeamsType = z.object({
  values: z.array(z.tuple([z.coerce.number().int()])).optional(),
});

export const getFinishedTeams = async () => {
  const settings = useSettingsStore.getState().settings!;
  const location = useSettingsStore.getState().location!;

  const accessToken = await getSheetsAccessToken();

  const sheet =
    location === "obstacle"
      ? SHEET_AREAS.obstacleStartNumbers
      : SHEET_AREAS.relayStartNumbers;

  const result = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${settings.sheetId}/values/${sheet}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    },
  ).then((response) => response.json());

  const teams = TeamsType.safeParse(result);

  if (!teams.success) {
    console.error(result);
    throw new Error(`failed to parse teams: ${teams.error.message}`);
  }

  return teams.data.values?.map(([startNumber]) => startNumber) || [];
};
