import React, { useId } from "react";

interface TimeSignaturesInputProps {
  denominatorValue: number;
  headingLabel: string;
  numeratorValue: number;
  denominatorHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  numeratorHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeSignaturesInput: React.FunctionComponent<
  TimeSignaturesInputProps
> = ({
  denominatorValue,
  headingLabel,
  numeratorValue,
  denominatorHandleChange,
  numeratorHandleChange,
}) => {
  const numeratorId = useId();
  const denominatorId = useId();

  return (
    <div>
      <strong>{headingLabel}</strong>
      <br />
      <div>
        <input
          type="number"
          id={numeratorId}
          name={numeratorId}
          min="2"
          max="30"
          value={numeratorValue}
          onChange={numeratorHandleChange}
        />
      </div>
      <span>-</span>
      <div>
        <input
          type="number"
          id={denominatorId}
          name={denominatorId}
          min="2"
          max="30"
          value={denominatorValue}
          onChange={denominatorHandleChange}
        />
      </div>
    </div>
  );
};

export default TimeSignaturesInput;
