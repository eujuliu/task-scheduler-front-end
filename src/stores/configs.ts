import { persistentAtom } from "@nanostores/persistent";

export const configs = persistentAtom<TaskScheduler.Configs>(
  "ts:configs",
  { locale: "pt-br", theme: "dark" },
  { encode: JSON.stringify, decode: JSON.parse },
);
