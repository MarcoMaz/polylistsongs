import { SetStateAction, useEffect, useState } from "react";
import Button from "../base/Button/Button";
import Dropdown from "../base/Dropdown/Dropdown";
import InputNumber from "../base/InputNumber/InputNumber";
import InputText from "../base/InputText/InputText";
import {
  PolyrhythmProp,
  SongProp,
  TimeSignatureProp,
} from "@/models/model";

import TextConstants from "@/constants/textConstants";
import PolyrhythmsInput from "../PolyrhythmsInput/PolyrhythmsInput";
import TimeSignaturesInput from "../TimeSignaturesInput/TimeSignaturesInput";
import useSongForm from "@/hooks/useSongForm";

const initialValues = {
  title: "",
  album: "",
  artist: "",
  drummer: "",
  polyType: "",
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
  source: "",
};

interface FormEditSongProps {
  selectedSong: SongProp | null;
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  sourceTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | "">>;
}

const FormEditSong: React.FunctionComponent<FormEditSongProps> = ({
  selectedSong,
  tableFields,
  songs,
  polyTypes,
  sourceTypes,
  setSongs,
  setIsDialogOpen,
  setSelectedSong,
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
  } = TextConstants.formEditSong;

  useEffect(() => {
    if (selectedSong) {
      const {
        title,
        album,
        artist,
        drummer,
        polyType,
        year,
        timestamp,
        polyrhythm,
        timeSignature,
        source,
      } = selectedSong;
      setInputFields({
        title: title,
        album: album,
        artist: artist,
        drummer: drummer,
        polyType: polyType,
        year: year,
        timestamp: timestamp,
        polyrhythm: polyrhythm,
        timeSignature: timeSignature,
        source: source,
      });
    }
  }, [selectedSong, setInputFields]);

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedSong) {
      const formData = new FormData(event.target as HTMLFormElement);
      const formDataEntries: [string, FormDataEntryValue][] = [
        ...formData.entries(),
      ];

      const updatedPolyrhythm: Partial<PolyrhythmProp> = {};
      const updatedTimeSignature: Partial<TimeSignatureProp> = {};
      const updatedSong: Record<
        string,
        string | PolyrhythmProp | TimeSignatureProp
      > = {};

      for (let pair of formDataEntries) {
        if (pair[0] === "against" || pair[0] === "base") {
          updatedPolyrhythm[pair[0]] = parseInt(pair[1] as string);
        } else if (pair[0] === "numerator" || pair[0] === "denominator") {
          updatedTimeSignature[pair[0]] = parseInt(pair[1] as string);
        } else {
          updatedSong[pair[0]] = String(pair[1]);
        }
      }

      updatedSong.polyrhythm = {
        ...(inputFields.polyrhythm as PolyrhythmProp),
        ...updatedPolyrhythm,
      };
      updatedSong.timeSignature = {
        ...(inputFields.timeSignature as TimeSignatureProp),
        ...updatedTimeSignature,
      };
      const updatedSongs = songs.map((song) => {
        if (song.id === selectedSong.id) {
          return { ...song, ...updatedSong };
        }
        return song;
      });

      setSongs(updatedSongs);
      setIsDialogOpen(false);
      setSelectedSong("");
    }
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
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormEditSong;
