import { SongProp } from "../../../pages/api/songs";

interface TableSongsProps {
  header: string[];
  songsData: SongProp[];
}

const TableSongs: React.FunctionComponent<TableSongsProps> = ({ header, songsData }) => {
  return (
    <table>
      <thead>
        <tr>
          {header.map((str, index) => {
            return <th key={index}>{str}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {songsData.map(({...props}) => {
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
