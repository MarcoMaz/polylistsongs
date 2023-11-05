/* eslint-disable @next/next/no-img-element */
import { SetStateAction } from "react";
import Button from "../base/Button/Button";
import { SongProp } from "@/models/model";

interface TableSongsProps {
  tableFields: string[];
  songs: SongProp[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | "">>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({
  tableFields,
  songs,
  setSongs,
  setSelectedSong,
  setIsDialogOpen,
}) => {
  const handleButtonClick = (el: number) => {
    setSongs(songs.filter((a) => a.id !== el));
  };

  const handleEditClick = (props: SongProp) => {
    setSelectedSong(props);
    setIsDialogOpen(true);
  };

  return (
    <table>
      <thead>
        <tr>
          <th></th> {/* @TODO: Remove when ID is removed too. */}
          {tableFields.map((str, index) => {
            return <th key={index}>{str}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {songs.map(({ ...props }) => {
          return (
            <tr key={props.id}>
              <td>{props.id}</td>
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
                {props.scoreUrl && (
                  <img
                    src={props.scoreUrl}
                    alt="image"
                    width={30}
                    height={30}
                  />
                )}
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
          );
        })}
      </tbody>
    </table>
  );
};

export default TableSongs;
