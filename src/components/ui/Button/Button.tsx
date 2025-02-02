import React from "react";
import clsx from "clsx";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  appearance?: "filled" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  appearance = "filled", // filled, outline, ghost
  size = "md", // sm, md, lg
  className = "",
  ...props
}) => {
  const baseStyles = "font-medium rounded-lg transition-all focus:outline-none focus:ring-2";

  const sizeStyles: Record<"sm" | "md" | "lg", string> = {
    sm: "px-3 py-1 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  const appearanceStyles: Record<"filled" | "outline" | "ghost", string> = {
    filled: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-300",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-300",
    ghost: "text-blue-600 hover:bg-blue-100 focus:ring-blue-300",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={clsx(
        baseStyles,
        sizeStyles[size],
        appearanceStyles[appearance],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;