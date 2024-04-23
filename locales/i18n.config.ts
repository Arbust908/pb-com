import { defineI18nConfig } from "vue-i18n";
import * as en from "./en";
import * as es from "./es";

const messages = {
 es: es.default,
 en: en.default,
};

export default defineI18nConfig(() => ({
 legacy: false,
 locale: "en",
 messages,
}));
