"use client";
import TableSongs from '@/components/TableSongs/TableSongs';
import React from 'react';

import { songsData } from '../../pages/api/songs';

export default function Home() { 
  const tableHeaderData: string[] = Object.keys(songsData[0]);

  return (
    <main>
      <TableSongs header={tableHeaderData} songsData={songsData} />
    </main>
  )
}
