import { InputsProps, PolyrhythmProp, TimeSignatureProp } from "@/models/model";

import FormDropdown from "../FormDropdown/FormDropdown";
import FormInputNumber from "../FormInputNumber/FormInputNumber";
import FormInputText from "../FormInputText/FormInputText";
import PolyrhythmsInput from "../PolyrhythmsInput/PolyrhythmsInput";
import TimeSignaturesInput from "../TimeSignaturesInput/TimeSignaturesInput";

interface FormSongProps {
  inputFields: InputsProps;
  polyrhythmLabels: {
    heading: string;
    against: string;
  };
  polyrhythmTypeLabel: string;
  polyTypes: string[];
  sourceLabel: string;
  sourceTypes: string[];
  tableFields: string[];
  timeSignatureLabel: string;
  yearLabel: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handlePolyrhythmChange: (
    key: "against" | "base"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (
    key: keyof InputsProps
  ) => (e: React.ChangeEvent<HTMLSelectElement>) => void;
  handleTimeSignatureChange: (
    key: "numerator" | "denominator"
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormSong: React.FunctionComponent<FormSongProps> = ({
  inputFields,
  polyrhythmLabels,
  polyrhythmTypeLabel,
  polyTypes,
  sourceLabel,
  sourceTypes,
  tableFields,
  timeSignatureLabel,
  yearLabel,
  handleInputChange,
  handlePolyrhythmChange,
  handleSelectChange,
  handleTimeSignatureChange,
}) => {
  return (
    <>
      {tableFields.map((field: string, index: number) => {
        switch (field) {
          case "title":
          case "album":
          case "artist":
          case "drummer":
          case "timestamp":
            return (
              <FormInputText
                key={index}
                field={field}
                handleChange={handleInputChange}
                inputFields={inputFields}
                label={field}
              />
            );
          case "polyType":
            return (
              <FormDropdown
                key={index}
                label={polyrhythmTypeLabel}
                field={field}
                inputFields={inputFields}
                types={polyTypes}
                onChange={handleSelectChange("polyType")}
              />
            );
          case "year":
            return (
              <FormInputNumber
                key={field}
                field={field}
                inputFields={inputFields}
                label={yearLabel}
                min={1950}
                max={2023}
                handleChange={handleInputChange}
              />
            );
          case "polyrhythm":
            return (
              <PolyrhythmsInput
                key={index}
                headingLabel={polyrhythmLabels.heading}
                againstLabel={polyrhythmLabels.against}
                againstValue={
                  (inputFields.polyrhythm as PolyrhythmProp).against
                }
                baseValue={(inputFields.polyrhythm as PolyrhythmProp).base}
                againstHandleChange={handlePolyrhythmChange("against")}
                baseHandleChange={handlePolyrhythmChange("base")}
              />
            );
          case "timeSignature":
            return (
              <TimeSignaturesInput
                key={index}
                headingLabel={timeSignatureLabel}
                numeratorValue={
                  (inputFields.timeSignature as TimeSignatureProp).numerator
                }
                denominatorValue={
                  (inputFields.timeSignature as TimeSignatureProp).denominator
                }
                numeratorHandleChange={handleTimeSignatureChange("numerator")}
                denominatorHandleChange={handleTimeSignatureChange(
                  "denominator"
                )}
              />
            );
          case "source":
            return (
              <FormDropdown
                key={index}
                label={sourceLabel}
                field={field}
                inputFields={inputFields}
                types={sourceTypes}
                onChange={handleSelectChange("source")}
              />
            );
          default:
            return null;
        }
      })}
    </>
  );
};

export default FormSong;
