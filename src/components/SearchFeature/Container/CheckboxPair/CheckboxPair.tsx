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
  function isSelected(
    item: PolyrhythmProp | TimeSignatureProp,
    selectedItem: PolyrhythmProp | TimeSignatureProp
  ) {
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
  }

  function countOccurrences(dataArray: SongProp[] | undefined) {
    const counts: { [key: string]: number } = {};
    let key;
    if (dataArray) {
      dataArray.forEach(({ polyrhythm, timeSignature }) => {
        if (type === "polyrhythm") {
          key =
            polyrhythm && polyrhythm.against && polyrhythm.base
              ? `${polyrhythm.against} : ${polyrhythm.base}`
              : "";
        } else {
          key =
            timeSignature &&
            timeSignature.numerator &&
            timeSignature.denominator
              ? `${timeSignature.numerator}/${timeSignature.denominator}`
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
  }

  const itemsCount = countOccurrences(songsData);

  function getLabelContent(item: PolyrhythmProp | TimeSignatureProp) {
    if ("against" in item && "base" in item) {
      const key = `${item.against} : ${item.base}`;
      return `${item.against}:${item.base} (${itemsCount[key] || 0})`;
    } else {
      const key = `${item.numerator}/${item.denominator}`;
      return `${item.numerator}/${item.denominator} (${itemsCount[key] || 0})`;
    }
  }

  return (
    <div className="checkboxGroup">
      <strong>{heading}</strong>
      <div>
        {data.map((item, index) => {
          const id = `${heading.toLowerCase().replace(" ", "-")}-${index}`;

          return (
            <div key={index}>
              <input
                type="checkbox"
                id={id}
                name={id}
                checked={selectedData.some((selectedItem) =>
                  isSelected(item, selectedItem)
                )}
                onChange={() => onSelection(index)}
              />
              <label htmlFor={id}>{getLabelContent(item)}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxPair;
