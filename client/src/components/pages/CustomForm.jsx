import React from "react";
import { Formik, Form, Field } from "formik";
import { FormSchema } from "../../helpers/FormSchema";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../ui/CustomInput";
import CustomTextArea from "../ui/CustomTextArea";
import CustomDropdown from "../ui/CustomDropdown";
import url from "../../helpers/url";

const CustomForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    language: "",
    stdin: "",
    source: "",
  };

  const onSubmit = async (values) => {
    const response = await axios.post(url + "user/form", values);
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
                <option value="">Select Language</option>
                <option value="C++">C++</option>
                <option value="Java">Java</option>
                <option value="Python">Python</option>
                <option value="JavaScript">JavaScript</option>
              </CustomDropdown>
              <div className="flex flex-col">
                <CustomTextArea
                  className="flex-1 sm:min-h-80 border-solid border-2 border-black rounded-lg"
                  label="Standard Input"
                  name="stdin"
                  type="text"
                  placeholder="Write stdin here"
                ></CustomTextArea>
              </div>
            </div>
            <div className="flex sm:w-4/5 flex-col items-end gap-4">
              <div className="flex flex-col w-full">
                <CustomTextArea
                  className="flex-1 min-h-[30.45rem] border-solid border-2 border-black rounded-lg"
                  label="Souce Code"
                  name="source"
                  type="text"
                  placeholder="Write your code here"
                ></CustomTextArea>
              </div>
              <div className="flex gap-4">
                <button className="rounded-lg text-white bg-orange-700 px-10 py-3 hover:opacity-85">
                  Run
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
                  Submit
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
