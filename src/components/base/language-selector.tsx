import { useStore } from "@nanostores/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import TextTranslation from "../ui/text-translation";
import { configs, type AvailableLanguages } from "@/stores/configs";
import { useState } from "react";

export default function LanguageSelector() {
  const languages = ["en", "pt-br", "es"];
  const $configs = useStore(configs);
  const [opened, setOpen] = useState(false);

  return (
    <Select
      onValueChange={(v) =>
        configs.set({ ...$configs, locale: v as AvailableLanguages })
      }
      onOpenChange={setOpen}
      defaultValue={$configs.locale}
    >
      <SelectTrigger>
        <SelectValue placeholder="test" aria-label={$configs.locale} />
      </SelectTrigger>
      <SelectContent>
        {languages.map((code) => (
          <SelectItem key={code} value={code}>
            {opened ? (
              <TextTranslation path={`header.languages.${code}`} />
            ) : (
              <span className="font-bold px-1">{code.toUpperCase()}</span>
            )}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
