import { Center, SegmentedControl } from "@mantine/core";
import { useTranslation } from "react-i18next";
import {
  IconBuildingBridge2,
  IconRun,
  IconSettings,
} from "@tabler/icons-react";
import { useSettingsStore } from "@/store/settings";
import classes from "./Navigation.module.css";

export function Navigation() {
  const { t } = useTranslation();

  const location = useSettingsStore((store) => store.location);
  const setLocation = useSettingsStore((store) => store.setLocation);

  return (
    <SegmentedControl
      value={location}
      fullWidth
      data={[
        {
          value: "obstacle",
          label: (
            <Center style={{ gap: 10 }}>
              <IconBuildingBridge2 size={16} />
              <span>{t("navigation.obstacle")}</span>
            </Center>
          ),
        },
        {
          value: "relay",
          label: (
            <Center style={{ gap: 10 }}>
              <IconRun size={16} />
              <span>{t("navigation.relay")}</span>
            </Center>
          ),
        },
        {
          value: "settings",
          label: (
            <Center style={{ gap: 10 }}>
              <span>&nbsp;</span>
              <IconSettings size={16} />
              <span>&nbsp;</span>
            </Center>
          ),
        },
      ]}
      onChange={(value) => setLocation(value as any)}
      classNames={classes}
    />
  );
}
