import React from "react";

interface PolyrhythmsInputProps {
  headingLabel: string;
  againstLabel: string;
  againstValue: number;
  baseValue: number;
  againstChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  baseChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PolyrhythmsInput: React.FunctionComponent<PolyrhythmsInputProps> = ({
  headingLabel,
  againstLabel,
  againstValue,
  baseValue,
  againstChange,
  baseChange,
}) => {
  return (
    <div>
      <strong>{headingLabel}</strong>
      <br />
      <div>
        <input
          type="number"
          id="against"
          name="against"
          min="2"
          max="30"
          value={againstValue}
          onChange={againstChange}
        />
      </div>
      <span>{againstLabel}</span>
      <div>
        <input
          type="number"
          id="base"
          name="base"
          min="2"
          max="30"
          value={baseValue}
          onChange={baseChange}
        />
      </div>
    </div>
  );
};

export default PolyrhythmsInput;
