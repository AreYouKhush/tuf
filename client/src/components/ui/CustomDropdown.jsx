import { useField } from "formik";
import React from "react";

const CustomDropdown = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className="flex flex-col">
        <label htmlFor={props.id || props.name} className="text-base">
          {label}
        </label>
        <select
          className={
            meta.touched && meta.error
              ? "border-2 border-red-600 px-5 py-2 rounded-lg bg-gray-200"
              : "px-5 py-2 rounded-lg border-2 border-slate-500 bg-gray-200"
          }
          {...field}
          {...props}
        />
        {meta.touched && meta.error ? (
          <div className="text-xs text-red-400 text-end">{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default CustomDropdown;
