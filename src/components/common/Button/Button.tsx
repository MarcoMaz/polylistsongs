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
  label: string;
  type: "button" | "submit";
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  icon,
  label,
  type,
  onClick,
}) => {
  return (
    <button type={type} onClick={onClick}>
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
