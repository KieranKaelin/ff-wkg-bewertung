import { Button, Group, Stack, Textarea, TextInput } from "@mantine/core";
import { useTranslation } from "react-i18next";
import { useCallback } from "react";
import { LocalStorage } from "@/store/localStorage";
import { useForm } from "@mantine/form";

export function Settings() {
  const { t } = useTranslation();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: LocalStorage.get() ?? {
      evaluator: "",
      serviceAccount: "",
      privateKey: "",
      sheetId: "",
    },
  });

  const handleSubmit = useCallback((values: typeof form.values) => {
    LocalStorage.set(values);
  }, []);

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
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
          key={form.key("privateKey")}
          {...form.getInputProps("privateKey")}
        />

        <Group justify="flex-end" mt="md">
          <Button type="submit">{t("settings.save")}</Button>
        </Group>
      </Stack>
    </form>
  );
}
