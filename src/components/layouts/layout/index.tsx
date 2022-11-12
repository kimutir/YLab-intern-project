import React from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.less";

interface LayoutProps {
  head?: React.ReactNode;
  top?: React.ReactNode;
  children?: React.ReactNode;
}

function Layout({ head, top, children }: LayoutProps) {
  const cn = bem("Layout");

  return (
    <div className={cn()}>
      {top ? <div className={cn("top")}>{top}</div> : null}
      <div className={cn("head")}>{head}</div>
      <div className={cn("content")}>{children}</div>
    </div>
  );
}

export default React.memo(Layout);
