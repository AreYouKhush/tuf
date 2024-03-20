import React, { useState } from "react";
import { Editor } from "@monaco-editor/react";
import { useField } from "formik";

const TextEditor = ({ label, code, setCode, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <>
      <label htmlFor={props.id || props.name}>{label}</label>
      <Editor
        defaultValue=""
        value={code}
        onChange={(e) => setCode(e.target.value)}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="error text-xs text-red-400 text-end">{meta.error}</div>
      ) : null}
    </>
  );
};

export default TextEditor;
