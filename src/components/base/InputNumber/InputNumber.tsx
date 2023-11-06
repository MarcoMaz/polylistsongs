import { ChangeEvent } from "react";
import { InputsProps, PolyrhythmProp } from "@/models/model";

interface InputNumberProps {
  field: string;
  label?: string;
  inputFields: InputsProps;
  max: number;
  min: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  field,
  label,
  inputFields,
  max,
  min,
  handleChange,
}) => {
  let value;
  if (typeof inputFields[field] === "object" && field === "polyrhythm") {
    const polyrhythm = inputFields[field] as PolyrhythmProp;
    value = `${polyrhythm.against}:${polyrhythm.base}`;
  } else {
    value = inputFields[field];
  }

  return (
    <div>
      {label && <label htmlFor={field}>{label}</label>}
      <input
        type="number"
        id={field}
        name={field}
        min={min}
        max={max}
        onChange={handleChange}
        value={value as string}
      />
    </div>
  );
};

export default InputNumber;