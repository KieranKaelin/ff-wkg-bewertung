import { resources } from "../locales/i18n";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: (typeof resources)["de"];
  }
}
