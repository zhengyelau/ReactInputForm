import React from "react";
import { Form } from "react-bootstrap";
import { useFormContext } from "react-hook-form";

// textarea component use for small desciprtion field
const Textarea = function ({ label, name, required, errorMsg, ...props }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  function constructErrorName() {
    let n = name.split(/[[.]+/).join(",").split(/]|,/);
    n = n.filter((each) => each.length > 0);
    return errors?.[n[0]]?.[n[1]]?.[n[2]];
  }

  const errorClass = required && constructErrorName() ? "is-invalid" : "";

  return (
    <>
      <div className={`label text-left pb-2 ${required ? "required" : ""}`}>{label}</div>
      <Form.Control
        as="textarea"
        {...register(name, { required })}
        className={`${errorClass} h-100`}
        {...props}
      />
      {errors?.[name] ? (
        <div className={`d-block invalid-feedback text-left ${errorClass}`}>
          This is required field
        </div>
      ) : null}
    </>
  );
};

export default Textarea;
