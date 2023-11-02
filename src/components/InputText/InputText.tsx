import { ChangeEvent } from "react";
import { InputsProps } from "../FormAddSong/FormAddSong";

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
  return (
    <div>
      <label htmlFor={field}>{field}</label>
      <input
        type="text"
        name={field}
        id={field}
        required
        value={inputFields[field]}
        onChange={handleChange}
      />
    </div>
  );
};

export default InputText;
