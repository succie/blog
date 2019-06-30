import React, { ChangeEvent, useMemo } from "react";
import clsx from "clsx";
import Select from "../../../../modules/Select/Select";

type Props = {
  genre: string;
  className?: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const GenreSelect = ({ genre, className, onChange }: Props) => {
  const cns = clsx("GenreSelect", className);
  const options = useMemo(
    () =>
      ["common", "technology"].map(genre => (
        <option value={genre} key={genre}>{genre}</option>
      )),
    []
  );

  return (
    <Select className={cns} defaultValue={genre} onChange={onChange}>
      {options}
    </Select>
  );
};

export default GenreSelect;
