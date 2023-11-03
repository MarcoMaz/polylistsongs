import { SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { SongProp } from "../../../pages/api/songs";
import InputText from "../InputText/InputText";
import InputNumber from "../InputNumber/InputNumber";
import Dropdown from "../Dropdown/Dropdown";

interface FormAddSongProps {
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

export interface InputsProps {
  [key: string]: string | number;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  tableFields,
  songs,
  polyTypes,
  setSongs,
  setIsDialogOpen,
}) => {
  const [inputFields, setInputFields] = useState<InputsProps>({
    title: "",
    album: "",
    artist: "",
    drummer: "",
    polyType: "groove",
    year: 2023,
  });

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000);
  };

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
    const formData = new FormData(event.target as HTMLFormElement);
    const newSong = Object.fromEntries(formData.entries());
    const newSongWithID = {
      id: generateRandomId(),
      ...newSong,
      polyType: inputFields.polyType,
    };
    setSongs([...songs, newSongWithID as SongProp]);
    setInputFields({
      title: "",
      album: "",
      artist: "",
      drummer: "",
      polyType: "groove",
      year: 2023,
    });
    setIsDialogOpen(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {tableFields.map((field, index) =>
        field === "polyType" ? (
          <Dropdown
            key={index}
            label="Choose the polyrhythmic type:"
            field={field}
            inputFields={inputFields}
            polyTypes={polyTypes}
            onChange={handleSelect}
          />
        ) : field === "year" ? (
          <InputNumber
            key={field}
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
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
