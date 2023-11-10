import { songsData } from "../../pages/api/songs";

export const DRUMMERS: string[] = [
  ...new Set(songsData.map((song) => song.drummer)),
];

export const ARTISTS: string[] = [
  ...new Set(songsData.map((song) => song.artist)),
];

export const POLY_TYPES: string[] = [
  ...new Set(songsData.map((song) => song.polyType)),
];

export const POLYRHYTHMS = songsData
  .map((song) => song.polyrhythm)
  .filter(
    (song, index, self) =>
      index ===
      self.findIndex((s) => s.against === song.against && s.base === song.base)
  );

export const TIME_SIGNATURES = songsData
  .map((song) => song.timeSignature)
  .filter(
    (song, index, self) =>
      index ===
      self.findIndex(
        (s) =>
          s.numerator === song.numerator && s.denominator === song.denominator
      )
  );
