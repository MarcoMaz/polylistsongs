import { SetStateAction, useEffect } from "react";
import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

import Button from "../../../Common/Button/Button";
import FormSong from "../../Presentational/FormSong/FormSong";

import useSongForm from "@/hooks/useSongForm";

import { initialValues } from "@/constants/initialValues";
import TextConstants from "@/constants/textConstants";

interface FormEditSongProps {
  polyTypes: string[];
  selectedSong: SongProp | null;
  songs: SongProp[];
  sourceTypes: string[];
  tableFields: string[];
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | "">>;
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
}

const FormEditSong: React.FunctionComponent<FormEditSongProps> = ({
  polyTypes,
  selectedSong,
  songs,
  sourceTypes,
  tableFields,
  setIsDialogOpen,
  setSelectedSong,
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
  } = TextConstants.formEditSong;

  useEffect(() => {
    if (selectedSong) {
      const {
        title,
        album,
        artist,
        drummer,
        polyType,
        year,
        timestamp,
        polyrhythm,
        timeSignature,
        source,
      } = selectedSong;

      setInputFields({
        title: title,
        album: album,
        artist: artist,
        drummer: drummer,
        polyType: polyType,
        year: year,
        timestamp: timestamp,
        polyrhythm: polyrhythm,
        timeSignature: timeSignature,
        source: source,
      });
    }
  }, [selectedSong, setInputFields]);

  function handleFormSubmit(event: React.FormEvent): void {
    event.preventDefault();
    if (selectedSong) {
      const formData = new FormData(event.target as HTMLFormElement);
      const formDataEntries: [string, FormDataEntryValue][] = [
        ...formData.entries(),
      ];

      const updatedPolyrhythm: Partial<PolyrhythmProp> = {};
      const updatedTimeSignature: Partial<TimeSignatureProp> = {};
      const updatedSong: Record<
        string,
        string | PolyrhythmProp | TimeSignatureProp
      > = {};

      for (let pair of formDataEntries) {
        if (pair[0] === "against" || pair[0] === "base") {
          updatedPolyrhythm[pair[0]] = parseInt(pair[1] as string);
        } else if (pair[0] === "numerator" || pair[0] === "denominator") {
          updatedTimeSignature[pair[0]] = parseInt(pair[1] as string);
        } else {
          updatedSong[pair[0]] = String(pair[1]);
        }
      }

      updatedSong.polyrhythm = {
        ...(inputFields.polyrhythm as PolyrhythmProp),
        ...updatedPolyrhythm,
      };
      updatedSong.timeSignature = {
        ...(inputFields.timeSignature as TimeSignatureProp),
        ...updatedTimeSignature,
      };
      const updatedSongs = songs.map((song) => {
        if (song.id === selectedSong.id) {
          return { ...song, ...updatedSong };
        }
        return song;
      });

      setSongs(updatedSongs);
      setIsDialogOpen(false);
      setSelectedSong("");
    }
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
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormEditSong;
