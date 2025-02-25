import { type AvailableLanguages } from "@/stores/configs";
import { ptBR, enUS, es } from "date-fns/locale";
import {
  formatDistance as distanceFormat,
  format,
  formatRelative,
} from "date-fns";

const locales = {
  "pt-br": ptBR,
  en: enUS,
  es: es,
};

export function formatDistance(date: Date, locale: AvailableLanguages) {
  return distanceFormat(date, new Date(), { locale: locales[locale] });
}

export function formatDate(date: Date, locale: AvailableLanguages) {
  return format(date, "Pp", { locale: locales[locale] });
}

export function formatDateRelative(date: Date, locale: AvailableLanguages) {
  return formatRelative(date, new Date(), { locale: locales[locale] });
}
