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
  {
    id: 4,
    title: "Centrifuga",
    album: "Solo un grande sasso",
    artist: "Verdena",
    drummer: "Luca Ferrari",
    polyType: "section",
    year: 2002,
    timestamp: "01:06",
    polyrhythm: {
      against: 2,
      base: 3,
    },
    timeSignature: {
      numerator: 4,
      denominator: 4,
    },
    source: "My Archive",
    scoreUrl: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    title: "Packard Goose",
    album: "Joe's Garage",
    artist: "Frank Zappa",
    drummer: "Vinnie Colaiuta",
    polyType: "groove",
    year: 1979,
    timestamp: "11:00",
    polyrhythm: {
      against: 2,
      base: 3,
    },
    timeSignature: {
      numerator: 3,
      denominator: 4,
    },
    source: "Frank Zappa Book",
  },
  {
    id: 6,
    title: "Stucco Homes",
    album: "Shut up 'n play yer guitar",
    artist: "Frank Zappa",
    drummer: "Vinnie Colaiuta",
    polyType: "fill",
    year: 1981,
    timestamp: "02:21",
    polyrhythm: {
      against: 5,
      base: 3,
    },
    timeSignature: {
      numerator: 7,
      denominator: 4,
    },
    source: "Frank Zappa Book",
    scoreUrl: "https://via.placeholder.com/300",
  },
  {
    id: 7,
    title: "Bitch",
    album: "Univers",
    artist: "Planet X",
    drummer: "Virgil Donati",
    polyType: "groove",
    year: 2001,
    timestamp: "01:04",
    polyrhythm: {
      against: 5,
      base: 3,
    },
    timeSignature: {
      numerator: 5,
      denominator: 4,
    },
    source: "Virgil Donati Book",
    scoreUrl: "https://via.placeholder.com/300",
  },
  {
    id: 8,
    title: "Ditch",
    album: "OUTrio",
    artist: "Bozzio / Wackerman",
    drummer: "Terry Bozzio",
    polyType: "groove",
    year: 1998,
    timestamp: "04:00",
    polyrhythm: {
      against: 7,
      base: 2,
    },
    timeSignature: {
      numerator: 4,
      denominator: 4,
    },
    source: "Frank Zappa Book",
  },
  {
    id: 9,
    title: "Train Check",
    album: "Comfortably Homeless",
    artist: "Marco Minnemann",
    drummer: "Marco Minnemann",
    polyType: "groove",
    year: 2021,
    timestamp: "01:17",
    polyrhythm: {
      against: 17,
      base: 3,
    },
    timeSignature: {
      numerator: 17,
      denominator: 4,
    },
    source: "My Archive",
    scoreUrl: "https://via.placeholder.com/300",
  },
  {
    id: 10,
    title: "Shy Boy",
    album: "Eat'em and smile",
    artist: "David Lee Rooth",
    drummer: "Gregg Bissonette",
    polyType: "groove",
    year: 1995,
    timestamp: "01:18",
    polyrhythm: {
      against: 7,
      base: 2,
    },
    timeSignature: {
      numerator: 11,
      denominator: 4,
    },
    source: "My Archive",
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
