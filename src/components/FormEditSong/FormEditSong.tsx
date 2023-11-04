import { SetStateAction, useEffect, useState } from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import { PolyrhythmProp, SongProp } from "../../../pages/api/songs";
import Dropdown from "../Dropdown/Dropdown";
import InputNumber from "../InputNumber/InputNumber";

interface FormEditSongProps {
  selectedSong: SongProp | null;
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}

export interface InputsProps {
  [key: string]: string | number | PolyrhythmProp;
}

const FormEditSong: React.FunctionComponent<FormEditSongProps> = ({
  selectedSong,
  tableFields,
  songs,
  polyTypes,
  setSongs,
  setIsDialogOpen,
  setIsEditing,
}) => {
  const [inputFields, setInputFields] = useState<InputsProps>({
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
  });

  useEffect(() => {
    if (selectedSong) {
      const { title, album, artist, drummer, polyType, year, timestamp, polyrhythm } =
        selectedSong;
      setInputFields({
        title: title,
        album: album,
        artist: artist,
        drummer: drummer,
        polyType: polyType,
        year: year,
        timestamp: timestamp,
        polyrhythm: polyrhythm
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      polyType: value,
    }));
  };

  const handleAgainstChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      typeof inputFields.polyrhythm !== "string" &&
      typeof inputFields.polyrhythm !== "number"
    ) {
      const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        polyrhythm: { ...updatedPolyrhythm, against: parseInt(value) },
      }));
    }
  };

  const handleBaseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      typeof inputFields.polyrhythm !== "string" &&
      typeof inputFields.polyrhythm !== "number"
    ) {
      const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        polyrhythm: { ...updatedPolyrhythm, base: parseInt(value) },
      }));
    }
  };


  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedSong) {
      const formData = new FormData(event.target as HTMLFormElement);
      const updatedSong: Record<string, string | PolyrhythmProp> = {};
      const updatedPolyrhythm: Partial<PolyrhythmProp> = {};
      const formDataEntries: [string, FormDataEntryValue][] = [...formData.entries()];
      for (let pair of formDataEntries) {
        if (pair[0] === 'against' || pair[0] === 'base') {
          updatedPolyrhythm[pair[0]] = parseInt(pair[1] as string);
        } else {
          updatedSong[pair[0]] = String(pair[1]);
        }
      }
      updatedSong.polyrhythm = {
        ...inputFields.polyrhythm as PolyrhythmProp,
        ...updatedPolyrhythm,
      };
      updatedSong.polyType = String(inputFields.polyType);
      const updatedSongs = songs.map((song) => {
        if (song.id === selectedSong.id) {
          return { ...song, ...updatedSong };
        }
        return song;
      });
      setSongs(updatedSongs);
      setIsDialogOpen(false);
      setIsEditing(false);
    }
  };
    
  return (
    <form onSubmit={handleFormSubmit}>
      {tableFields.map((field, index) =>
        field === "polyType" ? (
          <Dropdown
            key={index}
            label="Choose the polyrhythmic type:"
            field={field}
            onChange={handleSelect}
            inputFields={inputFields}
            polyTypes={polyTypes}
          />
        ) : field === "year" ? (
          <InputNumber
            key={index}
            field={field}
            inputFields={inputFields}
            label="year"
            min={1950}
            max={2023}
            handleChange={handleInputChange}
          />
        ) : field === "polyrhythm" ? (
          <div key={index}>
            <div>
              <label htmlFor="against">Against</label>
              <input
                type="number"
                id="against"
                name="against"
                min="2"
                max="30"
                value={(inputFields.polyrhythm as PolyrhythmProp).against}
                onChange={handleAgainstChange}
              />
            </div>
            <div>
              <label htmlFor="base">Base</label>
              <input
                type="number"
                id="base"
                name="base"
                min="2"
                max="30"
                value={(inputFields.polyrhythm as PolyrhythmProp).base}
                onChange={handleBaseChange}
              />
            </div>
          </div>
        ) : (
          <InputText
            key={index}
            field={field}
            handleChange={handleInputChange}
            inputFields={inputFields}
          />
        )
      )}
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormEditSong;
