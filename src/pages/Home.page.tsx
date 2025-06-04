import { Stack } from "@mantine/core";
import { Settings } from "@/components/Settings/Settings";
import { Navigation } from "@/components/Navigation/Navigation";
import { useSettingsStore } from "@/store/settings";
import { LocationPicker } from "@/components/LocationPicker/LocationPicker";
import { Evaluation } from "@/components/Evaluation/Evaluation";
import { EvaluationCard } from "@/components/EvaluationCard/EvaluationCard";

export function HomePage() {
  const settings = useSettingsStore((store) => store.settings);
  const location = useSettingsStore((store) => store.location);

  return (
    <Stack m={16}>
      {!settings ? (
        <Settings />
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
