/* eslint-disable @next/next/no-img-element */
import { SetStateAction, useState } from "react";

import ArrowsIcon from "../../Presentational/ArrowsIcon/ArrowsIcon";
import Button from "../../../common/Button/Button";

import { SongProp } from "@/models/model";

import TextConstants, { TableSongLabels } from "@/constants/textConstants";

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
    <table className="tableSongs">
      <thead>
        <tr>
          {tableFields.map((field, index) => (
            <th key={index} onClick={() => handleSort(field)}>
              <span>{TextConstants.tableSong.labels[field as keyof TableSongLabels]}</span>
              <ArrowsIcon />
            </th>
          ))}
          <th>
            <span></span>
          </th>
        </tr>
      </thead>
      <tbody>
        {sortedSongs().map(({ ...props }) => (
          <tr key={props.id}>
            <td>{props.title}</td>
            <td>{props.album}</td>
            <td>{props.artist}</td>
            <td>{props.drummer}</td>
            <td className="col-xxs">{props.polyType}</td>
            <td className="col-xxs">{props.year}</td>
            <td className="col-xs">{props.timestamp}</td>
            <td className="col-xs">{`${props.polyrhythm.against}:${props.polyrhythm.base}`}</td>
            <td className="col-s">
              <div className="time-signature">
                <span>{props.timeSignature.numerator}</span>
                <span>{props.timeSignature.denominator}</span>
              </div>
            </td>
            <td>{props.source}</td>
            <td className="col-xs">
              {props.scoreUrl ? (
                <img src={props.scoreUrl} alt="image" width={30} height={30} />
              ) : null}
            </td>
            <td>
              <div className="tableSongs__CTA">
                <Button
                  icon="edit"
                  type="button"
                  variant="integrated"
                  onClick={() => handleEditClick(props)}
                />
                <Button
                  icon="trash"
                  type="button"
                  variant="warning"
                  onClick={() => handleButtonClick(props.id)}
                />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableSongs;
