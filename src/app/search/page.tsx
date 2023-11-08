/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import { songsData } from "../../../pages/api/songs";

const Search = () => {
  const drummers: string[] = songsData.map((song) => song.drummer);

  const [selectedDrummers, setSelectedDrummers] = useState<string[]>([]);

  const handleDrummerSelection = (drummer: string) => {
    if (selectedDrummers.includes(drummer)) {
      setSelectedDrummers(selectedDrummers.filter((item) => item !== drummer));
    } else {
      setSelectedDrummers([...selectedDrummers, drummer]);
    }
  };

  const filteredSongsData =
    selectedDrummers.length === 0
      ? songsData
      : songsData.filter((song) => selectedDrummers.includes(song.drummer));

  return (
    <div className="container">
      <header>Im header</header>
      <aside>
        <strong>Drummers</strong>
        {drummers.map((drummer, index) => {
          return (
            <div key={index}>
              <input
                type="checkbox"
                id={`drummer${index}`}
                name={`drummer${index}`}
                checked={selectedDrummers.includes(drummer)}
                onChange={() => handleDrummerSelection(drummer)}
              />
              <label htmlFor={`drummer${index}`}>{drummer}</label>
            </div>
          );
        })}
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
