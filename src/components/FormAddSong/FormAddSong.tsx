import { SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { SongProp } from "../../../pages/api/songs";
import InputText from "../InputText/InputText";

interface FormAddSongProps {
  tableFields: string[];
  songs: SongProp[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface InputsProps {
  [key: string]: string;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  tableFields,
  songs,
  setSongs,
  setIsDialogOpen,
}) => {
  const [inputFields, setInputFields] = useState<InputsProps>({
    title: "",
    album: "",
    artist: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputFields({ ...inputFields, [name]: value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSong = Object.fromEntries(formData.entries());
    const newSongWithID = {
      id: songs.length + 1,
      ...newSong,
    };
    setSongs([...songs, newSongWithID as SongProp]);
    setInputFields({ title: "", album: "", artist: "" });
    setIsDialogOpen(false);
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
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
