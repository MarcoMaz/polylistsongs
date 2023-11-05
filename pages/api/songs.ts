import { NextApiRequest, NextApiResponse } from "next";
import { SongProp } from "@/models/model";

export const songsData: SongProp[] = [
  {
    id: 1,
    title: "New Millenium",
    album: "Falling into Infinity",
    artist: "Dream Theater",
    drummer: "Mike Portnoy",
    polyType: "groove",
    year: 1992,
    timestamp: "05:03",
    polyrhythm: {
      against: 4,
      base: 3,
    },
    timeSignature: {
      numerator: 3,
      denominator: 4,
    },
    source: "Mike Portnoy Book",
    scoreUrl: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    title: "Pyramid on Mars",
    album: "On the Virg",
    artist: "Virgil Donati",
    drummer: "Virgil Donati",
    polyType: "section",
    year: 1999,
    timestamp: "01:00",
    polyrhythm: {
      against: 7,
      base: 3,
    },
    timeSignature: {
      numerator: 3,
      denominator: 8,
    },
    source: "Virgil Donati Book",
  },
  {
    id: 3,
    title: "Outside now",
    album: "Joe's Garage",
    artist: "Frank Zappa",
    drummer: "Vinnie Colaiuta",
    polyType: "fill",
    year: 1979,
    timestamp: "02:11",
    polyrhythm: {
      against: 4,
      base: 3,
    },
    timeSignature: {
      numerator: 3,
      denominator: 4,
    },
    source: "Frank Zappa Book",
    scoreUrl: "https://via.placeholder.com/300",
  },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    res.status(200).json({ songs: songsData });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
