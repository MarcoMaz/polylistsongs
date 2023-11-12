import { useId } from "react";

interface OptionProp {
  value: string;
  label: string;
}

interface DropdownProps {
  data: OptionProp[];
  value: string;
  handleChange: React.ChangeEventHandler<HTMLSelectElement>;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  data,
  value,
  handleChange,
}) => {
  const id = useId();

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

export default Dropdown;
