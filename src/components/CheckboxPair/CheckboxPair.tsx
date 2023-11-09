import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

interface CheckboxPairProps {
  data: PolyrhythmProp[] | TimeSignatureProp[];
  heading: string;
  selectedData: (PolyrhythmProp | TimeSignatureProp)[];
  songsData: SongProp[];
  type: string;
  onSelection: (index: number) => void;
}

const CheckboxPair: React.FC<CheckboxPairProps> = ({
  data,
  heading,
  selectedData,
  songsData,
  type,
  onSelection,
}) => {
  const isPolyrhythmSelected = (
    item: PolyrhythmProp | TimeSignatureProp,
    selectedItem: PolyrhythmProp | TimeSignatureProp
  ) => {
    if ("against" in item && "base" in item) {
      return (
        item.against === (selectedItem as PolyrhythmProp).against &&
        item.base === (selectedItem as PolyrhythmProp).base
      );
    } else {
      return (
        (item as TimeSignatureProp).numerator ===
          (selectedItem as TimeSignatureProp).numerator &&
        (item as TimeSignatureProp).denominator ===
          (selectedItem as TimeSignatureProp).denominator
      );
    }
  };

  const countOccurrences = (dataArray: SongProp[] | undefined) => {
    const counts: { [key: string]: number } = {};
    let key;
    if (dataArray) {
      dataArray.forEach((item) => {
        if (type === "polyrhythm") {
          key =
            item.polyrhythm && item.polyrhythm.against && item.polyrhythm.base
              ? `${item.polyrhythm.against} : ${item.polyrhythm.base}`
              : "";
        } else {
          key =
            item.timeSignature &&
            item.timeSignature.numerator &&
            item.timeSignature.denominator
              ? `${item.timeSignature.numerator}/${item.timeSignature.denominator}`
              : "";
        }
        if (key in counts) {
          counts[key]++;
        } else {
          counts[key] = 1;
        }
      });
    }
    return counts;
  };

  const itemsCount = countOccurrences(songsData);

  return (
    <div>
      <strong>{heading}</strong>
      <div>
        {data.map((item, index) => {
          const uniqueId = `${heading
            .toLowerCase()
            .replace(" ", "-")}-${index}`;

          return (
            <div key={index}>
              <input
                type="checkbox"
                id={uniqueId}
                name={uniqueId}
                checked={selectedData.some((selectedItem) =>
                  isPolyrhythmSelected(item, selectedItem)
                )}
                onChange={() => onSelection(index)}
              />
              <label htmlFor={uniqueId}>
                {"against" in item && "base" in item
                  ? `${item.against}:${item.base} (${
                    itemsCount[`${item.against} : ${item.base}`] || 0
                    })`
                  : `${item.numerator}/${item.denominator} (${
                    itemsCount[`${item.numerator}/${item.denominator}`] || 0
                    })`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxPair;
