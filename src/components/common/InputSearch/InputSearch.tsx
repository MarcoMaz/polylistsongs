import { useId } from "react";

interface InputSearchProps {
  label: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputSearch: React.FunctionComponent<InputSearchProps> = ({
  label,
  value,
  handleChange,
}) => {
  const id = useId();
  
  return (
    <div className="input">
      <label htmlFor={id}>{label}</label>
      <input type="search" id={id} value={value} onChange={handleChange} />
    </div>
  );
};
export default InputSearch;
