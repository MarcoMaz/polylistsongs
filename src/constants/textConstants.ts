const TextConstants = {
  app: {
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
      "polyType",
      "year",
      "timestamp",
      "polyrhythm",
      "timeSignature",
      "source",
      "scoreUrl",
    ],
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
    gridButton: "grid",
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
