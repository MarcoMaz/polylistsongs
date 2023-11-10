/* eslint-disable @next/next/no-img-element */
"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useAppContext } from "../layout";
import { filterSongs } from "./utils/filtering";
import { sortingSongs } from "./utils/sorting";

import CheckboxGroup from "@/components/base/CheckboxGroup/CheckboxGroup";
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
import Select from "@/components/base/Select/Select";
import { sortingOptions } from "@/constants/sortingConstants";
import Button from "@/components/base/Button/Button";
import Checkbox from "@/components/base/Checkbox/Checkbox";
import Slider from "@/components/base/Slider/Slider";
import SongCard from "@/components/SongCard/SongCard";

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
  const { gridButton, inputLabel } = TextConstants.searchHeader;
  const { buttonHome } = TextConstants.app;

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
        <Select
          data={sortingOptions}
          id="songs-order"
          value={sortBy}
          handleChange={handleSortChange}
        />
        <Button type="button" label={gridButton} />
        <Slider id="card-grid" min={0} max={10} orientation="vertical" />
        <Link href={"/"}>
          <Button type="button" label={buttonHome} />
        </Link>
      </header>
      <aside>
        <CheckboxGroup
          items={DRUMMERS}
          selectedItems={selectedDrummers}
          onSelection={(drummer) =>
            handleSelection(drummer, setSelectedDrummers, selectedDrummers)
          }
          label="Drummers"
          songsData={songsData}
          type="drummer"
        />
        <CheckboxGroup
          items={ARTISTS}
          selectedItems={selectedArtists}
          onSelection={(artist) =>
            handleSelection(artist, setSelectedArtists, selectedArtists)
          }
          label="Artists"
          songsData={songsData}
          type="artist"
        />
        <CheckboxGroup
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
        <Checkbox
          checked={showScore}
          heading="Score"
          id="score"
          label="Score"
          handleChange={handleShowScore}
        />
      </aside>
      <main>
        <ul>
          {filteredSongsData.map((song, index) => (
            <SongCard key={index} {...song} />
          ))}
        </ul>
        {filteredSongsData.length === 0 && <Results data={filteredSongsData} />}
      </main>
    </div>
  );
};

export default Search;
