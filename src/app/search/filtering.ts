import { PolyrhythmProp, SongProp, TimeSignatureProp } from "@/models/model";

export const filterSongs = (
  song: SongProp,
  searchQuery: string,
  selectedDrummers: string[],
  selectedArtists: string[],
  selectedPolytypes: string[],
  selectedPolyrhythms: PolyrhythmProp[],
  selectedTimeSignatures: TimeSignatureProp[],
  showScore: boolean
) => {
  const isMatch =
    song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
    song.drummer.toLowerCase().includes(searchQuery.toLowerCase());

  return (
    isMatch &&
    (selectedDrummers.length === 0 ||
      selectedDrummers.includes(song.drummer)) &&
    (selectedArtists.length === 0 || selectedArtists.includes(song.artist)) &&
    (selectedPolytypes.length === 0 ||
      selectedPolytypes.includes(song.polyType)) &&
    (selectedPolyrhythms.length === 0 ||
      selectedPolyrhythms.some(
        (poly: { against: any; base: any }) =>
          poly.against === song.polyrhythm.against &&
          poly.base === song.polyrhythm.base
      )) &&
    (selectedTimeSignatures.length === 0 ||
      selectedTimeSignatures.some(
        (timeSig: { numerator: any; denominator: any }) =>
          timeSig.numerator === song.timeSignature.numerator &&
          timeSig.denominator === song.timeSignature.denominator
      )) &&
    (showScore ? !!song.scoreUrl : true)
  );
};
