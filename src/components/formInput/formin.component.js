import React from "react";
import { Group } from "./form.styles";
function FormInput({ label, ...otherProps }) {
  return (
    <Group>
      <input {...otherProps} className="form-input" />
      {label && (
        <label
          className={`${
            otherProps.value.length ? "shrink" : ""
          } form-input-label`}
        >
          {label}
        </label>
      )}
    </Group>
  );
}

export default FormInput;
