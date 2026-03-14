import { lazy, Suspense } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signUp } from "../../redux/auth/operations";
import { registerSchema } from "../../utils/validationSchemas";

const PasswordStrengthBar = lazy(() => import("react-password-strength-bar"));

const defaultValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(registerSchema),
  });

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");
  const passwordMatch = Boolean(password && confirmPassword && password === confirmPassword);

  const onSubmit = async (formValues) => {
    const values = {
      username: formValues.username,
      email: formValues.email,
      password: formValues.password,
    };

    try {
      await dispatch(signUp(values)).unwrap();
      toast.success("Your account is ready.");
      navigate("/home", { replace: true });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="auth-form__title">Register</h1>
      <label className="field">
        <span className="field__label visually-hidden">Username</span>
        <input
          className="field__input field__input--auth"
          placeholder="Username"
          {...register("username")}
        />
        {errors.username ? (
          <span className="field__error">{errors.username.message}</span>
        ) : null}
      </label>

      <label className="field">
        <span className="field__label visually-hidden">Email</span>
        <input
          className="field__input field__input--auth"
          placeholder="E-mail"
          {...register("email")}
        />
        {errors.email ? <span className="field__error">{errors.email.message}</span> : null}
      </label>

      <label className="field">
        <span className="field__label visually-hidden">Password</span>
        <input
          className="field__input field__input--auth"
          placeholder="Password"
          type="password"
          {...register("password")}
        />
        {errors.password ? (
          <span className="field__error">{errors.password.message}</span>
        ) : null}
      </label>

      <label className="field">
        <span className="field__label visually-hidden">Confirm password</span>
        <input
          className="field__input field__input--auth"
          placeholder="Confirm password"
          type="password"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <span className="field__error">{errors.confirmPassword.message}</span>
        ) : null}
      </label>

      <div className="password-meter">
        <div className="password-meter__header">
          <span>Password strength</span>
          <span>{passwordMatch ? "Matched" : "Waiting"}</span>
        </div>
        <Suspense fallback={<div className="password-meter__fallback" />}>
          <PasswordStrengthBar
            password={password}
            minLength={6}
            scoreWords={["Weak", "Fair", "Good", "Strong"]}
          />
        </Suspense>
      </div>

      <button className="button button--primary" disabled={isSubmitting} type="submit">
        Register
      </button>

      <Link className="button button--secondary" to="/login">
        Log in
      </Link>
    </form>
  );
}
