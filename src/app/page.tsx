"use client";
import React, { useEffect, useState } from "react";

import { songsData } from "../../pages/api/songs";

import Button from "@/components/base/Button/Button";
import Dialog from "@/components/base/Dialog/Dialog";
import FormAddSong from "@/components/FormAddSong/FormAddSong";
import FormEditSong from "@/components/FormEditSong/FormEditSong";
import TableSongs from "@/components/TableSongs/TableSongs";

import { SongProp } from "@/models/model";

export default function Home() {
  const [songs, setSongs] = useState<SongProp[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [selectedSong, setSelectedSong] = useState<SongProp | "">("");
  const [isDataLoading, setIsDataLoading] = useState<boolean>(true);
  const [isFetchSuccessful, setIsFetchSuccessful] = useState<boolean>(true);

  useEffect(() => {
    async function fetchDataAndSetState() {
      try {
        setIsDataLoading(true);
        setSongs(songsData);
        setIsFetchSuccessful(true);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsFetchSuccessful(false);
      } finally {
        setIsDataLoading(false);
      }
    }
    fetchDataAndSetState();
  }, []);

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
    "scoreUrl",
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
    setSelectedSong("");
  };

  console.log("selectedSOng", selectedSong)

  return (
    <main>
      {isDataLoading && <strong>Data loading...</strong>}
      {songs.length ? (
        <>
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
        !isDataLoading &&
        isFetchSuccessful && <div className="no-data">NO USERS</div>
      )}
    </main>
  );
}
