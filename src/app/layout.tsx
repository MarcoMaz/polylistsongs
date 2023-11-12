"use client";
import { createContext, useContext, useEffect, useState } from "react";

import "./globals.css";
import { Inter } from "next/font/google";
import { songsData } from "../../pages/api/songs";

import Header from "../components/Header/Header";

import { SongProp } from "@/models/model";

interface AppContextType {
  isDataLoading: boolean;
  isFetchSuccessful: boolean;
  songs: SongProp[];
  setSongs: React.Dispatch<React.SetStateAction<SongProp[]>>;
}

const AppContext = createContext<AppContextType>({
  isDataLoading: false,
  isFetchSuccessful: true,
  songs: [],
  setSongs: () => {},
});

export function useAppContext() {
  return useContext(AppContext);
}

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [songs, setSongs] = useState<SongProp[]>([]);
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
  }, [setSongs]);

  return (
    <html lang="en">
      <body className={inter.className}>
        <AppContext.Provider
          value={{
            isDataLoading,
            isFetchSuccessful,
            songs,
            setSongs,
          }}
        >
          <Header />
          {children}
        </AppContext.Provider>
      </body>
    </html>
  );
}
