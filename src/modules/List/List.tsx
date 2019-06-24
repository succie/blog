import React, { ReactNode, ReactElement } from "react";
import clsx from "clsx";
import "./List.css";

type Props = {
  className?: string;
  children: ReactNode;
};

const List = ({ className, children }: Props) => {
  const cns = clsx("List", className);
  return (
    <ul className={cns}>
      {children}
    </ul>
  );
};

export default List;
