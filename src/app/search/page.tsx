/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { songsData } from "../../../pages/api/songs";
import Link from "next/link";
import { PolyrhythmProp, TimeSignatureProp } from "@/models/model";
import Checkbox from "@/components/base/Checkbox/Checkbox";
import CheckboxPair from "@/components/CheckboxPair/CheckboxPair";

const DRUMMERS: string[] = [...new Set(songsData.map((song) => song.drummer))];
const ARTISTS: string[] = [...new Set(songsData.map((song) => song.artist))];
const POLY_TYPES: string[] = [
  ...new Set(songsData.map((song) => song.polyType)),
];
const POLYRHYTHMS = songsData
  .map((song) => song.polyrhythm)
  .filter(
    (song, index, self) =>
      index ===
      self.findIndex((s) => s.against === song.against && s.base === song.base)
  );
const TIME_SIGNATURES = songsData
  .map((song) => song.timeSignature)
  .filter(
    (song, index, self) =>
      index ===
      self.findIndex(
        (s) =>
          s.numerator === song.numerator && s.denominator === song.denominator
      )
  );

const Search = () => {
  const [selectedDrummers, setSelectedDrummers] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedPolytypes, setSelectedPolytypes] = useState<string[]>([]);
  const [selectedPolyrhythms, setSelectedPolyrhythms] = useState<
    (PolyrhythmProp & { selected: boolean })[]
  >([]);
  const [selectedTimeSignatures, setSelectedTimeSignatures] = useState<
    (TimeSignatureProp & { selected: boolean })[]
  >([]);
  const [showScore, setShowScore] = useState(false);

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

  const filteredSongsData = songsData.filter((song) => {
    if (
      (selectedDrummers.length === 0 ||
        selectedDrummers.includes(song.drummer)) &&
      (selectedArtists.length === 0 || selectedArtists.includes(song.artist)) &&
      (selectedPolytypes.length === 0 ||
        selectedPolytypes.includes(song.polyType))
    ) {
      if (
        selectedPolyrhythms.length === 0 ||
        selectedPolyrhythms.some(
          (poly) =>
            poly.against === song.polyrhythm.against &&
            poly.base === song.polyrhythm.base
        )
      ) {
        if (
          selectedTimeSignatures.length === 0 ||
          selectedTimeSignatures.some(
            (timeSig) =>
              timeSig.numerator === song.timeSignature.numerator &&
              timeSig.denominator === song.timeSignature.denominator
          )
        ) {
          if (showScore) {
            return !!song.scoreUrl;
          }
          return true;
        }
      }
    }
    return false;
  });

  const numberOfResults =
    filteredSongsData.length === 1
      ? "1 song found"
      : `${filteredSongsData.length} songs found`;

  return (
    <div className="container">
      <header>
        {numberOfResults}
        {/* <div>
          <label htmlFor="site-search">Search the site:</label>
          <input type="search" id="site-search" name="q" />
          <button>Search</button>
        </div> */}
        <select name="songs-order" id="songs-order">
          <option value="titleAtoZ">Title (A-Z)</option>
          <option value="titleZtoA">Title (Z-A)</option>
          <option value="drummerAtoZ">Drummer (A-Z)</option>
          <option value="drummerZtoA">Drummer (Z-A)</option>
          <option value="artistAtoZ">Artist (A-Z)</option>
          <option value="artistZtoA">Artist (Z-A)</option>
        </select>
        {/* <button>grid</button>
        <div>
          <input
            aria-orientation="vertical"
            type="range"
            id="volume"
            name="volume"
            min="0"
            max="11"
          />
        </div> */}
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
      </main>
    </div>
  );
};

export default Search;
