import { NextApiRequest, NextApiResponse } from "next";

export interface SongProp {
  id: number;
  title: string;
  album: string;
  artist: string;
  drummer: string;
  polyType: 'groove' | 'section' | 'fill'
}


export const songsData: SongProp[] = [
  {
    id: 1,
    title: "New Millenium",
    album: "Falling into Infinity",
    artist: "Dream Theater",
    drummer: "Mike Portnoy",
    polyType: "groove"
  },
  {
    id: 2,
    title: "Pyramid on Mars",
    album: "On the Virg",
    artist: "Virgil Donati",
    drummer: "Virgil Donati",
    polyType: "section"
  },
  {
    id: 3,
    title: "Outside now",
    album: "Joe's Garage",
    artist: "Frank Zappa",
    drummer: "Vinnie Colaiuta",
    polyType: "fill"
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
