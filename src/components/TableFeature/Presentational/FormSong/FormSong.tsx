import FormDropdown from "../FormDropdown/FormDropdown";
import FormInputNumber from "../FormInputNumber/FormInputNumber";
import FormInputText from "../FormInputText/FormInputText";
import PolyrhythmsInput from "../PolyrhythmsInput/PolyrhythmsInput";
import TimeSignaturesInput from "../TimeSignaturesInput/TimeSignaturesInput";

import TextConstants, { TableSongLabels } from "@/constants/textConstants";

import { InputsProps, PolyrhythmProp, TimeSignatureProp } from "@/models/model";

interface PolyrhythLabelProps {
  heading: string;
  against: string;
}

interface FormSongProps {
  inputFields: InputsProps;
  polyrhythmLabels: PolyrhythLabelProps;
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
  polyTypes,
  sourceTypes,
  tableFields,
  handleInputChange,
  handlePolyrhythmChange,
  handleSelectChange,
  handleTimeSignatureChange,
}) => {
  return (
    <>
      {tableFields.map((field: string, index: number) => {
        const label =
          field in TextConstants.tableSong.labels
            ? TextConstants.tableSong.labels[field as keyof TableSongLabels]
            : field;

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
                label={label}
              />
            );
          case "type":
            return (
              <FormDropdown
                key={index}
                field={field}
                inputFields={inputFields}
                label={label}
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
                label={label}
                min={1950}
                max={2023}
                handleChange={handleInputChange}
              />
            );
          case "polyrhythm":
            return (
              <PolyrhythmsInput
                key={index}
                againstValue={
                  (inputFields.polyrhythm as PolyrhythmProp).against
                }
                baseValue={(inputFields.polyrhythm as PolyrhythmProp).base}
                headingLabel={label}
                againstHandleChange={handlePolyrhythmChange("against")}
                baseHandleChange={handlePolyrhythmChange("base")}
              />
            );
          case "timeSignature":
            return (
              <TimeSignaturesInput
                key={index}
                denominatorValue={
                  (inputFields.timeSignature as TimeSignatureProp).denominator
                }
                headingLabel={label}
                numeratorValue={
                  (inputFields.timeSignature as TimeSignatureProp).numerator
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
                field={field}
                inputFields={inputFields}
                label={label}
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
