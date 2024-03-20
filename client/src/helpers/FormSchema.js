import * as yup from "yup";

export const FormSchema = yup.object().shape({
    username: yup.string().required().min(3).max(40).required("*Username is Required"),
    language: yup.string().required("*Please select a language"),
    stdin: yup.string(),
    source: yup.string().required("*Souce Code to required")
})