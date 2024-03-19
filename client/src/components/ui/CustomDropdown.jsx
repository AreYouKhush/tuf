import { useField } from "formik";
import React from "react";

const CustomDropdown = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <select
        className="px-5 py-2 rounded-lg border-2 border-slate-500 focus:bg-slate-300 "
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </>
  );
};

export default CustomDropdown;
