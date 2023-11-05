import { ChangeEvent } from "react";
import { InputsProps } from "../FormAddSong/FormAddSong";
import { PolyrhythmProp } from "@/models/model";

interface InputTextProps {
  field: string;
  inputFields: InputsProps;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const InputText: React.FunctionComponent<InputTextProps> = ({
  field,
  inputFields,
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
      <label htmlFor={field}>{field}</label>
      <input
        type="text"
        name={field}
        id={field}
        required
        value={value as string}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;
