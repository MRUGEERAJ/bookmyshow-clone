import React from "react";
import "./Button.css";

function Button({ variant = "default", block = false, className = "", children, ...props }) {
  const classes = [
    "c-btn",
    variant === "primary" && "c-btn--primary",
    variant === "outline" && "c-btn--outline",
    variant === "ghost" && "c-btn--ghost",
    block && "c-btn--block",
    className
  ].filter(Boolean).join(" ");

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

export default Button;


