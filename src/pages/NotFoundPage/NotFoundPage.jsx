import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={`${styles.page} auth-page`}>
      <section className={`${styles.panel} auth-panel auth-panel--narrow`}>
        <h1 className="section-heading__title">Page not found</h1>
        <p className="auth-shell__text">The requested route does not exist.</p>
        <Link className="button button--primary" to="/home">
          Back to dashboard
        </Link>
      </section>
    </main>
  );
}
