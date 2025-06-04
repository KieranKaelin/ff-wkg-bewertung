import { getSheetsAccessToken } from "@/sheets/access-token";
import { z } from "zod/v4";
import { useSettingsStore } from "@/store/settings";

const GOOGLE_SHEETS_PAGE = "Gruppen!A2:C1000";

const TeamsType = z.object({
  values: z.array(z.tuple([z.coerce.number().int(), z.string(), z.string()])),
});

export type Teams = Awaited<ReturnType<typeof getTeams>>;
export const getTeams = async () => {
  const settings = useSettingsStore.getState().settings!;

  const accessToken = await getSheetsAccessToken();

  const result = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${settings.sheetId}/values/${GOOGLE_SHEETS_PAGE}`,
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

  return teams.data.values.map(([startNumber, groupName, category]) => ({
    startNumber,
    groupName,
    category,
  }));
};
