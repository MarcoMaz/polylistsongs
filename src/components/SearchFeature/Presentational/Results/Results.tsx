import TextConstants from "@/constants/textConstants";

import { SongProp } from "@/models/model";

const { oneSongMessage, songMessage } = TextConstants.searchResults;

interface ResultsProps {
  data: SongProp[];
}

const Results: React.FunctionComponent<ResultsProps> = ({ data }) => {
  const numberOfResults =
    data.length === 1 ? oneSongMessage : `${data.length} ${songMessage}`;

  return <strong className="results">{numberOfResults}</strong>;
};

export default Results;
