import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  titleContent?: ReactNode;
  actions?: ReactNode;
}

export default function MenuHeader({ titleContent, actions }: Props) {
  return (
    <div className="menu-header flex justify-between py-6">
      <div className="title text-3xl font-bold">{titleContent}</div>
      {actions}
    </div>
  );
}
