import React from "react";
import { useFormContext } from "react-hook-form";
import "./Input.scss";

// input component mainly use for form input
const Input = function (props) {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext({ mode: "all" });

  const {
    label,
    mandatory,
    type,
    field_id,
    placeholder,
    onChange,
    validationPattern,
    id,
    errorMessage,
  } = props;

  const properties = {
    type,
    placeholder,
    className:
      "form-control w-100 height-auto",
    onChange,
  };

  return (
    <>
      <div className="d-flex flex-column">
        {label ? <div className={`label text-left ${mandatory ? "required pb-2" : "pb-2"}`}>{label}</div> : null}
        <input
          type={type}
          {...register(field_id, {
            required: mandatory,
            pattern: { value: validationPattern, message: errorMessage },
          })}
          {...properties}
          className={`form-control w-100 height-auto ${
            errors?.[field_id] ? "invalid-input" : ""
          }`}
          defaultValue={getValues(field_id)}
          id={id}
        />
        {errors?.[field_id] ? (
          <div className="d-block invalid-feedback text-left">
            {errors?.[field_id]?.message ? errors?.[field_id]?.message : "This is required field"}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Input;