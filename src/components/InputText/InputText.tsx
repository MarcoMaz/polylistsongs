import { InputsProps } from "../FormAddSong/FormAddSong";

interface InputTextProps {
  field: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFields: InputsProps;
}

const InputText: React.FunctionComponent<InputTextProps> = ({
  field,
  handleChange,
  inputFields,
}) => {
  return (
    <div>
      <label htmlFor={field}>{`Enter your ${field}:`}</label>
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
