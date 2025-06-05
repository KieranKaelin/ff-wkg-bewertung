export const SHEETS = {
  obstacle: "Hindernis",
  relay: "Staffel",
  teams: "Gruppen",
};

export const SHEET_AREAS = {
  obstacleAll: `${SHEETS.obstacle}!A2`,
  obstacleStartNumbers: `${SHEETS.obstacle}!B2:B1000`,

  relayAll: `${SHEETS.relay}!A2`,
  relayStartNumbers: `${SHEETS.relay}!B2:B1000`,

  teams: `${SHEETS.teams}!A2:C1000`,
};
