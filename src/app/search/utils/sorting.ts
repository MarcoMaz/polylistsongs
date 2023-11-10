import { SongProp } from "@/models/model";

export const sortAlphabetically = (a: SongProp, b: SongProp) => {
  const titleA: string = a.title.toLowerCase();
  const titleB: string = b.title.toLowerCase();

  if (titleA < titleB) {
    return -1;
  }
  if (titleA > titleB) {
    return 1;
  }
  return 0;
};

export const sortingSongs = (sortBy: string) => {
  switch (sortBy) {
    case "titleAtoZ":
      return (a: SongProp, b: SongProp) => sortAlphabetically(a, b);
    case "titleZtoA":
      return (a: SongProp, b: SongProp) => -sortAlphabetically(a, b);
    case "drummerAtoZ":
      return (a: SongProp, b: SongProp) => {
        const drummerA = a.drummer.toLowerCase();
        const drummerB = b.drummer.toLowerCase();
        return drummerA.localeCompare(drummerB);
      };
    case "drummerZtoA":
      return (a: SongProp, b: SongProp) => {
        const drummerA = a.drummer.toLowerCase();
        const drummerB = b.drummer.toLowerCase();
        return drummerB.localeCompare(drummerA);
      };
    case "artistAtoZ":
      return (a: SongProp, b: SongProp) => {
        const artistA = a.artist.toLowerCase();
        const artistB = b.artist.toLowerCase();
        return artistA.localeCompare(artistB);
      };
    case "artistZtoA":
      return (a: SongProp, b: SongProp) => {
        const artistA = a.artist.toLowerCase();
        const artistB = b.artist.toLowerCase();
        return artistB.localeCompare(artistA);
      };

    default:
      return (a: SongProp, b: SongProp) => sortAlphabetically(a, b);
  }
};
