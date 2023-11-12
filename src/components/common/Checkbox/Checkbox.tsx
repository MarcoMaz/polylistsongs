import { ChangeEventHandler, useId } from "react";

interface CheckboxProps {
  checked: boolean;
  heading: string;
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  checked,
  heading,
  label,
  handleChange,
}) => {
  const id = useId();

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
