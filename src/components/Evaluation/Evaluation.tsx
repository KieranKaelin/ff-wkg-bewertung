import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";
import { getTeams, Teams } from "@/sheets/get-teams";
import {
  Group,
  Loader,
  Select,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBuildingTunnel, IconCheck, IconRun } from "@tabler/icons-react";
import { useStore } from "@/store";
import { getFinishedTeams } from "@/sheets/get-finished-teams";

export function Evaluation(props: { variant: "obstacle" | "relay" }) {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const [teams, setTeams] = useState<Teams | undefined>(undefined);

  const reset = useStore((store) => store.reset);
  const selectedTeam = useStore((store) => store.team);
  const setSelectedTeam = useStore((store) => store.setTeam);

  useEffect(() => {
    if (selectedTeam === undefined) {
      (async () => {
        setTeams(undefined);
        reset(props.variant);
        const [teams, finishedTeams] = await Promise.all([
          getTeams(),
          getFinishedTeams(),
        ]);

        setTeams(
          teams.filter((team) => !finishedTeams.includes(team.startNumber)),
        );
      })();
    }
  }, [props.variant, selectedTeam]);

  const onChange = useCallback(
    (startNumber: string | null) => {
      setSelectedTeam(
        teams?.find((team) => team.startNumber.toString() === startNumber),
      );
    },
    [teams, setSelectedTeam],
  );

  return (
    <Stack>
      <Select
        size="lg"
        disabled={!teams}
        rightSection={!teams ? <Loader size={18} /> : null}
        leftSection={
          props.variant === "obstacle" ? (
            <IconBuildingTunnel color={theme.colors.red[6]} />
          ) : (
            <IconRun color={theme.colors.red[6]} />
          )
        }
        label={t("evaluation_card.choose_team.label")}
        placeholder={t("evaluation_card.choose_team.placeholder")}
        value={selectedTeam?.startNumber.toString() ?? null}
        data={teams?.map((team) => ({
          value: team.startNumber.toString(),
          label: `${team.startNumber}. ${team.groupName} (${team.category})`,
          groupName: team.groupName,
          category: team.category,
        }))}
        renderOption={({ option, checked }) => (
          <Group flex="1" gap="xs">
            <Text c="dimmed" ta="right" w={20}>
              {option.value}.
            </Text>
            <Text>
              {(option as unknown as Teams[number]).groupName} (
              {(option as unknown as Teams[number]).category})
            </Text>
            {checked && <IconCheck style={{ marginInlineStart: "auto" }} />}
          </Group>
        )}
        onChange={onChange}
        searchable
      />
    </Stack>
  );
}
