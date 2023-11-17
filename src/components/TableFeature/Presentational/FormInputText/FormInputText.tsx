import { ChangeEvent } from "react";
import { InputsProps, PolyrhythmProp } from "@/models/model";

interface FormInputTextProps {
  field: string;
  inputFields: InputsProps;
  label?: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const FormInputText: React.FunctionComponent<FormInputTextProps> = ({
  field,
  inputFields,
  label,
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
    <div className="formInputText">
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
