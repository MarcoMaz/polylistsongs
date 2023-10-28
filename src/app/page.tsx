"use client";
import Table from '@/components/Table/Table';
import React from 'react';

import { songsData } from '../../pages/api/songs';

export default function Home() { 
  const tableHeaderData: string[] = Object.keys(songsData[0]);

  return (
    <main>
      <Table header={tableHeaderData} songsData={songsData} />
    </main>
  )
}
