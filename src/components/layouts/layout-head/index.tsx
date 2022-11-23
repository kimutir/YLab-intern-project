import React from "react";
import "./style.less";
import { cn as bem } from "@bem-react/classname";

interface LayoutFlexProps {
  title: string;
  children: React.ReactNode;
}

function LayoutHead({ title, children }: LayoutFlexProps) {
  const cn = bem("LayoutHead");
  return (
    <div className={cn()}>
      <h1 className={cn("title")}>{title}</h1>
      <div className={cn("side")}>{children}</div>
    </div>
  );
}

export default React.memo(LayoutHead);
