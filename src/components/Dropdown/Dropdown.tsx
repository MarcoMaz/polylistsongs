import { ChangeEvent, SetStateAction } from "react";
import { InputsProps } from "../FormAddSong/FormAddSong";

interface DropdownProps {
  label: string;
  field: string;
  inputFields: InputsProps;
  polyTypes: string[];
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const Dropdown: React.FunctionComponent<DropdownProps> = ({
  label,
  field,
  inputFields,
  polyTypes,
  onChange,
}) => {
  return (
    <div>
      <label htmlFor={field}>{label}</label>
      <br />
      <select
        name={field}
        id={field}
        onChange={onChange}
        value={inputFields.polyType}
      >
        {polyTypes.map((polyType, idx) => {
          return (
            <option key={idx} value={polyType}>
              {polyType}
            </option>
          );
        })}
      </select>
      <br />
    </div>
  );
};

export default Dropdown;
