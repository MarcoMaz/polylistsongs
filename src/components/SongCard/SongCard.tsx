/* eslint-disable @next/next/no-img-element */

import { SongProp } from "@/models/model";

const SongCard: React.FunctionComponent<SongProp> = ({
  title,
  album,
  artist,
  drummer,
  polyType,
  year,
  timestamp,
  polyrhythm,
  timeSignature,
  source,
  scoreUrl,
}) => {
  return (
    <li>
      <details>
        <summary>
          {title} by {artist} - {polyrhythm.against}:{polyrhythm.base}
        </summary>
        {title} by {artist}, from <em>{album}</em> ({year})<br />
        drummer: {drummer} - type: {polyType} <br />
        <br />
        {polyrhythm.against}:{polyrhythm.base} starting at {timestamp} <br />
        <br />
        Time signature: {timeSignature.numerator} - {timeSignature.denominator}{" "}
        <br />
        <br />
        {scoreUrl && (
          <>
            score <img src={scoreUrl} alt="image" width={20} height={20} />{" "}
            <br />
            <br />
          </>
        )}
        source: {source}
      </details>
    </li>
  );
};

export default SongCard;
