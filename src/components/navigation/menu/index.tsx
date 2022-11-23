import React from "react";
import { cn as bem } from "@bem-react/classname";
import { Link } from "react-router-dom";
import "./style.css";

interface MenuProps {
  items: { key: number; title: string; link: string }[];
}

function Menu(props: MenuProps) {
  const cn = bem("Menu");

  return (
    <ul className={cn()}>
      {props.items.map((item) => (
        <li key={item.key} className={cn("item")}>
          <Link to={item.link}>{item.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default React.memo(Menu);
