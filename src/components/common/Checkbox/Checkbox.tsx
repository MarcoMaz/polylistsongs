import { ChangeEventHandler } from "react";

interface CheckboxProps {
  checked: boolean;
  heading: string;
  id: string;
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  heading,
  id,
  label,
  handleChange,
}) => {
  return (
    <>
      <strong>{heading}</strong>
      <div>
        <input
          type="checkbox"
          id={id}
          name={id}
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    </>
  );
};

export default Checkbox;
