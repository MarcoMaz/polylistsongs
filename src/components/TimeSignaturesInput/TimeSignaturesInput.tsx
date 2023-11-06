import React from "react";

interface TimeSignaturesInputProps {
  headingLabel: string;
  numeratorValue: number;
  denominatorValue: number;
  numeratorHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  denominatorHandleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TimeSignaturesInput: React.FunctionComponent<
  TimeSignaturesInputProps
> = ({
  headingLabel,
  numeratorValue,
  denominatorValue,
  numeratorHandleChange,
  denominatorHandleChange,
}) => {
  return (
    <div>
      <strong>{headingLabel}</strong>
      <br />
      <div>
        <input
          type="number"
          id="timeSignatureNumerator"
          name="timeSignatureNumerator"
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
          id="timeSignatureDenominator"
          name="timeSignatureDenominator"
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
