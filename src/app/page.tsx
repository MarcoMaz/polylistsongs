"use client";
import React, { useState } from "react";

import { SongProp, songsData } from "../../pages/api/songs";

import Button from "@/components/Button/Button";
import FormAddSong from "@/components/FormAddSong/FormAddSong";
import Dialog from "@/components/Dialog/Dialog";
import TableSongs from "@/components/TableSongs/TableSongs";
import FormEditSong from "@/components/FormEditSong/FormEditSong";

export default function Home() {
  const [songs, setSongs] = useState<SongProp[]>(songsData);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongProp | null>(null);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const tableFields: string[] = [
    "title",
    "album",
    "artist",
    "drummer",
    "polyType",
    "year",
    "timestamp",
    "polyrhythm",
    "timeSignature",
    "source",
  ];
  const polyTypes: string[] = ["groove", "section", "fill"];
  const sourceTypes: string[] = [
    "Mike Portnoy Book",
    "Frank Zappa Book",
    "Modern Drummer Collection",
    "Virgil Donati Book",
    "Vinnie Colaiuta Book",
    "My Archive",
    "Minneman Book",
    "Virgil Donati Book",
  ];

  const addSongButtonClick = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setSelectedSong(null);
  };

  return (
    <main>
      <TableSongs
        tableFields={tableFields}
        songs={songs}
        setSongs={setSongs}
        setSelectedSong={setSelectedSong}
        setIsDialogOpen={setIsDialogOpen}
        setIsEditing={setIsEditing}
      />
      <Button type="button" label="+" onClick={addSongButtonClick} />
      <Dialog isOpen={isDialogOpen} onClose={closeDialog}>
        {isEditing ? (
          <FormEditSong
            tableFields={tableFields}
            selectedSong={selectedSong}
            songs={songs}
            polyTypes={polyTypes}
            sourceTypes={sourceTypes}
            setSongs={setSongs}
            setIsDialogOpen={setIsDialogOpen}
            setIsEditing={setIsEditing}
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
    </main>
  );
}
