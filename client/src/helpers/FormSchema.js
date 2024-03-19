import * as yup from "yup";

export const FormSchema = yup.object().shape({
    name: yup.string().required().min(3).max(40),
    username: yup.string().required("Required"),
    source: yup.string().required()
})