interface CheckboxProps {
  items: string[];
  label: string;
  selectedItems: string[];
  onSelection: (item: string) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  items,
  label,
  selectedItems,
  onSelection,
}) => {
  return (
    <div>
      <strong>{label}</strong>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`${label}${index}`}
            name={`${label}${index}`}
            checked={selectedItems.includes(item)}
            onChange={() => onSelection(item)}
          />
          <label htmlFor={`${label}${index}`}>{item}</label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
