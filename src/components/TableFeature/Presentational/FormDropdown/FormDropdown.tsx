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
    <div className="input">
      {label && <label htmlFor={field}>{label}</label>}
      <select
        name={field}
        id={field}
        onChange={onChange}
        value={value as string}
      >
        {types.map((type, index) => {
          return (
            <option key={index} value={type}>
              {type}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormDropdown;
