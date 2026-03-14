import { HiOutlinePlus } from "react-icons/hi2";
import styles from "./ButtonAddTransaction.module.css";

export default function ButtonAddTransaction({ onClick }) {
  return (
    <button
      aria-label="Add transaction"
      className={`${styles.button} floating-action`}
      onClick={onClick}
      type="button"
    >
      <HiOutlinePlus size={28} />
    </button>
  );
}
