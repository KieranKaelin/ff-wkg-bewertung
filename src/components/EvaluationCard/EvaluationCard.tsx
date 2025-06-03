import {
  Button,
  Center,
  Grid,
  Group,
  Modal,
  NumberFormatter,
  Stack,
  Text,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";

export function EvaluationCard() {
  const { t } = useTranslation();

  const startNumber = useStore((state) => state.startNumber);
  const groupName = useStore((state) => state.groupName);
  const category = useStore((state) => state.category);
  const withEvaluation = useStore((state) => state.withEvaluation);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const errors = useStore((state) => state.errors);
  const addError = useStore((state) => state.addError);
  const subError = useStore((state) => state.subError);
  const reset = useStore((state) => state.reset);

  const [opened, { open, close }] = useDisclosure(false);

  const totalErrorPoints = errors.reduce(
    (acc, cur) => acc + cur.occurrences * cur.points,
    0,
  );

  const items = errors.map((error, i) => (
    <>
      <Grid.Col span={6}>
        <Stack gap={0}>
          <Text>
            {i + 1}. {t(error.i18n as any)}
          </Text>
          <Text size="xs" c="dimmed">
            {t("evaluation_card.per_occurrence")} {error.points}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={4}>
        <Group justify="end">
          <Button.Group>
            <Button
              variant="default"
              onClick={() => subError(error.key)}
              disabled={error.occurrences === 0}
            >
              <IconMinus />
            </Button>
            <Button.GroupSection
              visibleFrom="xs"
              variant="default"
              bg="var(--mantine-color-body)"
              miw="80"
            >
              {error.occurrences}
            </Button.GroupSection>
            <Button variant="default" onClick={() => addError(error.key)}>
              <IconPlus />
            </Button>
          </Button.Group>
        </Group>
      </Grid.Col>
      <Grid.Col span={2}>
        <Center>
          <Text>{error.occurrences * error.points}</Text>
        </Center>
      </Grid.Col>
    </>
  ));

  return (
    <Stack>
      <Grid m={16} justify="center" align="center">
        <Grid.Col span={6}>{t("evaluation_card.elapsed_time")}</Grid.Col>
        <Grid.Col span={2} offset={4}>
          <Center>
            <NumberFormatter suffix="s" value={elapsedTime} />
          </Center>
        </Grid.Col>

        <Grid.Col span={6}>{t("evaluation_card.error_points")}</Grid.Col>
        <Grid.Col span={2} offset={4}>
          <Center>
            <Text>{t("evaluation_card.sum")}</Text>
          </Center>
        </Grid.Col>

        {items}

        <Grid.Col span={6}>{t("evaluation_card.error_points")}</Grid.Col>
        <Grid.Col span={2} offset={4}>
          <Center>
            <Text>{totalErrorPoints}</Text>
          </Center>
        </Grid.Col>

        <Grid.Col span={6}>{t("evaluation_card.total_points")}</Grid.Col>
        <Grid.Col span={2} offset={4}>
          <Center>
            <NumberFormatter value={62.86} />
          </Center>
        </Grid.Col>
      </Grid>

      <Group m={16}>
        <Modal
          opened={opened}
          onClose={() => {
            close();
            reset();
          }}
          title="Excel / Google Sheet Eintrag"
        >
          <Text>
            {groupName};Nr.{startNumber};{category};
            {withEvaluation ? "mit Wertung" : "ohne Wertung"};{elapsedTime}{" "}
            Sekunden;{totalErrorPoints} Fehlerpunkte
          </Text>
        </Modal>

        <Button
          fullWidth
          variant="gradient"
          gradient={{ from: "red", to: "orange", deg: 90 }}
          onClick={open}
        >
          {t("evaluation_card.send")}
        </Button>
      </Group>
    </Stack>
  );
}
