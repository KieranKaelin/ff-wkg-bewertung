import { EvaluationCard } from "@/components/EvaluationCard/EvaluationCard";
import { Select, Stack } from "@mantine/core";
import { useEffect, useState } from "react";
import { getTeams, Teams } from "@/sheets/get-teams";
import { useTranslation } from "react-i18next";
import { Settings } from "@/components/Settings/Settings";

export function HomePage() {
  const { t } = useTranslation();

  const [teams, setTeams] = useState<Teams | null>(null);
  const [currentTeam, setCurrentTeam] = useState<string | null>(null);

  useEffect(() => {
    getTeams().then(setTeams);
  }, []);

  return (
    <Stack m={16}>
      <Settings />
      <Select
        label={t("teams.select_label")}
        placeholder="Pick value"
        onChange={(_value, option) => setCurrentTeam(option.value)}
        data={teams ? teams.map(({ groupName }) => groupName) : []}
      />
      {currentTeam}
      <EvaluationCard />
    </Stack>
  );
}
