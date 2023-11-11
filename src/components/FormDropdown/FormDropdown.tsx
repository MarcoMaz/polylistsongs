import { ChangeEvent } from "react";
import { InputsProps, PolyrhythmProp } from "@/models/model";

interface FormDropdownProps {
  field: string;
  inputFields: InputsProps;
  label?: string;
  types: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const FormDropdown: React.FunctionComponent<FormDropdownProps> = ({
  field,
  inputFields,
  label,
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
      {label && <label htmlFor={field}>{label}</label>}
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

export default FormDropdown;
