import type { ReactNode } from "react";
import { Button } from "../ui/button";

interface Props {
  hasButton?: boolean;
  titleContent?: ReactNode;
  btnContent?: ReactNode;
}

export default function MenuHeader({
  titleContent,
  btnContent,
  hasButton,
}: Props) {
  return (
    <div className="menu-header flex justify-between py-6">
      <div className="title text-3xl font-bold">{titleContent}</div>
      {hasButton ? (
        <Button
          variant="ghost"
          className="border border-lime-500 text-lime-400"
        >
          {btnContent}
        </Button>
      ) : (
        ""
      )}
    </div>
  );
}
