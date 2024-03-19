import React from "react";
import { Formik, Form, Field } from "formik";
import { FormSchema } from "../../helpers/FormSchema";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import CustomInput from "../ui/CustomInput";
import CustomTextArea from "../ui/CustomTextArea";
import CustomDropdown from "../ui/CustomDropdown";

const CustomForm = () => {
  const navigate = useNavigate();

  const initialValues = {
    username: "",
    language: "",
    source: "",
  };

  const onSubmit = async (values) => {
    const response = await axios.post('http://localhost:3000/user/form', values)
    console.log({response})
  };

  return (
    <div className="w-11/12 bg-gray-200 p-5">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col gap-4 font-semibold items-center">
            <CustomInput
              label="Username"
              name="username"
              type="text"
              placeholder="Username"
            />
            <CustomDropdown label="Select Preferred Language" name="language">
              <option value="C++">C++</option>
              <option value="Java">Java</option>
              <option value="Python">Python</option>
              <option value="JavaScript">JavaScript</option>
            </CustomDropdown>
            <CustomTextArea
              className="w-[40rem] min-h-96 border-solid border-2 border-black rounded-lg"
              label="Souce Code"
              name="source"
              type="text"
              placeholder="Write your code here"
            ></CustomTextArea>
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
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CustomForm;
