import Brand from "../../components/Shared/Brand/Brand";
import LoginForm from "../../components/Auth/LoginForm/LoginForm";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  return (
    <main className={`${styles.page} auth-page`}>
      <section className={`${styles.shell} auth-shell auth-shell--single container`}>
        <section className={`${styles.panel} auth-panel auth-panel--auth`}>
          <Brand centered />
          <LoginForm />
        </section>
      </section>
    </main>
  );
}
