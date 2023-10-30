import { SongProp } from "../../../pages/api/songs";

interface TableSongsProps {
  tableFields: string[];
  songs: SongProp[];
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({ tableFields, songs }) => {
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
        {songs.map(({...props}) => {
          return (
            <tr key={props.id}>
              <td>{props.id}</td>
              <td>{props.title}</td>
              <td>{props.album}</td>
              <td>{props.artist}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableSongs;
