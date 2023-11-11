interface OptionProps {
  value: string;
  label: string;
}

export const sortingOptions: OptionProps[] = [
  { value: "titleAtoZ", label: "Title (A-Z)" },
  { value: "titleZtoA", label: "Title (Z-A)" },
  { value: "drummerAtoZ", label: "Drummer (A-Z)" },
  { value: "drummerZtoA", label: "Drummer (Z-A)" },
  { value: "artistAtoZ", label: "Artist (A-Z)" },
  { value: "artistZtoA", label: "Artist (Z-A)" },
];
