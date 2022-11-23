import React, { useEffect, useRef } from "react";
import { cn as bem } from "@bem-react/classname";
import "./style.less";

const defaultLayoutModalProps = {
  title: "Модалка",
};

interface LayoutModalProps {
  title?: string;
  labelClose: string;
  onClose: () => void;
  children: React.ReactNode;
}
function LayoutModal(props: LayoutModalProps) {
  const cn = bem("LayoutModal");

  const frame = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let top = 10;

    if (frame.current) {
      if (window.innerWidth > frame.current.clientHeight) {
        top = Math.max(
          top,
          (window.innerHeight - frame.current.clientHeight) / 2 - top
        );
      }
      frame.current.style.marginTop = `${top}px`;
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [frame.current]);

  return (
    <div className={cn()}>
      <div className={cn("frame")} ref={frame}>
        <div className={cn("head")}>
          <h1 className={cn("title")}>{props.title}</h1>
          <button className={cn("close")} onClick={props.onClose}>
            {props.labelClose}
          </button>
        </div>
        <div className={cn("content")}>{props.children}</div>
      </div>
    </div>
  );
}

LayoutModal.defaultProps = defaultLayoutModalProps;

export default React.memo(LayoutModal);
