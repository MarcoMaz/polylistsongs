export interface TableSongLabels {
  title: string;
  album: string;
  artist: string;
  drummer: string;
  timestamp: string;
  polyrhythm: string;
  timeSignature: string;
  source: string;
  scoreUrl: string;
}

const TextConstants = {
  app: {
    appName: "PolyListSongs",
    loadingData: "Data is loading...",
    noSongs: "No songs available",
    buttonSearch: "search",
    buttonHome: "home",
  },
  tableSong: {
    tableFields: [
      "title",
      "album",
      "artist",
      "drummer",
      "type",
      "year",
      "timestamp",
      "polyrhythm",
      "timeSignature",
      "source",
      "scoreUrl",
    ],
    labels: {
      title: "Title",
      album: "Album",
      artist: "Artist",
      drummer: "Drummer",
      type: "Type",
      year: "Year",
      timestamp: "Starting at",
      polyrhythm: "Polyrhythm",
      timeSignature: "Time Signature",
      source: "Source",
      scoreUrl: "Score URL",
    } as TableSongLabels,
    polyTypes: ["groove", "section", "fill"],
    sources: [
      "Mike Portnoy Book",
      "Frank Zappa Book",
      "Modern Drummer Collection",
      "Virgil Donati Book",
      "Vinnie Colaiuta Book",
      "My Archive",
      "Minneman Book",
      "Virgil Donati Book",
    ],
    addSongButton: "add song",
  },
  formAddSong: {
    polyrhythmTypeLabel: "Type:",
    yearLabel: "Year:",
    sourceLabel: "Source:",
    polyrhythmLabels: {
      heading: "Polyrhythm",
      against: "against",
    },
    timeSignatureLabel: "Time Signature",
    buttonCTA: "add",
  },
  formEditSong: {
    polyrhythmTypeLabel: "Polyrhythmic type:",
    yearLabel: "Year:",
    sourceLabel: "Source:",
    polyrhythmLabels: {
      heading: "Polyrhythm",
      against: "against",
    },
    timeSignatureLabel: "Time Signature",
    buttonCTA: "save",
  },
  searchHeader: {
    inputLabel: "Search the site:",
  },
  searchFilters: [
    "Drummers",
    "Artists",
    "Types",
    "Polyrhythms",
    "Time Signatures",
    "Show score",
  ],
  searchResults: {
    oneSongMessage: "1 song found",
    songMessage: "songs found",
    songCard: {
      drumsLabel: "on drums",
      tableHeading: "Polyrhythm Information",
      tableFields: ["Polyrhythm", "Starting at", "Type", "Time Signature"],
      scoreHeading: "Score",
      sourceHeading: "Source",
    },
  },
};

export default TextConstants;
