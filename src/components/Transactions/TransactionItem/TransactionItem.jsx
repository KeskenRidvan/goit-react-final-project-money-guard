import { HiOutlinePencilSquare, HiOutlineTrash } from "react-icons/hi2";
import {
  formatCurrency,
  formatShortDate,
  getTransactionSign,
  getTransactionTypeLabel,
} from "../../../utils/formatters";
import styles from "./TransactionItem.module.css";

export default function TransactionItem({
  categoryName,
  onDelete,
  onEdit,
  transaction,
}) {
  const sign = getTransactionSign(transaction.type);
  const typeLabel = getTransactionTypeLabel(transaction.type);

  return (
    <article
      className={`${styles.card} transaction-card ${
        transaction.type === "INCOME"
          ? "transaction-card--income"
          : "transaction-card--expense"
      }`}
    >
      <div className="transaction-card__main">
        <div>
          <span className="transaction-card__eyebrow">{typeLabel}</span>
          <h3 className="transaction-card__category">{categoryName}</h3>
        </div>
        <strong className="transaction-card__amount">
          {sign}
          {formatCurrency(transaction.amount, { absolute: true })}
        </strong>
      </div>

      <dl className="transaction-card__meta">
        <div>
          <dt>Date</dt>
          <dd>{formatShortDate(transaction.transactionDate)}</dd>
        </div>
        <div>
          <dt>Comment</dt>
          <dd>{transaction.comment}</dd>
        </div>
      </dl>

      <div className="transaction-card__actions">
        <button className="chip-button" onClick={onEdit} type="button">
          <HiOutlinePencilSquare size={18} />
          Edit
        </button>
        <button className="chip-button chip-button--danger" onClick={onDelete} type="button">
          <HiOutlineTrash size={18} />
          Delete
        </button>
      </div>
    </article>
  );
}
