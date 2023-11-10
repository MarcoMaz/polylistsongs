"use client";
import React, { useState } from "react";
import Link from "next/link";

import Button from "@/components/base/Button/Button";
import Dialog from "@/components/base/Dialog/Dialog";
import FormAddSong from "@/components/FormAddSong/FormAddSong";
import FormEditSong from "@/components/FormEditSong/FormEditSong";
import TableSongs from "@/components/TableSongs/TableSongs";

import { SongProp } from "@/models/model";

import { useAppContext } from "./layout";

import TextConstants from "@/constants/textConstants";
import {
  polyTypes,
  sourceTypes,
  tableFields,
} from "@/constants/tableConstants";

export default function Home() {
  // Context
  const { isDataLoading, isFetchSuccessful, songs, setSongs } = useAppContext();

  // Local state
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongProp | "">("");

  // Text
  const { buttonSearch, loadingData, noSongs } = TextConstants.app;

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
          <Link href="/search">
            <Button type="button" label={buttonSearch} />
          </Link>
          <TableSongs
            tableFields={tableFields}
            songs={songs}
            setSongs={setSongs}
            setSelectedSong={setSelectedSong}
            setIsDialogOpen={setIsDialogOpen}
          />
          <Button type="button" label="+" onClick={addSongButtonClick} />
          <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
            {selectedSong ? (
              <FormEditSong
                tableFields={tableFields}
                selectedSong={selectedSong}
                songs={songs}
                polyTypes={polyTypes}
                sourceTypes={sourceTypes}
                setSongs={setSongs}
                setIsDialogOpen={setIsDialogOpen}
                setSelectedSong={setSelectedSong}
              />
            ) : (
              <FormAddSong
                tableFields={tableFields}
                songs={songs}
                polyTypes={polyTypes}
                sourceTypes={sourceTypes}
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
