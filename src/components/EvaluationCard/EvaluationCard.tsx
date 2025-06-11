import {
  Button,
  Center,
  Divider,
  Grid,
  Group,
  Modal,
  NumberFormatter,
  NumberInput,
  Paper,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
  Transition,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useStore } from "@/store";
import {
  IconBuildingBridge2,
  IconMinus,
  IconPlus,
  IconRun,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import { postEvaluation } from "@/sheets/post-evaluation";
import { useState } from "react";
import classes from "./EvaluationCard.module.css";

export function EvaluationCard(props: { variant: "obstacle" | "relay" }) {
  const { t } = useTranslation();

  const [timeError, setTimeError] = useState<boolean>(false);
  const [sending, setSending] = useState<boolean>(false);

  const team = useStore((state) => state.team);
  const errors = useStore((state) => state.errors);
  const addError = useStore((state) => state.addError);
  const subError = useStore((state) => state.subError);
  const elapsedTime = useStore((state) => state.elapsedTime);
  const setElapsedTime = useStore((state) => state.setTime);
  const comment = useStore((state) => state.comment);
  const setComment = useStore((state) => state.setComment);
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
    <Transition
      mounted={!!team}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(styles) => (
        <div style={styles}>
          <Stack>
            <Grid m={16} justify="center" align="center">
              <Grid.Col span={6}>{t("evaluation_card.error_points")}</Grid.Col>
              <Grid.Col span={2} offset={4}>
                <Center>
                  <Text>{t("evaluation_card.sum")}</Text>
                </Center>
              </Grid.Col>

              {items}

              <Divider
                my="sm"
                style={{ width: "100%", marginLeft: "8px", marginRight: "8px" }}
              />

              <Grid.Col span={6}>
                <Text size="lg">{t("evaluation_card.error_points")}</Text>
              </Grid.Col>
              <Grid.Col span={2} offset={4}>
                <Center>
                  <Text size="lg">{totalErrorPoints}</Text>
                </Center>
              </Grid.Col>

              <Grid.Col span={6}>
                <Text size="lg">{t("evaluation_card.elapsed_time")}</Text>
              </Grid.Col>
              <Grid.Col span={6}>
                <NumberInput
                  size="lg"
                  suffix="s"
                  value={elapsedTime}
                  decimalScale={2}
                  allowNegative={false}
                  onChange={(value) => {
                    setElapsedTime(Number.parseFloat(value.toString()));
                    setTimeError(false);
                  }}
                  error={timeError ? t("settings.errors.empty") : undefined}
                  onKeyDown={(key) => {
                    if (key.key === "Enter" && elapsedTime) {
                      open();
                    }
                  }}
                />
              </Grid.Col>
            </Grid>

            <Group m={16}>
              <Modal
                opened={opened}
                onClose={() => close()}
                title={t("evaluation_card.confirm_modal.title")}
                centered
              >
                <Stack>
                  <Paper
                    radius="md"
                    withBorder
                    className={classes.card}
                    mt={20}
                  >
                    <ThemeIcon
                      variant="gradient"
                      gradient={{ from: "red", to: "orange", deg: 90 }}
                      className={classes.icon}
                      size={60}
                      radius={60}
                    >
                      {props.variant === "obstacle" ? (
                        <IconBuildingBridge2 size={32} stroke={1.5} />
                      ) : (
                        <IconRun size={32} stroke={1.5} />
                      )}
                    </ThemeIcon>

                    <Text ta="center" fw={700} className={classes.title}>
                      {team?.startNumber}. {team?.groupName}
                    </Text>
                    <Text c="dimmed" ta="center" fz="sm">
                      {t(`evaluation_card.categories.${team?.category}` as any)}
                    </Text>

                    <Group justify="space-between" mt="xs">
                      <Text fz="sm">{t("evaluation_card.error_points")}</Text>
                      <Text fz="sm">
                        <b>{totalErrorPoints}</b>
                      </Text>
                    </Group>
                    <Group justify="space-between" mt="xs">
                      <Text fz="sm">{t("evaluation_card.elapsed_time")}</Text>
                      <Text fz="sm">
                        <b>
                          <NumberFormatter
                            value={elapsedTime}
                            suffix="s"
                            decimalScale={2}
                            fixedDecimalScale
                          />
                        </b>
                      </Text>
                    </Group>
                  </Paper>
                  <Textarea
                    autosize
                    value={comment}
                    onChange={(event) => setComment(event.currentTarget.value)}
                    label={t("evaluation_card.confirm_modal.comment.label")}
                    placeholder={t(
                      "evaluation_card.confirm_modal.comment.placeholder",
                    )}
                  />
                  <Group justify="space-between">
                    <Button
                      size="lg"
                      gradient={{ from: "red", to: "orange", deg: 90 }}
                      onClick={() => {
                        close();
                      }}
                    >
                      {t("evaluation_card.confirm_modal.cancel")}
                    </Button>
                    <Button
                      size="lg"
                      variant="gradient"
                      gradient={{ from: "red", to: "orange", deg: 90 }}
                      disabled={sending}
                      loading={sending}
                      onClick={() => {
                        setSending(true);
                        postEvaluation().then(() => {
                          close();
                          reset(props.variant);
                          setSending(false);
                        });
                      }}
                    >
                      {t("evaluation_card.confirm_modal.confirm")}
                    </Button>
                  </Group>
                </Stack>
              </Modal>

              <Button
                size="lg"
                fullWidth
                variant="gradient"
                gradient={{ from: "red", to: "orange", deg: 90 }}
                onClick={() => {
                  if (elapsedTime) {
                    open();
                  } else {
                    setTimeError(true);
                  }
                }}
              >
                {t("evaluation_card.send")}
              </Button>
            </Group>
          </Stack>
        </div>
      )}
    </Transition>
  );
}
