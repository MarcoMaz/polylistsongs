import { NextApiRequest, NextApiResponse } from "next";

const songsData = [
  {
    id: 1,
    title: "Song 1",
    artist: "Artist 1",
  },
  {
    id: 2,
    title: "Song 2",
    artist: "Artist 2",
  },
  {
    id: 3,
    title: "Song 3",
    artist: "Artist 3",
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
