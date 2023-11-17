import { ChangeEventHandler, useId } from "react";

interface ToggleProps {
  checked: boolean;
  heading: string;
  label: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
}

const Toggle: React.FunctionComponent<ToggleProps> = ({
  checked,
  heading,
  label,
  handleChange,
}) => {
  const id = useId();

  return (
    <div className="toggle">
      <strong>{heading}</strong>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={checked}
        onChange={handleChange}
      />
      <label htmlFor={id} />
    </div>
  );
};

export default Toggle;
