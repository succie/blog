import React, { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import "./TextField.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ className, ...props }: Props) => {
  const [focus, setFocus] = useState(false);

  const cns = clsx("TextField", className, { "is-focus": focus });

  return (
    <div className={cns}>
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className="TextField-bottom-line" />
    </div>
  );
};

export default TextField;
