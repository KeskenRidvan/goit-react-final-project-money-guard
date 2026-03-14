import Brand from "../../components/Shared/Brand/Brand";
import RegistrationForm from "../../components/Auth/RegistrationForm/RegistrationForm";
import styles from "./RegistrationPage.module.css";

export default function RegistrationPage() {
  return (
    <main className={`${styles.page} auth-page`}>
      <section className={`${styles.shell} auth-shell auth-shell--single container`}>
        <section className={`${styles.panel} auth-panel auth-panel--auth`}>
          <Brand centered />
          <RegistrationForm />
        </section>
      </section>
    </main>
  );
}
