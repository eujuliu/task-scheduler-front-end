import { useTranslation } from "@/i18n";
import { configs } from "@/stores/configs";
import { useStore } from "@nanostores/react";

interface Props {
  path: string;
}

export default function TextTranslation({ path }: Props) {
  const $language = useStore(configs).locale;
  const t = useTranslation($language);

  return <>{t(path)}</>;
}
