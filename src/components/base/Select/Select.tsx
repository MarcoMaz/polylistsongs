interface OptionProp {
  value: string;
  label: string;
}

interface SelectProps {
  data: OptionProp[];
  id: string;
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Select: React.FunctionComponent<SelectProps> = ({
  data,
  id,
  value,
  handleChange,
}) => {
  return (
    <select name={id} id={id} onChange={handleChange} value={value}>
      {data.map((option: any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
