interface InputSearchProps {
  label: string;
  id: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
}

const InputSearch: React.FunctionComponent<InputSearchProps> = ({
  label,
  id,
  value,
  handleChange,
}) => {
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type="search" id={id} value={value} onChange={handleChange} />
    </div>
  );
};
export default InputSearch;
