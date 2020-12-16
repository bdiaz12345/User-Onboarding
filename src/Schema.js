import * as yup from "yup";

export default yup.object().shape({
    name: yup.string().required('No numbers or special characters allowed'),
    email: yup
        .string()
        .email('error')
        .required('error'),
    password: yup.string().required('error'),
    terms: yup.boolean().oneOf([true], 'error'),
});