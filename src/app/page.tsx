"use client";
import TableSongs from '@/components/TableSongs/TableSongs';
import React, { useState } from 'react';

import { songsData } from '../../pages/api/songs';
import FormAddSong from '@/components/FormAddSong/FormAddSong';

export default function Home() { 
  const [ songs, setSongs ] = useState(songsData);

  const tableFields: string[] = ["title", "album", "artist"];


  return (
    <main>
      <TableSongs tableFields={tableFields} songs={songs} />
      <FormAddSong tableFields={tableFields} songs={songs} setSongs={setSongs} />
    </main>
  )
}
