import { HiOutlinePlus } from "react-icons/hi2";

export default function ButtonAddTransaction({ onClick }) {
  return (
    <button
      aria-label="Add transaction"
      className="floating-action"
      onClick={onClick}
      type="button"
    >
      <HiOutlinePlus size={28} />
    </button>
  );
}
