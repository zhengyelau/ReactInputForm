import React from "react";
import { Button as Btn } from "react-bootstrap";

// button component which use for add image and submit form
const Button = function ({ variant, label, size, onClick, disabled, className, ...props }) {
  return (
    <Btn
      className={`br-3 d-flex flex-row align-items-center justify-content-center ${className}`}
      variant={variant}
      size={size}
      onClick={onClick}
      {...props}
      disabled={disabled}
    >
      {label}
    </Btn>
  );
};

export default Button;