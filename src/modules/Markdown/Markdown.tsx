import React from "react";
import ReactMarkdown from "react-markdown";
import breaks from "remark-breaks";
import clsx from "clsx";

type Props = {
  className?: string;
  src: string;
};

const Markdown = ({ className, src }: Props) => {
  const cns = clsx("Markdown", className);

  return <ReactMarkdown className={cns} source={src} plugins={[breaks]} />;
};

export default Markdown;
