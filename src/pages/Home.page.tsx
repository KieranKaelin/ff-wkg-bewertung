import { Stack, Text, Title } from "@mantine/core";
import { Settings } from "@/components/Settings/Settings";
import { Navigation } from "@/components/Navigation/Navigation";
import { useSettingsStore } from "@/store/settings";
import { LocationPicker } from "@/components/LocationPicker/LocationPicker";
import { Evaluation } from "@/components/Evaluation/Evaluation";
import { EvaluationCard } from "@/components/EvaluationCard/EvaluationCard";
import classes from "@/components/LocationPicker/LocationPicker.module.css";
import { useTranslation } from "react-i18next";

export function HomePage() {
  const { t } = useTranslation();

  const settings = useSettingsStore((store) => store.settings);
  const location = useSettingsStore((store) => store.location);

  return (
    <Stack m={16}>
      {!settings ? (
        <Stack>
          <Title order={2} className={classes.title} ta="center" mt="sm">
            {t("title")}
          </Title>
          <Text c="dimmed" className={classes.description} ta="center" mt="md">
            {t("settings.initial_setting")}
          </Text>
          <Settings />
        </Stack>
      ) : !location ? (
        <LocationPicker />
      ) : (
        <Stack>
          <Navigation />
          {location === "settings" ? (
            <Settings />
          ) : (
            <>
              <Evaluation variant={location} />
              <EvaluationCard variant={location} />
            </>
          )}
        </Stack>
      )}
    </Stack>
  );
}
