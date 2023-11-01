import { SetStateAction, useEffect, useState } from "react";
import Button from "../Button/Button";
import InputText from "../InputText/InputText";
import { SongProp } from "../../../pages/api/songs";

interface FormAddSongProps {
  selectedSong: SongProp | null;
  tableFields: string[];
  songs: SongProp[];
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
  setSongs,
  setIsDialogOpen,
  setIsEditing,
}) => {
  const [inputFields, setInputFields] = useState<InputsProps>({
    title: "",
    album: "",
    artist: "",
  });

  useEffect(() => {
    if (selectedSong) {
      const { title, album, artist } = selectedSong;
      setInputFields({ title: title, album: album, artist: artist });
    }
  }, [selectedSong]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedSong) {
      const formData = new FormData(event.target as HTMLFormElement);
      const updatedSong = Object.fromEntries(formData.entries());
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
        return (
          <InputText
            key={index}
            field={field}
            handleChange={handleInputChange}
            inputFields={inputFields}
          />
        );
      })}
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormAddSong;
