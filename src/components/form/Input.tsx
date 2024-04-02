import React, { forwardRef } from "react";
import { useController, useFormContext } from "react-hook-form";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
}

// * ForwadRef adaalah higher order function yang berguna untuk operasi langusung ke DOM
const Input = forwardRef<HTMLInputElement, InputProps>(({ name, label, ...rest }, ref) => {
  const { control } = useFormContext();
  const {
    field: { value, onChange, onBlur, ref: inputRef },
    fieldState: { error },
  } = useController({ name, control });

  // * Mengatasi masalah kalo valuenya itu null atau undefined tapi masih input type text
  const handleValue = () => {
    if (value === null || value === undefined) {
      return "";
    }
    return value;
  };

  return (
    <div className="form-control">
      {label && (
        <label htmlFor={name} className="label">
          <span className="label-text">{label}</span>
        </label>
      )}
      <input
        id={name}
        value={handleValue()}
        onChange={onChange}
        onBlur={onBlur}
        ref={ref || inputRef}
        {...rest}
        className="input input-bordered"
      />
      {error && <span className="label-text-alt text-error">{error.message}</span>}
    </div>
  );
});

export default Input;
