import { configs } from "@/stores/configs";

export default function dateFormatter(date: Date) {
  const locale = configs.get().locale;

  return `${date.toLocaleDateString(locale, { dateStyle: "medium" })} ${date.toLocaleTimeString(locale, { timeStyle: "short" })}`;
}
