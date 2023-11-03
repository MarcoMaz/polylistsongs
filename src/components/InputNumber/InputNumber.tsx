import { ChangeEvent } from "react";
import { InputsProps } from "../FormAddSong/FormAddSong";

interface InputNumberProps {
  field: string;
  inputFields: InputsProps;
  label: string;
  max: number;
  min: number;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputNumber: React.FunctionComponent<InputNumberProps> = ({
  field,
  inputFields,
  label,
  max,
  min,
  handleChange,
}) => {
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <input
        type="number"
        id={field}
        name={field}
        min={min}
        max={max}
        onChange={handleChange}
        value={inputFields[field]}
      />
    </div>
  );
};

export default InputNumber;
