import { SetStateAction, useState } from "react";
import Button from "../Button/Button";
import { SongProp } from "../../../pages/api/songs";
import InputText from "../InputText/InputText";

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
      year: 2023,
    });
    setIsDialogOpen(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {tableFields.map((field, index) => {
        if (field === "polyType") {
          return (
            <div key={index}>
              <label htmlFor="polytype">Choose the polyrhythmic type:</label>
              <br />
              <select
                name="polytypes"
                id="polytype"
                onChange={handleSelect}
                value={inputFields.polyType}
              >
                {polyTypes.map((polyType, idx) => {
                  return (
                    <option key={idx} value={polyType}>
                      {polyType}
                    </option>
                  );
                })}
              </select>
              <br />
            </div>
          );
        } else if (field === "year") {
          return (
            <div key={index}>
              <label htmlFor="year">year</label>
              <input
                type="number"
                id="year"
                name="year"
                min="1950"
                max="2030"
                onChange={handleInputChange}
                value={inputFields[field]}
              />
            </div>
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
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
