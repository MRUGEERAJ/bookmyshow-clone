import React from "react";
import "./Input.css";

function Input({ error = "", className = "", ...props }) {
  const classes = ["c-input", error && "c-input--error", className].filter(Boolean).join(" ");
  return <input className={classes} aria-invalid={!!error} {...props} />;
}

export default Input;


