import { useField } from "formik";
import React from "react";

const CustomInput = ({ label, ...props }) => {
  const [field, meta, helpers] = useField(props);

  return (
    <>
      <div className="flex flex-col">
        <label>{label}</label>
        <input
        autoComplete="off"
          {...field}
          {...props}
          className={
            meta.touched && meta.error
              ? "border-2 border-red-600 px-5 py-2 rounded-lg focus:bg-slate-300 "
              : "px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
          }
        />
        {meta.error && meta.touched && (
              <p className="text-xs text-red-400 text-end">{meta.error}</p>
            )}
      </div>
    </>
  );
};

export default CustomInput;
