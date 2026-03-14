import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { signIn } from "../../redux/auth/operations";
import { loginSchema } from "../../utils/validationSchemas";

const defaultValues = {
  email: "",
  password: "",
};

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues,
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(signIn(values)).unwrap();
      toast.success("Welcome back.");
      navigate("/home", { replace: true });
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
      <h1 className="auth-form__title">Log in</h1>
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

      <button className="button button--primary" disabled={isSubmitting} type="submit">
        Log in
      </button>

      <Link className="button button--secondary" to="/register">
        Register
      </Link>
    </form>
  );
}
