import { changeTheme, configs } from "@/stores/configs";
import { useStore } from "@nanostores/react";
import { SunDim, MoonIcon } from "lucide-react";
import { Button } from "../ui/button";

export default function ThemeButton() {
  const $configs = useStore(configs);

  return (
    <Button variant="outline" onClick={() => changeTheme($configs.theme)}>
      {$configs.theme === "dark" ? <SunDim /> : <MoonIcon />}
    </Button>
  );
}
