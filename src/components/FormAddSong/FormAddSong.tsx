import Button from "../Button/Button";

interface FormAddSongProps {
  inputFields: string[];
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  inputFields,
}) => {
  const inputFieldsWithoutID = [...inputFields].splice(1);

  const handleButtonSendClick = () => {
    console.log("send")
  }

  return (
    <form>
      {inputFieldsWithoutID.map((field, index) => {
        return (
          <div key={index}>
            <label htmlFor={field}>{`Enter your ${field}:`}</label>
            <input type="text" name={field} id={field} required />
          </div>
        );
      })}
      <Button type="submit" label="send" onCLick={handleButtonSendClick}/>
    </form>
  );
};

export default FormAddSong;
