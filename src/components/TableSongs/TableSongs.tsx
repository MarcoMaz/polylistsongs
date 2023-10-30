import { SetStateAction } from "react";
import { SongProp } from "../../../pages/api/songs";
import Button from "../Button/Button";

interface TableSongsProps {
  tableFields: string[];
  songs: SongProp[];
  setSongs: React.Dispatch<SetStateAction<SongProp[]>>;
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({
  tableFields,
  songs,
  setSongs,
}) => {
  const handleButtonClick = (el: number) => {
    setSongs(songs.filter((a) => a.id !== el));
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
