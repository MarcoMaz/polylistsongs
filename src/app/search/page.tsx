"use client";
import { useEffect, useState } from "react";

import { useAppContext } from "../layout";

import { songsData } from "../../../pages/api/songs";

import Button from "../../components/common/Button/Button";
import Checkbox from "../../components/common/Checkbox/Checkbox";
import CheckboxFilter from "../../components/SearchFeature/Container/CheckboxFilter/CheckboxFilter";
import CheckboxPair from "../../components/SearchFeature/Container/CheckboxPair/CheckboxPair";
import InputSearch from "../../components/common/InputSearch/InputSearch";
import Results from "../../components/SearchFeature/Presentational/Results/Results";
import Dropdown from "../../components/common/Dropdown/Dropdown";
import Slider from "../../components/common/Slider/Slider";
import SongCard from "../../components/SearchFeature/Presentational/SongCard/SongCard";
import TextConstants from "../../constants/textConstants";

import { filterSongs } from "./utils/filtering";
import { sortingSongs } from "./utils/sorting";

import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

import {
  ARTISTS,
  DRUMMERS,
  POLY_TYPES,
  POLYRHYTHMS,
  TIME_SIGNATURES,
  SHOW_SCORE_LABEL,
} from "@/constants/searchConstants";
import { sortingOptions } from "@/constants/sortingConstants";

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

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value);
  }

  function handleSortChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(e.target.value);
  }

  function handleSelection(
    item: string,
    setSelectedItems: React.Dispatch<React.SetStateAction<string[]>>,
    selectedItems: string[]
  ) {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter((i) => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  }

  function handlePolyrhythmSelection(index: number): void {
    const updatedPolyrhythms = [...POLYRHYTHMS] as (PolyrhythmProp & {
      selected: boolean;
    })[];
    updatedPolyrhythms[index].selected = !updatedPolyrhythms[index].selected;
    setSelectedPolyrhythms(
      updatedPolyrhythms.filter((polyrhythm) => polyrhythm.selected)
    );
  }

  function handleTimeSignatureSelection(index: number): void {
    const updatedTimeSignature = [...TIME_SIGNATURES] as (TimeSignatureProp & {
      selected: boolean;
    })[];
    updatedTimeSignature[index].selected =
      !updatedTimeSignature[index].selected;
    setSelectedTimeSignatures(
      updatedTimeSignature.filter((timeSignature) => timeSignature.selected)
    );
  }

  function handleShowScore(e: React.ChangeEvent<HTMLInputElement>) {
    setShowScore(e.target.checked);
  }

  return (
    <main className="search">
      <section className="search__query">
        <InputSearch
          label={inputLabel}
          value={searchQuery}
          handleChange={handleSearchChange}
        />
        <Results data={filteredSongsData} />
      </section>
      <section className="search__change-view">
        <Dropdown
          data={sortingOptions}
          value={sortBy}
          handleChange={handleSortChange}
        />
        <Button type="button" icon="grid" variant="integrated"/>
      </section>

      <aside className="search__aside">
        <CheckboxFilter
          items={DRUMMERS}
          selectedItems={selectedDrummers}
          onSelection={(drummer) =>
            handleSelection(drummer, setSelectedDrummers, selectedDrummers)
          }
          heading={TextConstants.searchFilters[0]}
          songsData={songsData}
          type="drummer"
        />
        <CheckboxFilter
          items={ARTISTS}
          selectedItems={selectedArtists}
          onSelection={(artist) =>
            handleSelection(artist, setSelectedArtists, selectedArtists)
          }
          heading={TextConstants.searchFilters[1]}
          songsData={songsData}
          type="artist"
        />
        <CheckboxFilter
          items={POLY_TYPES}
          selectedItems={selectedPolytypes}
          onSelection={(polyType) =>
            handleSelection(polyType, setSelectedPolytypes, selectedPolytypes)
          }
          heading={TextConstants.searchFilters[2]}
          songsData={songsData}
          type="polyType"
        />
        <CheckboxPair
          data={POLYRHYTHMS}
          heading={TextConstants.searchFilters[3]}
          selectedData={selectedPolyrhythms}
          onSelection={handlePolyrhythmSelection}
          songsData={songsData}
          type="polyrhythm"
        />
        <CheckboxPair
          data={TIME_SIGNATURES}
          heading={TextConstants.searchFilters[4]}
          selectedData={selectedTimeSignatures}
          onSelection={handleTimeSignatureSelection}
          songsData={songsData}
          type="timeSignature"
        />
        <Checkbox
          checked={showScore}
          heading={TextConstants.searchFilters[5]}
          label={SHOW_SCORE_LABEL}
          handleChange={handleShowScore}
        />
      </aside>
      <div className="search__results">
        <ul>
          {filteredSongsData.map((song, index) => (
            <SongCard key={index} {...song} />
          ))}
        </ul>
        {filteredSongsData.length === 0 && <Results data={filteredSongsData} />}
      </div>
    </main>
  );
};

export default Search;
