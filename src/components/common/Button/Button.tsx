import {
  Edit,
  Filter,
  Grid,
  Plus,
  Search,
  Table,
  Trash2,
  X,
} from "react-feather";

interface ButtonProps {
  icon?:
    | "edit"
    | "filter"
    | "grid"
    | "plus"
    | "search"
    | "table"
    | "trash"
    | "x";
  label?: string;
  type: "button" | "submit";
  variant?: "integrated" | "CTA" | "warning";
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  icon,
  label,
  type,
  variant,
  onClick,
}) => {
  const buttonClass = `button${variant ? ` -${variant}` : ""}${
    icon && !label ? " -icon" : ""
  }${label && !icon ? " -text" : ""}${label && icon ? " -text-icon" : ""}`;

  return (
    <button type={type} className={buttonClass} onClick={onClick}>
      {icon === "edit" && <Edit />}
      {icon === "filter" && <Filter />}
      {icon === "grid" && <Grid />}
      {icon === "plus" && <Plus />}
      {icon === "search" && <Search />}
      {icon === "table" && <Table />}
      {icon === "trash" && <Trash2 />}
      {icon === "x" && <X />}
      {label}
    </button>
  );
};

export default Button;
