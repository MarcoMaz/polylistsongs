/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { songsData } from "../../../pages/api/songs";
import Link from "next/link";
import { PolyrhythmProp, TimeSignatureProp } from "@/models/model";
import Checkbox from "@/components/base/Checkbox/Checkbox";

const Search = () => {
  const drummers: string[] = [
    ...new Set(songsData.map((song) => song.drummer)),
  ];
  const artists: string[] = [...new Set(songsData.map((song) => song.artist))];
  const polyTypes: string[] = [
    ...new Set(songsData.map((song) => song.polyType)),
  ];

  const polys = songsData.map((song) => song.polyrhythm);
  const uniquePolys = polys.filter(
    (song, index, self) =>
      index ===
      self.findIndex((s) => s.against === song.against && s.base === song.base)
  );

  const timeSig = songsData.map((song) => song.timeSignature);
  const uniqueTimeSig = timeSig.filter(
    (song, index, self) =>
      index ===
      self.findIndex(
        (s) =>
          s.numerator === song.numerator && s.denominator === song.denominator
      )
  );

  const [selectedDrummers, setSelectedDrummers] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedPolytypes, setSelectedPolytypes] = useState<string[]>([]);
  const [selectedUniquePolys, setSelectedUniquePolys] = useState<
    (PolyrhythmProp & { selected: boolean })[]
  >([]);
  const [selectedUniqueTimeSig, setSelectedUniqueTimeSig] = useState<
    (TimeSignatureProp & { selected: boolean })[]
  >([]);

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

  const handlePolySelection = (index: number): void => {
    const updatedPolys = [...uniquePolys] as (PolyrhythmProp & {
      selected: boolean;
    })[];
    updatedPolys[index].selected = !updatedPolys[index].selected;
    setSelectedUniquePolys(updatedPolys.filter((x) => x.selected));
  };

  const handleTimeSigSelection = (index: number): void => {
    const updatedTimeSig = [...uniqueTimeSig] as (TimeSignatureProp & {
      selected: boolean;
    })[];
    updatedTimeSig[index].selected = !updatedTimeSig[index].selected;
    setSelectedUniqueTimeSig(updatedTimeSig.filter((x) => x.selected));
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
        selectedUniquePolys.length === 0 ||
        selectedUniquePolys.some(
          (poly) =>
            poly.against === song.polyrhythm.against &&
            poly.base === song.polyrhythm.base
        )
      ) {
        return (
          selectedUniqueTimeSig.length === 0 ||
          selectedUniqueTimeSig.some(
            (timeSig) =>
              timeSig.numerator === song.timeSignature.numerator &&
              timeSig.denominator === song.timeSignature.denominator
          )
        );
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
        </div>
        <select name="pets" id="pet-select">
          <option value="">--Please choose an option--</option>
          <option value="dog">Title: A to Z</option>
          <option value="cat">Title: Z to A</option>
          <option value="hamster">Drummer: A to Z</option>
          <option value="parrot">Drummer: Z to A</option>
          <option value="spider">Artist: A to Z</option>
          <option value="goldfish">Artist: Z to A</option>
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
        </div> */}
        <Link href={"/"}>
          <button>home</button>
        </Link>
      </header>
      <aside>
        <Checkbox
          items={drummers}
          selectedItems={selectedDrummers}
          onSelection={(drummer) =>
            handleSelection(drummer, setSelectedDrummers, selectedDrummers)
          }
          label="Drummers"
        />
        <Checkbox
          items={artists}
          selectedItems={selectedArtists}
          onSelection={(artist) =>
            handleSelection(artist, setSelectedArtists, selectedArtists)
          }
          label="Artists"
        />
        <Checkbox
          items={polyTypes}
          selectedItems={selectedPolytypes}
          onSelection={(polyType) =>
            handleSelection(polyType, setSelectedPolytypes, selectedPolytypes)
          }
          label="Types"
        />
        <strong>Polyrhythms</strong>
        <div>
          {uniquePolys.map((x, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`poly${index}`}
                  name={`poly${index}`}
                  checked={selectedUniquePolys.some(
                    (poly) => poly.against === x.against && poly.base === x.base
                  )}
                  onChange={() => handlePolySelection(index)}
                />
                <label htmlFor={`poly${index}`}>
                  {x.against}:{x.base}
                </label>
              </div>
            );
          })}
        </div>
        <strong>Time Signatures</strong>
        <div>
          {uniqueTimeSig.map((x, index) => {
            return (
              <div key={index}>
                <input
                  type="checkbox"
                  id={`timeSig${index}`}
                  name={`timeSig${index}`}
                  checked={selectedUniqueTimeSig.some(
                    (timeSig) =>
                      timeSig.numerator === x.numerator &&
                      timeSig.denominator === x.denominator
                  )}
                  onChange={() => handleTimeSigSelection(index)}
                />
                <label htmlFor={`timeSig${index}`}>
                  {x.numerator}/{x.denominator}
                </label>
              </div>
            );
          })}
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
