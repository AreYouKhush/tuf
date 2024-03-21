import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormSchema } from "../../helpers/FormSchema";
import axios from "axios";
import CustomInput from "../ui/CustomInput";
import CustomTextArea from "../ui/CustomTextArea";
import CustomDropdown from "../ui/CustomDropdown";
import url from "../../helpers/url";
import { languages } from "../../helpers/data";
import ScaleLoader from "react-spinners/ScaleLoader";

const apiKey = import.meta.env.VITE_X_RapidAPI_Key;
const apiHost = import.meta.env.VITE_X_RapidAPI_Host;

const CustomForm = () => {
  const [output, setOutput] = useState("");
  const [run, setRun] = useState(false);
  const [loading, setLoading] = useState(false);

  const initialValues = {
    username: "",
    language: "",
    stdin: "",
    source: "",
  };

  const onSubmit = async (values) => {
    if (run) {
      setLoading(true);
      const { id } = languages.find((d) => values.language === d.value);
      const options = {
        method: "POST",
        url: "https://judge0-ce.p.rapidapi.com/submissions",
        params: {
          base64_encoded: "true",
          fields: "*",
        },
        headers: {
          "content-type": "application/json",
          "Content-Type": "application/json",
          "X-RapidAPI-Key": apiKey,
          "X-RapidAPI-Host": apiHost,
        },
        data: {
          language_id: id,
          source_code: btoa(values.source),
          stdin: btoa(values.stdin),
        },
      };
      try {
        const response = await axios.request(options);
        checkStatus(response.data.token);
      } catch (error) {
        console.error(error);
      }
      setRun(false);
      setLoading(false);
    } else {
      values.stdout = output;
      const response = await axios.post(url + "user/form", values);
    }
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: "https://judge0-ce.p.rapidapi.com/submissions/" + token,
      params: {
        base64_encoded: "true",
        fields: "*",
      },
      headers: {
        "X-RapidAPI-Key": "9eb42a8df6mshb5cbd6e5bebc23bp1dba6cjsnff11a6602f96",
        "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      if (response.data.status.id == 1 || response.data.status.id == 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
      } else if (response.data.status.id == 3) {
        if (response.data.stdout === null) {
          setOutput("null");
        } else {
          setOutput(atob(response.data.stdout));
        }
      } else {
        setOutput(response.data.status.description);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-gray-200 p-5 w-11/12 min-h-[55rem] sm:min-h-dvh">
      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col sm:flex-row gap-4 font-semibold">
            <div className="flex flex-col gap-4 sm:w-1/5">
              <CustomInput
                label="Username"
                name="username"
                type="text"
                placeholder="Username"
              />
              <CustomDropdown label="Language" name="language">
                {languages.map((d, key) => {
                  return (
                    <option key={key} value={d.value}>
                      {d.name}
                    </option>
                  );
                })}
              </CustomDropdown>
              <div className="flex flex-col">
                <CustomTextArea
                  className="flex-1 sm:min-h-80 border-solid border-2 bg-gray-100 border-black rounded-lg"
                  label="Standard Input"
                  name="stdin"
                  type="text"
                  placeholder="Write stdin here"
                ></CustomTextArea>
              </div>
            </div>
            <div className="flex sm:w-4/5 flex-col items-end gap-4">
              <div className="flex flex-col w-full gap-2">
                <div className="flex flex-col w-full">
                  <CustomTextArea
                    className="flex-1 min-h-[30.45rem] border-solid border-2 border-black bg-gray-100 rounded-lg"
                    label="Souce Code"
                    name="source"
                    type="text"
                    placeholder="Write your code here"
                  ></CustomTextArea>
                </div>
                <div className="flex flex-col w-full">
                  <label htmlFor="">Output</label>
                  <textarea
                    className="flex-1 border-solid border-2 p-2 border-black rounded-lg resize-none"
                    value={output}
                    onChange={(e) => setOutput(e.target.value)}
                    type="text"
                    rows={output.split("\n").length}
                    disabled
                    placeholder="Output here!"
                  ></textarea>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setRun(true)}
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg text-white bg-orange-700 px-10 py-3 hover:opacity-85"
                >
                  {loading ? (
                    <ScaleLoader
                      color={"#FFF"}
                      height={13}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Run"
                  )}
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={
                    isSubmitting
                      ? "rounded-lg text-white bg-orange-700 px-10 py-3 opacity-35"
                      : "rounded-lg text-white bg-orange-700 px-10 py-3 hover:opacity-85"
                  }
                >
                  {isSubmitting && !run ? (
                    <ScaleLoader
                      color={"#FFF"}
                      height={13}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomForm;
