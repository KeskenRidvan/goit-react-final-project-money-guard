import * as yup from "yup";
import { TRANSACTION_TYPE } from "./constants";

export const registerSchema = yup.object({
  username: yup
    .string()
    .trim()
    .min(2, "Username must be at least 2 characters.")
    .max(30, "Username must be at most 30 characters.")
    .required("Username is required."),
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must contain 6 to 12 characters.")
    .max(12, "Password must contain 6 to 12 characters.")
    .required("Password is required."),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match.")
    .required("Please confirm your password."),
});

export const loginSchema = yup.object({
  email: yup
    .string()
    .trim()
    .email("Enter a valid email address.")
    .required("Email is required."),
  password: yup
    .string()
    .min(6, "Password must contain 6 to 12 characters.")
    .max(12, "Password must contain 6 to 12 characters.")
    .required("Password is required."),
});

export const addTransactionSchema = yup.object({
  type: yup
    .string()
    .oneOf([TRANSACTION_TYPE.EXPENSE, TRANSACTION_TYPE.INCOME])
    .required(),
  amount: yup
    .number()
    .typeError("Amount is required.")
    .positive("Amount must be greater than zero.")
    .required("Amount is required."),
  transactionDate: yup
    .date()
    .typeError("Date is required.")
    .required("Date is required."),
  categoryId: yup.string().when("type", {
    is: TRANSACTION_TYPE.EXPENSE,
    then: (schema) => schema.required("Category is required."),
    otherwise: (schema) => schema.required(),
  }),
  comment: yup
    .string()
    .trim()
    .max(60, "Comment must be at most 60 characters.")
    .required("Comment is required."),
});

export const editTransactionSchema = yup.object({
  amount: yup
    .number()
    .typeError("Amount is required.")
    .positive("Amount must be greater than zero.")
    .required("Amount is required."),
  transactionDate: yup
    .date()
    .typeError("Date is required.")
    .required("Date is required."),
  comment: yup
    .string()
    .trim()
    .max(60, "Comment must be at most 60 characters.")
    .required("Comment is required."),
});
