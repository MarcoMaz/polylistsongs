import { PolyrhythmProp, TimeSignatureProp } from "@/models/model";

interface CheckboxPairProps {
  data: PolyrhythmProp[] | TimeSignatureProp[];
  heading: string;
  selectedData: (PolyrhythmProp | TimeSignatureProp)[];
  onSelection: (index: number) => void;
}

const CheckboxPair: React.FC<CheckboxPairProps> = ({
  data,
  heading,
  selectedData,
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
                  ? `${item.against}:${item.base}`
                  : `${item.numerator}/${item.denominator}`}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CheckboxPair;
