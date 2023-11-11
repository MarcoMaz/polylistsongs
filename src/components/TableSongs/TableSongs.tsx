/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useState } from "react";

import Button from "../base/Button/Button";

import { SongProp } from "@/models/model";

interface TableSongsProps {
  songs: SongProp[];
  tableFields: string[];
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | "">>;
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({
  songs,
  tableFields,
  setIsDialogOpen,
  setSelectedSong,
  setSongs,
}) => {
  const [sortBy, setSortBy] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  function handleSort(field: string): void {
    if (field === "polyrhythm" || field === "timeSignature") return;

    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  }

  function sortedSongs(): SongProp[] {
    if (sortBy && sortBy !== "polyrhythm" && sortBy !== "timeSignature") {
      return [...songs].sort((a, b) => {
        const valueA = String(a[sortBy as keyof SongProp]);
        const valueB = String(b[sortBy as keyof SongProp]);

        if (sortOrder === "asc") {
          return valueA.localeCompare(valueB);
        } else {
          return valueB.localeCompare(valueA);
        }
      });
    }
    return songs;
  }

  function handleButtonClick(el: number): void {
    setSongs(songs.filter((a) => a.id !== el));
  }

  function handleEditClick(props: SongProp): void {
    setSelectedSong(props);
    setIsDialogOpen(true);
  }

  return (
    <table>
      <thead>
        <tr>
          {tableFields.map((field, index) => (
            <th key={index} onClick={() => handleSort(field)}>
              {field}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedSongs().map(({ ...props }) => (
          <tr key={props.id}>
            <td>{props.title}</td>
            <td>{props.album}</td>
            <td>{props.artist}</td>
            <td>{props.drummer}</td>
            <td>{props.polyType}</td>
            <td>{props.year}</td>
            <td>{props.timestamp}</td>
            <td>{`${props.polyrhythm.against}:${props.polyrhythm.base}`}</td>
            <td>{`${props.timeSignature.numerator}/${props.timeSignature.denominator}`}</td>
            <td>{props.source}</td>
            <td>
              {props.scoreUrl ? (
                <img src={props.scoreUrl} alt="image" width={30} height={30} />
              ) : null}
            </td>
            <td>
              <Button
                type="button"
                label="edit"
                onClick={() => handleEditClick(props)}
              />
            </td>
            <td>
              <Button
                type="button"
                label="remove"
                onClick={() => handleButtonClick(props.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSongs;
