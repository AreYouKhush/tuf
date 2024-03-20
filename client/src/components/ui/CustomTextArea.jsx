import React, { useState } from "react";
import { useField } from "formik";
import Editor from "react-simple-code-editor";
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";
import "prismjs/themes/prism.css";

const CustomTextArea = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  const [code, setCode] = useState("");

  return (
    <>
        <label htmlFor={props.id || props.name}>{label}</label>
        <Editor
          // value={code}
          // onValueChange={(e) => {
          //   setCode(code);
          // }}
          highlight={(code) => highlight(code, languages.js)}
          padding={10}
          textareaId="codeArea"
          className="editor"
          id="text-area"
          {...field}
          {...props}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 18,
            outline: 0,
          }}
        />
        {meta.touched && meta.error ? (
          <div className="error text-xs text-red-400 text-end">
            {meta.error}
          </div>
        ) : null}
    </>
  );
};

export default CustomTextArea;
