import { useId } from "react";

interface SliderProps {
  min: number;
  max: number;
  orientation: "horizontal" | "vertical";
}

const Slider: React.FunctionComponent<SliderProps> = ({
  min,
  max,
  orientation = "horizontal",
}) => {
  const id = useId();
  
  return (
    <div>
      <input
        aria-orientation={orientation}
        type="range"
        id={id}
        name={id}
        min={min}
        max={max}
      />
    </div>
  );
};

export default Slider;
