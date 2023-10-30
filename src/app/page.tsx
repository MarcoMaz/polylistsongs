"use client";
import React, { useState } from "react";

import { SongProp, songsData } from "../../pages/api/songs";

import Button from "@/components/Button/Button";
import FormAddSong from "@/components/FormAddSong/FormAddSong";
import Dialog from "@/components/Dialog/Dialog";
import TableSongs from "@/components/TableSongs/TableSongs";

export default function Home() {
  const [songs, setSongs] = useState<SongProp[]>(songsData);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);

  const tableFields: string[] = ["title", "album", "artist"];

  const addSongButtonClick = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <main>
      <TableSongs tableFields={tableFields} songs={songs} setSongs={setSongs}/>
      <Button type="button" label="+" onClick={addSongButtonClick} />
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        <FormAddSong
          tableFields={tableFields}
          songs={songs}
          setSongs={setSongs}
          setIsDialogOpen={setIsDialogOpen}
        />
      </Dialog>
    </main>
  );
}
