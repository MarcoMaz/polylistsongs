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

  function getLabelContent(item: PolyrhythmProp | TimeSignatureProp) {
    if ("against" in item && "base" in item) {
      return `${item.against}:${item.base}`;
    } else {
      return `${item.numerator}/${item.denominator}`;
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
