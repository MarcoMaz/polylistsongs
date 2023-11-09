import { SongProp } from "@/models/model";

interface CheckboxProps {
  items: string[];
  label: string;
  selectedItems: string[];
  songsData: SongProp[];
  type: keyof SongProp;
  onSelection: (item: string) => void;
}

const Checkbox: React.FunctionComponent<CheckboxProps> = ({
  items,
  label,
  selectedItems,
  songsData,
  type,
  onSelection,
}) => {
  const countTypeOccurrences = (
    dataArray: SongProp[],
    key: keyof SongProp
  ): Record<string, number> => {
    const counts: Record<string, number> = {};
    dataArray.forEach((item) => {
      const keyValue = item[key] as string;
      if (keyValue in counts) {
        counts[keyValue]++;
      } else {
        counts[keyValue] = 1;
      }
    });
    return counts;
  };

  const itemsCount = countTypeOccurrences(songsData, type);

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
          <label htmlFor={`${label}${index}`}>
            {item} ({itemsCount[item] || 0})
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
