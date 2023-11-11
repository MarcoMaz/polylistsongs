import { ChangeEvent } from "react";
import { InputsProps, PolyrhythmProp } from "@/models/model";

interface FormInputTextProps {
  label?: string;
  field: string;
  inputFields: InputsProps;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInputText: React.FunctionComponent<FormInputTextProps> = ({
  label,
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
      <label htmlFor={field}>{label}</label>
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

export default FormInputText;
