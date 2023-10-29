interface ButtonProps {
  type: "button" | "submit";
  label: string;
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  type,
  label,
  onClick,
}) => {
  return (
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
