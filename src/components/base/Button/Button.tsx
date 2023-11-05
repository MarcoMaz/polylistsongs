interface ButtonProps {
  label: string;
  type: "button" | "submit";
  onClick?: () => void;
}

const Button: React.FunctionComponent<ButtonProps> = ({
  label,
  type,
  onClick,
}) => {
  return (
    <button type={type} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
