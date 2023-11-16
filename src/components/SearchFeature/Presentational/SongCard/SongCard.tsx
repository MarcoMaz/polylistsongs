/* eslint-disable @next/next/no-img-element */

import TextConstants from "@/constants/textConstants";

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
  const { drumsLabel, tableHeading, tableFields, scoreHeading, sourceHeading } =
    TextConstants.searchResults.songCard;

  const polyrhythmLabel = `${polyrhythm.against}:${polyrhythm.base}`;
  const albumLabel = `${album} (${year})`;
  const drummerLabel = `${drummer} ${drumsLabel}`;

  return (
    <li>
      <details>
        <summary>
          <h2>{title}</h2>
          <h3>{artist}</h3>
          <h4>{polyrhythmLabel}</h4>
        </summary>
        <section>
          <h2>{title}</h2>
          <h3>{artist}</h3>
          <h4>{albumLabel}</h4>
          <h5>{drummerLabel}</h5>
          <table>
            <thead>
              <tr>
                <th colSpan={2}>{tableHeading}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{tableFields[0]}</td>
                <td>{polyrhythmLabel}</td>
              </tr>
              <tr>
                <td>{tableFields[1]}</td>
                <td>{timestamp}</td>
              </tr>
              <tr>
                <td>{tableFields[2]}</td>
                <td>{polyType}</td>
              </tr>
              <tr>
                <td>{tableFields[3]}</td>
                <td>
                  <div className="time-signature">
                    <span>{timeSignature.numerator}</span>
                    <span>{timeSignature.denominator}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          {scoreUrl && (
            <section>
              <h2>{scoreHeading}</h2>
              <img src={scoreUrl} alt="image" width={20} height={20} />
            </section>
          )}
          <section>
            <h2>{sourceHeading}</h2>
            <div>{source}</div>
          </section>
        </section>
      </details>
    </li>
  );
};

export default SongCard;
