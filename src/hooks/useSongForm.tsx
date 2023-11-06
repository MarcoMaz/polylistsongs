import {
  InputsProps,
  PolyrhythmProp,
  TimeSignatureProp,
} from "@/models/model";
import { useState } from "react";

const useSongForm = (initialValues: InputsProps | (() => InputsProps)) => {
  const [inputFields, setInputFields] = useState<InputsProps>(initialValues);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "timestamp") {
      const formattedValue = value.replace(/[^\d]/g, "");
      const trimmedValue = formattedValue.slice(0, 4);

      const minutes = trimmedValue.substring(0, 2);
      const seconds = trimmedValue.substring(2, 4);

      const formattedTimestamp = `${minutes}:${seconds}`;

      setInputFields({ ...inputFields, [name]: formattedTimestamp });
    } else {
      setInputFields({ ...inputFields, [name]: value });
    }
  };

  const handleSelectChange =
    (key: keyof InputsProps) => (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setInputFields((prevInputFields) => ({
        ...prevInputFields,
        [key]: value,
      }));
    };

  const handlePolyrhythmChange =
    (key: "against" | "base") => (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        typeof inputFields.polyrhythm !== "string" &&
        typeof inputFields.polyrhythm !== "number"
      ) {
        const updatedPolyrhythm = inputFields.polyrhythm as PolyrhythmProp;
        setInputFields((prevInputFields) => ({
          ...prevInputFields,
          polyrhythm: { ...updatedPolyrhythm, [key]: parseInt(value) },
        }));
      }
    };

  const handleTimeSignatureChange =
    (key: "numerator" | "denominator") =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      if (
        typeof inputFields.timeSignature !== "string" &&
        typeof inputFields.timeSignature !== "number"
      ) {
        const updatedTimeSignature =
          inputFields.timeSignature as TimeSignatureProp;
        setInputFields((prevInputFields) => ({
          ...prevInputFields,
          timeSignature: { ...updatedTimeSignature, [key]: parseInt(value) },
        }));
      }
    };

  return {
    inputFields,
    setInputFields,
    handleInputChange,
    handleSelectChange,
    handlePolyrhythmChange,
    handleTimeSignatureChange,
  };
};

export default useSongForm;
