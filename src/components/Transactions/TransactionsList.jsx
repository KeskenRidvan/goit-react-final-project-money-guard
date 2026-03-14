import TransactionItem from "./TransactionItem";
import {
  formatCurrency,
  formatShortDate,
  getTransactionSign,
} from "../../utils/formatters";
import { HiOutlinePencilSquare } from "react-icons/hi2";

export default function TransactionsList({
  categoriesMap,
  onDelete,
  onEdit,
  transactions,
}) {
  if (!transactions.length) {
    return <p className="placeholder">No transactions yet. Add the first one.</p>;
  }

  return (
    <>
      <div className="transactions-list transactions-list--mobile">
        {transactions.map((transaction) => (
          <TransactionItem
            categoryName={categoriesMap[transaction.categoryId]?.name ?? "Category"}
            key={transaction.id}
            onDelete={() => onDelete(transaction.id)}
            onEdit={() => onEdit(transaction)}
            transaction={transaction}
          />
        ))}
      </div>

      <div className="transactions-table">
        <div className="transactions-table__head">
          <span>Date</span>
          <span>Type</span>
          <span>Category</span>
          <span>Comment</span>
          <span>Sum</span>
          <span className="transactions-table__actions-head">Actions</span>
        </div>

        <div className="transactions-table__body">
          {transactions.map((transaction) => (
            <div className="transactions-table__row" key={transaction.id}>
              <span>{formatShortDate(transaction.transactionDate)}</span>
              <span>{getTransactionSign(transaction.type)}</span>
              <span>{categoriesMap[transaction.categoryId]?.name ?? "Category"}</span>
              <span>{transaction.comment}</span>
              <span
                className={`transactions-table__amount ${
                  transaction.type === "INCOME"
                    ? "transactions-table__amount--income"
                    : "transactions-table__amount--expense"
                }`}
              >
                {formatCurrency(transaction.amount, { absolute: true })}
              </span>
              <div className="transactions-table__actions">
                <button
                  aria-label="Edit transaction"
                  className="transactions-table__edit"
                  onClick={() => onEdit(transaction)}
                  type="button"
                >
                  <HiOutlinePencilSquare size={16} />
                </button>
                <button
                  className="transactions-table__delete"
                  onClick={() => onDelete(transaction.id)}
                  type="button"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
