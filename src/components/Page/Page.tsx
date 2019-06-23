import React, { ReactNode } from "react";
import clsx from "clsx";
import './Page.css';

type Props = {
  className?: string;
  children: ReactNode;
};

const Page = ({ className, children }: Props) => {
  const cns = clsx("Page", className);

  return <div className={cns}>{children}</div>;
};

export default Page;
