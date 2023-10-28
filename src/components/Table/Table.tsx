import { SongProp } from "../../../pages/api/songs";

interface TableProps {
  header: string[];
  songsData: SongProp[];
}

const Table: React.FunctionComponent<TableProps> = ({ header, songsData }) => {
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
        {songsData.map(({timeSignature, polyrhythm, ...props}) => {
          return (
            <tr key={props.id}>
              <td>{props.id}</td>
              <td>{props.title}</td>
              <td>{props.album}</td>
              <td>{props.artist}</td>
              <td>{props.drummer}</td>
              <td>{`${timeSignature.numerator}/${timeSignature.denominator}`}</td>
              <td>{`${polyrhythm.numerator}:${polyrhythm.denominator}`}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
