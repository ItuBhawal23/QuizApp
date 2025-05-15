import "./Button.module.css";

type ButtonProps = {
  label: string;
  onClick: any;
  disabled: boolean;
};

const Button = ({ label, onClick, disabled }: ButtonProps) => {
  return (
    <button disabled={disabled} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
