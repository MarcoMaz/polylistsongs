interface ButtonProps {
  type: "button" | "submit";
  label: string;
  onCLick: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  type,
  label,
  onCLick,
}) => {
  return (
    <button type={type} onClick={onCLick}>
      {label}
    </button>
  );
};

export default Button;
