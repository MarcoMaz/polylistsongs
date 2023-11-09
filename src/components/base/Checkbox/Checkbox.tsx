import { SongProp } from "@/models/model";

interface CheckboxProps {
  items: string[];
  label: string;
  selectedItems: string[];
  songsData: SongProp[];
  type: string;
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
  const countTypeOccurrences = (dataArray: any[], key: string) => {
    const counts: { [key: string]: number } = {};
    dataArray.forEach((item) => {
      if (item[key as keyof SongProp] in counts) {
        counts[item[key as keyof SongProp]]++;
      } else {
        counts[item[key as keyof SongProp]] = 1;
      }
    });
    return counts;
  };

  const itmesCount = countTypeOccurrences(songsData, type);

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
            {item} ({itmesCount[item] || 0})
          </label>
        </div>
      ))}
    </div>
  );
};

export default Checkbox;
