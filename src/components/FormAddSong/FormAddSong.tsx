import { useState } from "react";
import Button from "../Button/Button";

interface FormAddSongProps {
  inputFields: string[];
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  inputFields,
}) => {
  const inputFieldsWithoutID = [...inputFields].splice(1);
  const [formData, setFormData] = useState<Record<string, string>>({});

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFormData({});
    console.log(formData)
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {inputFieldsWithoutID.map((field, index) => {
        return (
          <div key={index}>
            <label htmlFor={field}>{`Enter your ${field}:`}</label>
            <input
              type="text"
              name={field}
              id={field}
              required
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
