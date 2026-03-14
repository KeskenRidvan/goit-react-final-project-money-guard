import CurrencyCard from "../../components/Dashboard/CurrencyCard/CurrencyCard";
import styles from "./CurrencyTab.module.css";

export default function CurrencyTab() {
  return (
    <section className={`${styles.page} page-section page-section--currency`}>
      <CurrencyCard fullWidth />
    </section>
  );
}
