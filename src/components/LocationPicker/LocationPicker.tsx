import {
  Card,
  Center,
  Container,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useSettingsStore } from "@/store/settings";
import { IconBuildingTunnel, IconRun } from "@tabler/icons-react";
import classes from "./LocationPicker.module.css";

export function LocationPicker() {
  const { t } = useTranslation();
  const theme = useMantineTheme();

  const setLocation = useSettingsStore((store) => store.setLocation);

  return (
    <Container size="lg" py="xl">
      <Title order={2} className={classes.title} ta="center" mt="sm">
        {t("navigation.choose")}
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        {t("navigation.change_hint")}
      </Text>

      <Flex align="center" justify="center" wrap="wrap" gap="md" mt={50}>
        <Card
          shadow="md"
          radius="md"
          padding="xl"
          w={300}
          className={classes.card}
          onClick={() => setLocation("obstacle")}
        >
          <Center>
            <IconBuildingTunnel
              size={50}
              stroke={1.5}
              color={theme.colors.red[7]}
            />
            <Text fz="lg">{t("navigation.obstacle")}</Text>
          </Center>
        </Card>
        <Card
          shadow="md"
          radius="md"
          padding="xl"
          w={300}
          className={classes.card}
          onClick={() => setLocation("relay")}
        >
          <Center>
            <IconRun size={50} stroke={1.5} color={theme.colors.red[7]} />
            <Text fz="lg">{t("navigation.relay")}</Text>
          </Center>
        </Card>
      </Flex>
    </Container>
  );
}
