interface SliderProps {
  id: string;
  min: number;
  max: number;
  orientation: "horizontal" | "vertical";
}

const Slider: React.FunctionComponent<SliderProps> = ({
  id,
  min,
  max,
  orientation = "horizontal",
}) => {
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
