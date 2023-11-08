/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { songsData } from "../../../pages/api/songs";

interface SelectionComponentProps {
  items: string[];
  selectedItems: string[];
  onSelection: (item: string) => void;
  label: string;
}

const SelectionComponent: React.FunctionComponent<SelectionComponentProps> = ({
  items,
  selectedItems,
  onSelection,
  label,
}) => {
  return (
    <div>
      <strong>{label}</strong>
      {items.map((item, index) => (
        <div key={index}>
          <input
            type="checkbox"
            id={`${label}${index}`}
            name={`${label}${index}`}
            checked={selectedItems.includes(item)}
            onChange={() => onSelection(item)}
          />
          <label htmlFor={`${label}${index}`}>{item}</label>
        </div>
      ))}
    </div>
  );
};

const Search = () => {
  const drummers: string[] = [
    ...new Set(songsData.map((song) => song.drummer)),
  ];
  const artists: string[] = [...new Set(songsData.map((song) => song.artist))];
  const polyTypes: string[] = [...new Set(songsData.map((song) => song.polyType))];

  const [selectedDrummers, setSelectedDrummers] = useState<string[]>([]);
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedPolytypes, setSelectedPolytypes] = useState<string[]>([]);

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

  const filteredSongsData = songsData.filter(
    (song) =>
      (selectedDrummers.length === 0 || selectedDrummers.includes(song.drummer)) &&
      (selectedArtists.length === 0 || selectedArtists.includes(song.artist)) &&
      (selectedPolytypes.length === 0 || selectedPolytypes.includes(song.polyType))
  );

  return (
    <div className="container">
      <header>Im header</header>
      <aside>
        <SelectionComponent
          items={drummers}
          selectedItems={selectedDrummers}
          onSelection={(drummer) =>
            handleSelection(drummer, setSelectedDrummers, selectedDrummers)
          }
          label="Drummers"
        />
        <SelectionComponent
          items={artists}
          selectedItems={selectedArtists}
          onSelection={(artist) =>
            handleSelection(artist, setSelectedArtists, selectedArtists)
          }
          label="Artists"
        />
        <SelectionComponent
          items={polyTypes}
          selectedItems={selectedPolytypes}
          onSelection={(polyType) =>
            handleSelection(polyType, setSelectedPolytypes, selectedPolytypes)
          }
          label="Types"
        />
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
