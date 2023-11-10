/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../layout";
import { filterSongs } from "./utils/filtering";
import { sortingSongs } from "./utils/sorting";

import Checkbox from "@/components/base/Checkbox/Checkbox";
import CheckboxPair from "@/components/CheckboxPair/CheckboxPair";

import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

import { songsData } from "../../../pages/api/songs";
import {
  ARTISTS,
  DRUMMERS,
  POLY_TYPES,
  POLYRHYTHMS,
  TIME_SIGNATURES,
} from "@/constants/searchConstants";
import Results from "@/components/Results/Results";
import InputSearch from "@/components/base/InputSearch/InputSearch";
import TextConstants from "@/constants/textConstants";

const Search = () => {
  // Context
  const { songs } = useAppContext();

  // Local state
  const [selectedDrummers, setSelectedDrummers] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedPolytypes, setSelectedPolytypes] = useState<string[]>([]);
  const [selectedPolyrhythms, setSelectedPolyrhythms] = useState<
    (PolyrhythmProp & { selected: boolean })[]
  >([]);
  const [selectedTimeSignatures, setSelectedTimeSignatures] = useState<
    (TimeSignatureProp & { selected: boolean })[]
  >([]);
  const [showScore, setShowScore] = useState<boolean>(false);
  const [filteredSongsData, setFilteredSongsData] = useState<SongProp[]>([]);
  const [sortBy, setSortBy] = useState<string>("titleAtoZ");
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Text
  const { inputLabel } = TextConstants.searchHeader;

  useEffect(() => {
    const updatedFilteredSongs = songs
      .filter((song) =>
        filterSongs(
          song,
          searchQuery,
          selectedDrummers,
          selectedArtists,
          selectedPolytypes,
          selectedPolyrhythms,
          selectedTimeSignatures,
          showScore
        )
      )
      .sort(sortingSongs(sortBy));
    setFilteredSongsData(updatedFilteredSongs);
  }, [
    searchQuery,
    songs,
    selectedDrummers,
    selectedArtists,
    selectedPolytypes,
    selectedPolyrhythms,
    selectedTimeSignatures,
    showScore,
    sortBy,
  ]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleSelection = (
    item: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    selectedItems: string[]
  ) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handlePolyrhythmSelection = (index: number): void => {
    const updatedPolyrhythms = [...POLYRHYTHMS] as (PolyrhythmProp & {
      selected: boolean;
    })[];
    updatedPolyrhythms[index].selected = !updatedPolyrhythms[index].selected;
    setSelectedPolyrhythms(
      updatedPolyrhythms.filter((polyrhythm) => polyrhythm.selected)
    );
  };

  const handleTimeSignatureSelection = (index: number): void => {
    const updatedTimeSignature = [...TIME_SIGNATURES] as (TimeSignatureProp & {
      selected: boolean;
    })[];
    updatedTimeSignature[index].selected =
      !updatedTimeSignature[index].selected;
    setSelectedTimeSignatures(
      updatedTimeSignature.filter((timeSignature) => timeSignature.selected)
    );
  };

  const handleShowScore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowScore(e.target.checked);
  };

  return (
    <div className="container">
      <header>
        <Results data={filteredSongsData} />
        <InputSearch
          label={inputLabel}
          id="site-search"
          value={searchQuery}
          handleChange={handleSearchChange}
        />
        <select
          name="songs-order"
          id="songs-order"
          onChange={handleSortChange}
          value={sortBy}
        >
          <option value="titleAtoZ">Title (A-Z)</option>
          <option value="titleZtoA">Title (Z-A)</option>
          <option value="drummerAtoZ">Drummer (A-Z)</option>
          <option value="drummerZtoA">Drummer (Z-A)</option>
          <option value="artistAtoZ">Artist (A-Z)</option>
          <option value="artistZtoA">Artist (Z-A)</option>
        </select>
        <button>grid</button>
        <div>
          <input
            aria-orientation="vertical"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="11"
          />
        </div>
        <Link href={"/"}>
          <button>home</button>
        </Link>
      </header>
      <aside>
        <Checkbox
          items={DRUMMERS}
          selectedItems={selectedDrummers}
          onSelection={(drummer) =>
            handleSelection(drummer, setSelectedDrummers, selectedDrummers)
          }
          label="Drummers"
          songsData={songsData}
          type="drummer"
        />
        <Checkbox
          items={ARTISTS}
          selectedItems={selectedArtists}
          onSelection={(artist) =>
            handleSelection(artist, setSelectedArtists, selectedArtists)
          }
          label="Artists"
          songsData={songsData}
          type="artist"
        />
        <Checkbox
          items={POLY_TYPES}
          selectedItems={selectedPolytypes}
          onSelection={(polyType) =>
            handleSelection(polyType, setSelectedPolytypes, selectedPolytypes)
          }
          label="Types"
          songsData={songsData}
          type="polyType"
        />
        <CheckboxPair
          data={POLYRHYTHMS}
          heading="Polyrhythms"
          selectedData={selectedPolyrhythms}
          onSelection={handlePolyrhythmSelection}
          songsData={songsData}
          type="polyrhythm"
        />
        <CheckboxPair
          data={TIME_SIGNATURES}
          heading="Time Signatures"
          selectedData={selectedTimeSignatures}
          onSelection={handleTimeSignatureSelection}
          songsData={songsData}
          type="timeSignature"
        />
        <strong>Score</strong>
        <div>
          <input
            type="checkbox"
            id="score"
            name="score"
            checked={showScore}
            onChange={handleShowScore}
          />
          <label htmlFor="score">Score</label>
        </div>
      </aside>
      <main>
        <ul>
          {filteredSongsData.map(
            (
              {
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
                scoreUrl,
              },
              index
            ) => {
              return (
                <li key={index}>
                  <details>
                    <summary>
                      {title} by {artist} - {polyrhythm.against}:
                      {polyrhythm.base}
                    </summary>
                    {title} by {artist}, from <em>{album}</em> ({year})<br />
                    drummer: {drummer} - type: {polyType} <br />
                    <br />
                    {polyrhythm.against}:{polyrhythm.base} starting at{" "}
                    {timestamp} <br />
                    <br />
                    Time signature: {timeSignature.numerator} -{" "}
                    {timeSignature.denominator} <br />
                    <br />
                    {scoreUrl && (
                      <>
                        score{" "}
                        <img
                          src={scoreUrl}
                          alt="image"
                          width={20}
                          height={20}
                        />{" "}
                        <br />
                        <br />
                      </>
                    )}
                    source: {source}
                  </details>
                </li>
              );
            }
          )}
        </ul>
        {filteredSongsData.length === 0 && <Results data={filteredSongsData} />}
      </main>
    </div>
  );
};

export default Search;
