import Brand from "../components/Shared/Brand";
import LoginForm from "../components/Auth/LoginForm";

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell--single container">
        <section className="auth-panel auth-panel--auth">
          <Brand centered />
          <LoginForm />
        </section>
      </section>
    </main>
  );
}
