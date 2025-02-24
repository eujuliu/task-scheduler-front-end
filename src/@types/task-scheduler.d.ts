import type { AvailableLanguages } from "@/stores/configs";

declare namespace TaskScheduler {
  export interface Configs {
    theme: "dark" | "light";
    locale: AvailableLanguages;
  }
}
