import React, { InputHTMLAttributes, useState } from "react";
import clsx from "clsx";
import "./TextField.css";

type Props = InputHTMLAttributes<HTMLInputElement>;

const TextField = ({ className, ...props }: Props) => {
  const [focus, setFocus] = useState(false);

  const cns = clsx("TextField", className);
  const cns2 = clsx("TextField-bottom-line", { "is-focus": focus });

  return (
    <div className={cns}>
      <input
        {...props}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <div className={cns2} />
    </div>
  );
};

export default TextField;
