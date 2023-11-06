import { SetStateAction, useEffect } from "react";
import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

import Button from "../base/Button/Button";
import FormSong from "../FormSong/FormSong";
import TextConstants from "@/constants/textConstants";

import useSongForm from "@/hooks/useSongForm";

import { initialValues } from "@/constants/initialValues";

interface FormEditSongProps {
  selectedSong: SongProp | null;
  tableFields: string[];
  songs: SongProp[];
  polyTypes: string[];
  sourceTypes: string[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | "">>;
}

const FormEditSong: React.FunctionComponent<FormEditSongProps> = ({
  selectedSong,
  tableFields,
  songs,
  polyTypes,
  sourceTypes,
  setSongs,
  setIsDialogOpen,
  setSelectedSong,
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

  const handleFormSubmit = (event: React.FormEvent) => {
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
      <Button type="submit" label="save" />
    </form>
  );
};

export default FormEditSong;
