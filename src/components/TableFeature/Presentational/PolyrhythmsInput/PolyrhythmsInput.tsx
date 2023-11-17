import React, { useId } from "react";

interface PolyrhythmsInputProps {
  againstValue: number;
  baseValue: number;
  headingLabel: string;
  againstHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  baseHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PolyrhythmsInput: React.FunctionComponent<PolyrhythmsInputProps> = ({
  againstValue,
  baseValue,
  headingLabel,
  againstHandleChange,
  baseHandleChange,
}) => {
  const againstId = useId();
  const baseId = useId();

  const againstLabel = ":";

  return (
    <div className="polyrhythmsInput">
      <div className="polyrhythmsInput__heading">{headingLabel}</div>
      <div className="polyrhythmsInput__content">
        <input
          type="number"
          id={againstId}
          name={againstId}
          min="2"
          max="30"
          value={againstValue}
          onChange={againstHandleChange}
        />
        <span>{againstLabel}</span>
        <input
          type="number"
          id={baseId}
          name={baseId}
          min="2"
          max="30"
          value={baseValue}
          onChange={baseHandleChange}
        />
      </div>
    </div>
  );
};

export default PolyrhythmsInput;
