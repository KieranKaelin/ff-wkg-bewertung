import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Stack,
  Switch,
  Textarea,
  TextInput,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useForm } from "@mantine/form";
import { useSettingsStore } from "@/store/settings";
import { t } from "i18next";
import { IconMoonStars, IconQrcode, IconSun } from "@tabler/icons-react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useDisclosure } from "@mantine/hooks";

const validate = (value: string) =>
  /.+/.test(value.trim()) ? null : t("settings.errors.empty");

export function Settings() {
  const { t } = useTranslation();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const [scanning, { open, close }] = useDisclosure(false);

  const settings = useSettingsStore((store) => store.settings);
  const setSettings = useSettingsStore((store) => store.set);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      evaluator: settings?.evaluator || "",
      serviceAccount: settings?.serviceAccount || "",
      privateKey: settings?.privateKey || "",
      sheetId: settings?.sheetId || "",
    },
    validate: {
      evaluator: validate,
      serviceAccount: validate,
      privateKey: validate,
      sheetId: validate,
    },
  });

  const handleSubmit = useCallback((values: typeof form.values) => {
    setSettings({
      evaluator: values.evaluator.trim(),
      serviceAccount: values.serviceAccount.trim(),
      privateKey: values.privateKey.trim(),
      sheetId: values.sheetId.trim(),
    });
  }, []);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Group justify="space-between">
          <Switch
            color="red"
            labelPosition="left"
            checked={computedColorScheme === "light"}
            onChange={() =>
              setColorScheme(computedColorScheme === "light" ? "dark" : "light")
            }
            label={t("settings.theme")}
            onLabel={
              <IconSun
                size={16}
                stroke={2.5}
                color="var(--mantine-color-yellow-4)"
              />
            }
            offLabel={
              <IconMoonStars
                size={16}
                stroke={2.5}
                color="var(--mantine-color-blue-6)"
              />
            }
          />
          <ActionIcon
            variant="gradient"
            size="xl"
            gradient={{ from: "red", to: "orange" }}
            onClick={open}
          >
            <IconQrcode />
          </ActionIcon>
          <Modal opened={scanning} onClose={close} title={t("settings.scan")}>
            <Scanner
              onScan={(result) => {
                const values = JSON.parse((result as any).rawValue);
                form.getInputProps("serviceAccount").onChange({
                  currentTarget: { value: values.serviceAccount },
                });
                form.getInputProps("sheetId").onChange({
                  currentTarget: { value: values.sheetId },
                });
                form.getInputProps("privateKey").onChange({
                  currentTarget: { value: values.privateKey },
                });
              }}
            />
          </Modal>
        </Group>
        <TextInput
          label={t("settings.evaluator.label")}
          placeholder={t("settings.evaluator.placeholder")}
          description={t("settings.evaluator.description")}
          withAsterisk
          key={form.key("evaluator")}
          {...form.getInputProps("evaluator")}
        />
        <TextInput
          label={t("settings.service_account.label")}
          placeholder={t("settings.service_account.placeholder")}
          description={t("settings.service_account.description")}
          withAsterisk
          key={form.key("serviceAccount")}
          {...form.getInputProps("serviceAccount")}
        />
        <TextInput
          label={t("settings.sheet_id.label")}
          placeholder={t("settings.sheet_id.placeholder")}
          description={t("settings.sheet_id.description")}
          withAsterisk
          key={form.key("sheetId")}
          {...form.getInputProps("sheetId")}
        />
        <Textarea
          label={t("settings.private_key.label")}
          placeholder={t("settings.private_key.placeholder")}
          description={t("settings.private_key.description")}
          withAsterisk
          autosize
          key={form.key("privateKey")}
          {...form.getInputProps("privateKey")}
        />

        <Group justify="flex-end" mt="md">
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "red", to: "orange" }}
            type="submit"
          >
            {t("settings.save")}
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
