import { ChangeEvent } from "react";
import { InputsProps, PolyrhythmProp } from "@/models/model";

interface DropdownProps {
  label: string;
  field: string;
  inputFields: InputsProps;
  types: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  label,
  field,
  inputFields,
  types,
  onChange,
}) => {
  let value;
  if (typeof inputFields[field] === "object" && field === "polyrhythm") {
    const polyrhythm = inputFields[field] as PolyrhythmProp;
    value = `${polyrhythm.against}:${polyrhythm.base}`;
  } else if (field === "source") {
    value = inputFields.source;
  } else {
    value = inputFields.polyType;
  }

  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <br />
      <select
        name={field}
        id={field}
        onChange={onChange}
        value={value as string}
      >
        {types.map((type, idx) => {
          return (
            <option key={idx} value={type}>
              {type}
            </option>
          );
        })}
      </select>
      <br />
    </div>
  );
};

export default Dropdown;
