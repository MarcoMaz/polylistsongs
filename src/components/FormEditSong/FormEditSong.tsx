import { SetStateAction, useEffect, useState } from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import { SongProp } from "../../../pages/api/songs";
import Dropdown from "../Dropdown/Dropdown";
import InputNumber from "../InputNumber/InputNumber";

interface FormAddSongProps {
  selectedSong: SongProp | null;
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}

export interface InputsProps {
  [key: string]: string | number;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
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
  });

  useEffect(() => {
    if (selectedSong) {
      const { title, album, artist, drummer, polyType, year, timestamp } =
        selectedSong;
      setInputFields({
        title: title,
        album: album,
        artist: artist,
        drummer: drummer,
        polyType: polyType,
        year: year,
        timestamp: timestamp,
      });
    }
  }, [selectedSong]);

  const isValidTimestamp = (timestamp: string): boolean => {
    const timestampRegex = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    return timestampRegex.test(timestamp);
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

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    setInputFields((prevInputFields) => ({
      ...prevInputFields,
      polyType: value,
    }));
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedSong) {
      const formData = new FormData(event.target as HTMLFormElement);
      const updatedSong: Record<string, string> = {};
      const formDataEntries: [string, FormDataEntryValue][] = [
        ...formData.entries(),
      ];
      for (let pair of formDataEntries) {
        updatedSong[pair[0]] = String(pair[1]);
      }
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

export default FormAddSong;
