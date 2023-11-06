import React, { SetStateAction } from "react";
import { SongProp } from "@/models/model";

import Button from "../base/Button/Button";
import FormSong from "../FormSong/FormSong";
import TextConstants from "@/constants/textConstants";

import useSongForm from "@/hooks/useSongForm";

import { initialValues } from "@/constants/initialValues";

interface FormAddSongProps {
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  sourceTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  tableFields,
  songs,
  polyTypes,
  sourceTypes,
  setSongs,
  setIsDialogOpen,
}) => {
  const {
    inputFields,
    setInputFields,
    handleInputChange,
    handleSelectChange,
    handlePolyrhythmChange,
    handleTimeSignatureChange,
  } = useSongForm(initialValues);

  const {
    polyrhythmTypeLabel,
    yearLabel,
    sourceLabel,
    polyrhythmLabels,
    timeSignatureLabel,
  } = TextConstants.formAddSong;

  const generateRandomId = () => {
    return Math.floor(Math.random() * 1000);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const newSong = Object.fromEntries(formData.entries());
    const newSongWithID = {
      id: generateRandomId(),
      ...newSong,
      polyType: inputFields.polyType,
      polyrhythm: inputFields.polyrhythm,
      timeSignature: inputFields.timeSignature,
    };

    setSongs([...songs, newSongWithID as SongProp]);
    setInputFields(initialValues);
    setIsDialogOpen(false);
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <FormSong
        handleSelectChange={handleSelectChange}
        inputFields={inputFields}
        polyrhythmLabels={polyrhythmLabels}
        polyrhythmTypeLabel={polyrhythmTypeLabel}
        polyTypes={polyTypes}
        sourceLabel={sourceLabel}
        sourceTypes={sourceTypes}
        tableFields={tableFields}
        timeSignatureLabel={timeSignatureLabel}
        handleInputChange={handleInputChange}
        handlePolyrhythmChange={handlePolyrhythmChange}
        handleTimeSignatureChange={handleTimeSignatureChange}
        yearLabel={yearLabel}
      />
      <Button type="submit" label="send" />
    </form>
  );
};

export default FormAddSong;
