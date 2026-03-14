import Brand from "../components/Shared/Brand";
import RegistrationForm from "../components/Auth/RegistrationForm";

export default function RegistrationPage() {
  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell--single container">
        <section className="auth-panel auth-panel--auth">
          <Brand centered />
          <RegistrationForm />
        </section>
      </section>
    </main>
  );
}
