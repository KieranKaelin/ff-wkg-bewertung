import {
  Button,
  Group,
  Stack,
  Switch,
  TextInput,
  useComputedColorScheme,
  useMantineColorScheme,
} from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { useForm } from "@mantine/form";
import { PROTECTED, useSettingsStore } from "@/store/settings";
import { t } from "i18next";
import { IconKey, IconMoonStars, IconSun, IconUser } from "@tabler/icons-react";
import { decrypt } from "@metamask/browser-passworder";

const validate = (value: string) =>
  /.+/.test(value.trim()) ? null : t("settings.errors.empty");

export function Settings() {
  const { t } = useTranslation();

  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme("light", {
    getInitialValueInEffect: true,
  });

  const settings = useSettingsStore((store) => store.settings);
  const setSettings = useSettingsStore((store) => store.set);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: { evaluator: settings?.evaluator || "", password: "" },
    validate: { evaluator: validate, password: validate },
  });

  const handleSubmit = useCallback(
    (values: typeof form.values) =>
      decrypt(values.password, PROTECTED)
        .then((data: any) =>
          setSettings({
            evaluator: values.evaluator.trim(),
            serviceAccount: data.serviceAccount,
            privateKey: data.privateKey,
            sheetId: data.sheetId,
          }),
        )
        .catch(() =>
          form.setFieldError(
            "password",
            t("settings.errors.incorrect_password"),
          ),
        ),
    [],
  );

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
        </Group>
        <TextInput
          type="text"
          leftSection={<IconUser color="red" size={18} stroke={1.5} />}
          label={t("settings.evaluator.label")}
          placeholder={t("settings.evaluator.placeholder")}
          description={t("settings.evaluator.description")}
          withAsterisk
          key={form.key("evaluator")}
          {...form.getInputProps("evaluator")}
        />

        <TextInput
          type="password"
          leftSection={<IconKey color="red" size={18} stroke={1.5} />}
          label={t("settings.password.label")}
          placeholder={t("settings.password.placeholder")}
          description={t("settings.password.description")}
          withAsterisk
          key={form.key("password")}
          {...form.getInputProps("password")}
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
