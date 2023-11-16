"use client";
import React, { useState } from "react";

import Button from "../components/common/Button/Button";
import Dialog from "../components/common/Dialog/Dialog";
import FormAddSong from "../components/TableFeature/Container/FormAddSong/FormAddSong";
import FormEditSong from "../components/TableFeature/Container/FormEditSong/FormEditSong";
import TableSongs from "../components/TableFeature/Container/TableSongs/TableSongs";

import '../styles/main.scss';

import { SongProp } from "@/models/model";

import { useAppContext } from "./layout";

import TextConstants from "@/constants/textConstants";

export default function Home() {
  // Context
  const { isDataLoading, isFetchSuccessful, songs, setSongs } = useAppContext();

  // Local state
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongProp | "">("");

  // Text
  const { loadingData, noSongs } = TextConstants.app;
  const { addSongButton, tableFields, polyTypes, sources } =
    TextConstants.tableSong;

  function addSongButtonClick() {
    setIsDialogOpen(true);
  }

  function closeDialog() {
    setIsDialogOpen(false);
    setSelectedSong("");
  }

  return (
    <main>
      {isDataLoading && <strong>{loadingData}</strong>}
      {songs.length ? (
        <>
          <Button
            type="button"
            additionalClassnames={["add-song"]}
            icon="plus"
            label={addSongButton}
            variant="CTA"
            onClick={addSongButtonClick}
          />
          <section>
            <TableSongs
              tableFields={tableFields}
              songs={songs}
              setSongs={setSongs}
              setSelectedSong={setSelectedSong}
              setIsDialogOpen={setIsDialogOpen}
            />
          </section>
          <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
            {selectedSong ? (
              <FormEditSong
                tableFields={tableFields}
                selectedSong={selectedSong}
                songs={songs}
                polyTypes={polyTypes}
                sourceTypes={sources}
                setSongs={setSongs}
                setIsDialogOpen={setIsDialogOpen}
                setSelectedSong={setSelectedSong}
              />
            ) : (
              <FormAddSong
                tableFields={tableFields}
                songs={songs}
                polyTypes={polyTypes}
                sourceTypes={sources}
                setSongs={setSongs}
                setIsDialogOpen={setIsDialogOpen}
              />
            )}
          </Dialog>
        </>
      ) : (
        !isDataLoading && isFetchSuccessful && <div>{noSongs}</div>
      )}
    </main>
  );
}
