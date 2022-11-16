import styles from "../styles/Button.module.css";

interface IButton extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

const Button: React.FC<IButton> = ({ children, ...props }) => {
  const { className, ...rest } = props;

  return (
    <div className={`${styles.container} ${className}`} {...rest}>
      {children}
    </div>
  );
};

export default Button;
