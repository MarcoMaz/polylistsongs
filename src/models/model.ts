export interface PolyrhythmProp {
  against: number;
  base: number;
}

export interface TimeSignatureProp {
  numerator: number;
  denominator: number;
}

export interface SongProp {
  id: number;
  title: string;
  album: string;
  artist: string;
  drummer: string;
  polyType: "groove" | "section" | "fill";
  year: number;
  timestamp: string;
  polyrhythm: PolyrhythmProp;
  timeSignature: TimeSignatureProp;
  source:
    | "Mike Portnoy Book"
    | "Frank Zappa Book"
    | "Modern Drummer Collection"
    | "Virgil Donati Book"
    | "Vinnie Colaiuta Book"
    | "My Archive"
    | "Minneman Book"
    | "Virgil Donati Book";
  scoreUrl?: string;
}

export interface InputsProps {
  [key: string]: string | number | PolyrhythmProp | TimeSignatureProp;
}
