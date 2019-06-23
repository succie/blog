import React, { ReactNode } from "react";
import clsx from "clsx";
import "./ListItem.css";

type Props = {
  className?: string;
  children: ReactNode;
};

const ListItem = ({ className, children }: Props) => {
  const cns = clsx("ListItem", className);
  return <li className={cns}>{children}</li>;
};

export default ListItem;
