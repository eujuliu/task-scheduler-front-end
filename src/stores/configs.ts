import type { TaskScheduler } from "@/@types/task-scheduler";
import { persistentAtom } from "@nanostores/persistent";

export type AvailableLanguages = "pt-br" | "en" | "es";

export const configs = persistentAtom<TaskScheduler.Configs>(
  "ts:configs",
  { locale: "pt-br", theme: "dark" },
  { encode: JSON.stringify, decode: JSON.parse },
);

export function changeTheme(theme: "dark" | "light") {
  configs.set({ ...configs.get(), theme: theme == "dark" ? "light" : "dark" });

  const html = document.querySelector("html");

  if (html) {
    html.setAttribute("data-theme", configs.get().theme);
  }
}
