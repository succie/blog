import React, { ButtonHTMLAttributes } from "react";
import clsx from "clsx";
import "./Button.css";

type Props = ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ className, children, ...props }: Props) => {
  const cns = clsx("Button", className);

  return (
    <button {...props} className={cns}>
      {children}
    </button>
  );
};

export default Button;
