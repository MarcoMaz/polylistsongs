import { SongProp } from "@/models/model";

interface CheckboxFilterProps {
  items: string[];
  heading: string;
  selectedItems: string[];
  songsData: SongProp[];
  type: keyof SongProp;
  onSelection: (item: string) => void;
}

const CheckboxFilterGroup: React.FunctionComponent<CheckboxFilterProps> = ({
  items,
  heading,
  selectedItems,
  songsData,
  type,
  onSelection,
}) => {
  function countTypeOccurrences(
    dataArray: SongProp[],
    key: keyof SongProp
  ): Record<string, number> {
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
  }

  const itemsCount = countTypeOccurrences(songsData, type);

  return (
    <div>
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
              {item} ({itemsCount[item] || 0})
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default CheckboxFilterGroup;
