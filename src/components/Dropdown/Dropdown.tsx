import { ChangeEvent, SetStateAction } from "react";
import { InputsProps } from "../FormAddSong/FormAddSong";
import { PolyrhythmProp } from "@/models/model";

interface DropdownProps {
  label: string;
  field: string;
  inputFields: InputsProps;
  polyTypes: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  label,
  field,
  inputFields,
  polyTypes,
  onChange,
}) => {
  let value;
  if (typeof inputFields[field] === "object" && field === "polyrhythm") {
    const polyrhythm = inputFields[field] as PolyrhythmProp;
    value = `${polyrhythm.against}:${polyrhythm.base}`;
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
        {polyTypes.map((polyType, idx) => {
          return (
            <option key={idx} value={polyType}>
              {polyType}
            </option>
          );
        })}
      </select>
      <br />
    </div>
  );
};

export default Dropdown;
