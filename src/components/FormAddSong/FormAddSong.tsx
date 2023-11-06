import React, { SetStateAction, useState } from "react";
import Button from "../base/Button/Button";
import Dropdown from "../base/Dropdown/Dropdown";
import InputNumber from "../base/InputNumber/InputNumber";
import InputText from "../base/InputText/InputText";
import {
  InputsProps,
  PolyrhythmProp,
  SongProp,
  TimeSignatureProp,
} from "@/models/model";

import TextConstants from "@/constants/textConstants";

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
  const [inputFields, setInputFields] = useState<InputsProps>(initialValues);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "timestamp") {
      const formattedValue = value.replace(/[^\d]/g, "");
      const trimmedValue = formattedValue.slice(0, 4);

      const minutes = trimmedValue.substring(0, 2);
      const seconds = trimmedValue.substring(2, 4);

      const formattedTimestamp = `${minutes}:${seconds}`;

      setInputFields({ ...inputFields, [name]: formattedTimestamp });
    } else {
      setInputFields({ ...inputFields, [name]: value });
    }
  };

  const handleSelectChange =
    (key: keyof InputsProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        [key]: value,
      }));
    };

  const handlePolyrhythmChange =
    (key: "against" | "base") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        typeof inputFields.polyrhythm !== "string" &&
        typeof inputFields.polyrhythm !== "number"
      ) {
        const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
        setInputFields((prevInputFields) => ({
          ...prevInputFields,
          polyrhythm: { ...updatedPolyrhythm, [key]: parseInt(value) },
        }));
      }
    };

  // const handleAgainstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   if (
  //     typeof inputFields.polyrhythm !== "string" &&
  //     typeof inputFields.polyrhythm !== "number"
  //   ) {
  //     const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
  //     setInputFields((prevInputFields) => ({
  //       ...prevInputFields,
  //       polyrhythm: { ...updatedPolyrhythm, against: parseInt(value) },
  //     }));
  //   }
  // };

  // const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { value } = e.target;
  //   if (
  //     typeof inputFields.polyrhythm !== "string" &&
  //     typeof inputFields.polyrhythm !== "number"
  //   ) {
  //     const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
  //     setInputFields((prevInputFields) => ({
  //       ...prevInputFields,
  //       polyrhythm: { ...updatedPolyrhythm, base: parseInt(value) },
  //     }));
  //   }
  // };

  const handleTimeSignatureNumeratorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (
      typeof inputFields.timeSignature !== "string" &&
      typeof inputFields.timeSignature !== "number"
    ) {
      const updatedTimeSignature =
        inputFields.timeSignature as TimeSignatureProp;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        timeSignature: { ...updatedTimeSignature, numerator: parseInt(value) },
      }));
    }
  };

  const handleTimeSignatureDenominatorChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value } = e.target;
    if (
      typeof inputFields.timeSignature !== "string" &&
      typeof inputFields.timeSignature !== "number"
    ) {
      const updatedTimeSignature =
        inputFields.timeSignature as TimeSignatureProp;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        timeSignature: {
          ...updatedTimeSignature,
          denominator: parseInt(value),
        },
      }));
    }
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
      {tableFields.map((field, index) =>
        field === "polyType" ? (
          <Dropdown
            key={index}
            label={polyrhythmTypeLabel}
            field={field}
            inputFields={inputFields}
            types={polyTypes}
            onChange={handleSelectChange("polyType")}
          />
        ) : field === "year" ? (
          <InputNumber
            key={field}
            field={field}
            inputFields={inputFields}
            label={yearLabel}
            min={1950}
            max={2023}
            handleChange={handleInputChange}
          />
        ) : field === "source" ? (
          <Dropdown
            key={index}
            label={sourceLabel}
            field={field}
            inputFields={inputFields}
            types={sourceTypes}
            onChange={handleSelectChange("source")}
          />
        ) : field === "scoreUrl" ? null : field === "polyrhythm" ? (
          <div key={index}>
            <strong>{polyrhythmLabels.heading}</strong>
            <br />
            <div>
              <input
                type="number"
                id="against"
                name="against"
                min="2"
                max="30"
                value={(inputFields.polyrhythm as PolyrhythmProp).against}
                onChange={handlePolyrhythmChange("against")}
              />
            </div>
            <span>{polyrhythmLabels.against}</span>
            <div>
              <input
                type="number"
                id="base"
                name="base"
                min="2"
                max="30"
                value={(inputFields.polyrhythm as PolyrhythmProp).base}
                onChange={handlePolyrhythmChange("base")}
              />
            </div>
          </div>
        ) : field === "timeSignature" ? (
          <div key={index}>
            <strong>{timeSignatureLabel}</strong>
            <br />
            <div>
              <input
                type="number"
                id="timeSignatureNumerator"
                name="timeSignatureNumerator"
                min="2"
                max="30"
                value={
                  (inputFields.timeSignature as TimeSignatureProp).numerator
                }
                onChange={handleTimeSignatureNumeratorChange}
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
                value={
                  (inputFields.timeSignature as TimeSignatureProp).denominator
                }
                onChange={handleTimeSignatureDenominatorChange}
              />
            </div>
          </div>
        ) : (
          <InputText
            key={index}
            field={field}
            handleChange={handleInputChange}
            inputFields={inputFields}
            label={field}
          />
        )
      )}
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
