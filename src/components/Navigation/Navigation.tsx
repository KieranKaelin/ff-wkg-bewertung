import { Center, SegmentedControl } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { IconBuildingTunnel, IconRun, IconSettings } from "@tabler/icons-react";
import { useSettingsStore } from "@/store/settings";
import classes from "./Navigation.module.css";

export function Navigation() {
  const { t } = useTranslation();

  const setLocation = useSettingsStore((store) => store.setLocation);

  return (
    <SegmentedControl
      fullWidth
      data={[
        {
          value: "obstacle",
          label: (
            <Center style={{ gap: 10 }}>
              <IconBuildingTunnel size={16} />
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
              <IconSettings size={16} />
              <span>{t("navigation.settings")}</span>
            </Center>
          ),
        },
      ]}
      onChange={(value) => setLocation(value as any)}
      classNames={classes}
    />
  );
}
