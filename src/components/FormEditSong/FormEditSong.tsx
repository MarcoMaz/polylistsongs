import { SetStateAction, useEffect, useState } from "react";
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
  const [inputFields, setInputFields] = useState<InputsProps>(initialValues);

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
  }, [selectedSong]);

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

  const handleTimeSignatureChange =
    (key: "numerator" | "denominator") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        typeof inputFields.timeSignature !== "string" &&
        typeof inputFields.timeSignature !== "number"
      ) {
        const updatedTimeSignature =
          inputFields.timeSignature as TimeSignatureProp;
        setInputFields((prevInputFields) => ({
          ...prevInputFields,
          timeSignature: { ...updatedTimeSignature, [key]: parseInt(value) },
        }));
      }
    };

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
            );
          case "timeSignature":
            return (
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
                    onChange={handleTimeSignatureChange("numerator")}
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
                      (inputFields.timeSignature as TimeSignatureProp)
                        .denominator
                    }
                    onChange={handleTimeSignatureChange("denominator")}
                  />
                </div>
              </div>
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
