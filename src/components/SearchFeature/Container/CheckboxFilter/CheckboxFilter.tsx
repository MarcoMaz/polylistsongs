import { SongProp } from "@/models/model";

interface CheckboxFilterProps {
  items: string[];
  heading: string;
  selectedItems: string[];
  onSelection: (item: string) => void;
}

const CheckboxFilterGroup: React.FunctionComponent<CheckboxFilterProps> = ({
  items,
  heading,
  selectedItems,
  onSelection,
}) => {
  
  return (
    <div className="checkboxGroup">
      <strong>{heading}</strong>
      {items.map((item, index) => {
        const id = `${heading}${index}`;
        return (
          <div key={index}>
            <input
              type="checkbox"
              id={id}
              name={id}
              checked={selectedItems.includes(item)}
              onChange={() => onSelection(item)}
            />
            <label htmlFor={id}>
              {item}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxFilterGroup;
