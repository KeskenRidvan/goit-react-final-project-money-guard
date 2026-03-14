import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  deleteTransaction,
  fetchTransactionCategories,
  fetchTransactions,
} from "../redux/finance/operations";
import {
  selectCategories,
  selectCategoriesMap,
  selectFilteredTransactions,
  selectTransactionFilter,
} from "../redux/finance/selectors";
import {
  setTransactionCategoryFilter,
  setTransactionSearchFilter,
  setTransactionTypeFilter,
} from "../redux/finance/slice";
import ButtonAddTransaction from "../components/Transactions/ButtonAddTransaction";
import Modal from "../components/Shared/Modal";
import AddTransactionForm from "../components/Transactions/AddTransactionForm";
import EditTransactionForm from "../components/Transactions/EditTransactionForm";
import TransactionsList from "../components/Transactions/TransactionsList";

export default function HomeTab() {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);
  const categoriesMap = useSelector(selectCategoriesMap);
  const filter = useSelector(selectTransactionFilter);
  const transactions = useSelector(selectFilteredTransactions);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  useEffect(() => {
    dispatch(fetchTransactionCategories());
    dispatch(fetchTransactions());
  }, [dispatch]);

  const visibleCategories = useMemo(() => {
    if (filter.type === "ALL") {
      return categories;
    }

    return categories.filter((category) => category.type === filter.type);
  }, [categories, filter.type]);

  const handleDelete = async (transactionId) => {
    const shouldDelete = window.confirm("Delete this transaction?");

    if (!shouldDelete) {
      return;
    }

    try {
      await dispatch(deleteTransaction(transactionId)).unwrap();
      toast.success("Transaction removed.");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <>
      <section className="page-section">
        <div className="section-heading">
          <div>
            <span className="section-heading__eyebrow">Operations</span>
            <h1 className="section-heading__title">Home</h1>
          </div>
        </div>

        <div className="filters-panel">
          <label className="field">
            <span className="field__label">Type</span>
            <select
              className="field__input"
              value={filter.type}
              onChange={(event) => dispatch(setTransactionTypeFilter(event.target.value))}
            >
              <option value="ALL">All</option>
              <option value="EXPENSE">Expense</option>
              <option value="INCOME">Income</option>
            </select>
          </label>

          <label className="field">
            <span className="field__label">Category</span>
            <select
              className="field__input"
              value={filter.categoryId}
              onChange={(event) =>
                dispatch(setTransactionCategoryFilter(event.target.value))
              }
            >
              <option value="ALL">All categories</option>
              {visibleCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span className="field__label">Search</span>
            <input
              className="field__input"
              placeholder="Comment or category"
              value={filter.search}
              onChange={(event) =>
                dispatch(setTransactionSearchFilter(event.target.value))
              }
            />
          </label>
        </div>

        <TransactionsList
          categoriesMap={categoriesMap}
          onDelete={handleDelete}
          onEdit={setEditingTransaction}
          transactions={transactions}
        />
      </section>

      <ButtonAddTransaction onClick={() => setIsAddOpen(true)} />

      {isAddOpen ? (
        <Modal title="Add transaction" onClose={() => setIsAddOpen(false)}>
          <AddTransactionForm categories={categories} onClose={() => setIsAddOpen(false)} />
        </Modal>
      ) : null}

      {editingTransaction ? (
        <Modal title="Edit transaction" onClose={() => setEditingTransaction(null)}>
          <EditTransactionForm
            onClose={() => setEditingTransaction(null)}
            transaction={editingTransaction}
          />
        </Modal>
      ) : null}
    </>
  );
}
