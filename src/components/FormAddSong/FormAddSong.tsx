import React, { SetStateAction } from "react";
import Button from "../base/Button/Button";
import Dropdown from "../base/Dropdown/Dropdown";
import InputNumber from "../base/InputNumber/InputNumber";
import InputText from "../base/InputText/InputText";
import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

import TextConstants from "@/constants/textConstants";
import PolyrhythmsInput from "../PolyrhythmsInput/PolyrhythmsInput";
import TimeSignaturesInput from "../TimeSignaturesInput/TimeSignaturesInput";
import useSongForm from "@/hooks/useSongForm";

const initialValues = {
  title: "",
  album: "",
  artist: "",
  drummer: "",
  polyType: "groove",
  year: 2023,
  timestamp: "00:00",
  polyrhythm: {
    against: 3,
    base: 2,
  },
  timeSignature: {
    numerator: 4,
    denominator: 4,
  },
  source: "My Archive",
};

interface FormAddSongProps {
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  sourceTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  tableFields,
  songs,
  polyTypes,
  sourceTypes,
  setSongs,
  setIsDialogOpen,
}) => {
  const {
    inputFields,
    setInputFields,
    handleInputChange,
    handleSelectChange,
    handlePolyrhythmChange,
    handleTimeSignatureChange,
  } = useSongForm(initialValues);

  const {
    polyrhythmTypeLabel,
    yearLabel,
    sourceLabel,
    polyrhythmLabels,
    timeSignatureLabel,
  } = TextConstants.formAddSong;

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSong = Object.fromEntries(formData.entries());
    const newSongWithID = {
      id: generateRandomId(),
      ...newSong,
      polyType: inputFields.polyType,
      polyrhythm: inputFields.polyrhythm,
      timeSignature: inputFields.timeSignature,
    };

    setSongs([...songs, newSongWithID as SongProp]);
    setInputFields(initialValues);
    setIsDialogOpen(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {tableFields.map((field, index) => {
        switch (field) {
          case "title":
          case "album":
          case "artist":
          case "drummer":
          case "timestamp":
            return (
              <InputText
                key={index}
                field={field}
                handleChange={handleInputChange}
                inputFields={inputFields}
                label={field}
              />
            );
          case "polyType":
            return (
              <Dropdown
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
              <InputNumber
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
              <Dropdown
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
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
