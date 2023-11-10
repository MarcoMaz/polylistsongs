import { SongProp } from "@/models/model";

interface ResultsProps {
  data: SongProp[];
}

const Results: React.FunctionComponent<ResultsProps> = ({ data }) => {
  const numberOfResults =
    data.length === 1 ? "1 song found" : `${data.length} songs found`;

  return <strong>{numberOfResults}</strong>;
};

export default Results;
