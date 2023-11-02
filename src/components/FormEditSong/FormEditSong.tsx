import { SetStateAction, useEffect, useState } from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import { SongProp } from "../../../pages/api/songs";
import Dropdown from "../Dropdown/Dropdown";

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
  [key: string]: string;
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
  });

  useEffect(() => {
    if (selectedSong) {
      const { title, album, artist, drummer, polyType } = selectedSong;
      setInputFields({
        title: title,
        album: album,
        artist: artist,
        drummer: drummer,
        polyType: polyType,
      });
    }
  }, [selectedSong]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
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
      const updatedSong = Object.fromEntries(formData.entries());
      updatedSong.polyType = inputFields.polyType;
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
      {tableFields.map((field, index) => {
        if (field === "polyType") {
          return (
            <Dropdown
              key={index}
              label="Choose the polyrhythmic type:"
              field={field}
              onChange={handleSelect}
              inputFields={inputFields}
              polyTypes={polyTypes}
            />
          );
        } else {
          return (
            <InputText
              key={index}
              field={field}
              handleChange={handleInputChange}
              inputFields={inputFields}
            />
          );
        }
      })}
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormAddSong;
