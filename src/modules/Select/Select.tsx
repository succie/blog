import React, { SelectHTMLAttributes } from "react";
import clsx from "clsx";
import "./Select.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";

type Props = {
  label?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({ label, className, children, ...props }: Props) => {
  const cns = clsx("Select", className);

  return (
    <div className="Select-Wrapper">
      <FontAwesomeIcon className="Select-Icon" icon={faCaretDown} />
      <select {...props} className={cns}>
        {children}
      </select>
      <label className="Select-Label">{label}</label>
    </div>
  );
};

export default Select;
