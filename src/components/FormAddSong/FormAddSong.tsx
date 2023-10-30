import { SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { SongProp } from "../../../pages/api/songs";

interface FormAddSongProps {
  tableFields: string[];
  songs: SongProp[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
}

interface InputsProps {
  [key: string]: string;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  tableFields,
  songs,
  setSongs,
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
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {tableFields.map((field, index) => {
        return (
          <div key={index}>
            <label htmlFor={field}>{`Enter your ${field}:`}</label>
            <input
              type="text"
              name={field}
              id={field}
              required
              value={inputFields[field]}
              onChange={handleInputChange}
            />
          </div>
        );
      })}
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
