import { SetStateAction } from "react";
import { SongProp } from "../../../pages/api/songs";
import Button from "../Button/Button";

interface TableSongsProps {
  tableFields: string[];
  songs: SongProp[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
  setSelectedSong: React.Dispatch<SetStateAction<SongProp | null>>;
  setIsDialogOpen: React.Dispatch<SetStateAction<boolean>>;
  setIsEditing: React.Dispatch<SetStateAction<boolean>>;
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({
  tableFields,
  songs,
  setSongs,
  setSelectedSong,
  setIsDialogOpen,
  setIsEditing,
}) => {
  const handleButtonClick = (el: number) => {
    setSongs(songs.filter((a) => a.id !== el));
  };

  const handleEditClick = (props: SongProp) => {
    setSelectedSong(props);
    setIsEditing(true);
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
