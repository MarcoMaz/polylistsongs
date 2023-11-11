import React, { SetStateAction } from "react";
import { SongProp } from "@/models/model";

import Button from "../../../Common/Button/Button";
import FormSong from "../../Presentational/FormSong/FormSong";
import TextConstants from "@/constants/textConstants";

import useSongForm from "@/hooks/useSongForm";

import { initialValues } from "@/constants/initialValues";

interface FormAddSongProps {
  polyTypes: string[];
  songs: SongProp[];
  sourceTypes: string[];
  tableFields: string[];
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
}

const FormAddSong: React.FunctionComponent<FormAddSongProps> = ({
  polyTypes,
  songs,
  sourceTypes,
  tableFields,
  setIsDialogOpen,
  setSongs,
}) => {
  const {
    inputFields,
    handleInputChange,
    handlePolyrhythmChange,
    handleSelectChange,
    handleTimeSignatureChange,
    setInputFields,
  } = useSongForm(initialValues);

  const {
    polyrhythmLabels,
    polyrhythmTypeLabel,
    sourceLabel,
    timeSignatureLabel,
    yearLabel,
  } = TextConstants.formAddSong;

  function generateRandomId(): number {
    return Math.floor(Math.random() * 1000);
  }

  function handleFormSubmit(event: React.FormEvent): void {
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
  }

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
