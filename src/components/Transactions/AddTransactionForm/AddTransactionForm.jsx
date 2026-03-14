import { useEffect, useMemo } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addTransaction } from "../../../redux/finance/operations";
import { TRANSACTION_TYPE } from "../../../utils/constants";
import { addTransactionSchema } from "../../../utils/validationSchemas";
import {
  buildTransactionPayload,
  getDefaultCategoryId,
} from "../../../redux/finance/operations";
import styles from "./AddTransactionForm.module.css";

export default function AddTransactionForm({ categories, onClose }) {
  const dispatch = useDispatch();
  const expenseCategories = useMemo(
    () => categories.filter((item) => item.type === TRANSACTION_TYPE.EXPENSE),
    [categories]
  );
  const incomeCategories = useMemo(
    () => categories.filter((item) => item.type === TRANSACTION_TYPE.INCOME),
    [categories]
  );

  const {
    control,
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: "",
      categoryId: getDefaultCategoryId(categories, TRANSACTION_TYPE.EXPENSE),
      comment: "",
      transactionDate: new Date(),
      type: TRANSACTION_TYPE.EXPENSE,
    },
    resolver: yupResolver(addTransactionSchema),
  });

  const type = watch("type");

  useEffect(() => {
    if (!categories.length) {
      return;
    }

    const nextCategoryId = getDefaultCategoryId(categories, type);
    setValue("categoryId", nextCategoryId, { shouldValidate: true });
  }, [categories, setValue, type]);

  const activeCategories =
    type === TRANSACTION_TYPE.EXPENSE ? expenseCategories : incomeCategories;

  const onSubmit = async (values) => {
    try {
      await dispatch(addTransaction(buildTransactionPayload(values))).unwrap();
      toast.success("Transaction added.");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className={`${styles.form} transaction-form`} onSubmit={handleSubmit(onSubmit)}>
      <div className="switcher" role="group" aria-label="Transaction type">
        <button
          className={`switcher__button ${
            type === TRANSACTION_TYPE.EXPENSE ? "switcher__button--active" : ""
          }`}
          onClick={() => setValue("type", TRANSACTION_TYPE.EXPENSE)}
          type="button"
        >
          Expense
        </button>
        <button
          className={`switcher__button ${
            type === TRANSACTION_TYPE.INCOME ? "switcher__button--active" : ""
          }`}
          onClick={() => setValue("type", TRANSACTION_TYPE.INCOME)}
          type="button"
        >
          Income
        </button>
      </div>

      <div className="form-grid">
        <label className="field">
          <span className="field__label">Amount</span>
          <input className="field__input" step="0.01" type="number" {...register("amount")} />
          {errors.amount ? <span className="field__error">{errors.amount.message}</span> : null}
        </label>

        <label className="field">
          <span className="field__label">Date</span>
          <Controller
            control={control}
            name="transactionDate"
            render={({ field }) => (
              <DatePicker
                className="field__input"
                dateFormat="dd/MM/yyyy"
                selected={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.transactionDate ? (
            <span className="field__error">{errors.transactionDate.message}</span>
          ) : null}
        </label>
      </div>

      <label className="field">
        <span className="field__label">Category</span>
        <select
          className="field__input"
          disabled={!activeCategories.length}
          {...register("categoryId")}
        >
          {activeCategories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        {errors.categoryId ? (
          <span className="field__error">{errors.categoryId.message}</span>
        ) : null}
      </label>

      <label className="field">
        <span className="field__label">Comment</span>
        <textarea className="field__input field__input--textarea" rows="4" {...register("comment")} />
        {errors.comment ? <span className="field__error">{errors.comment.message}</span> : null}
      </label>

      <div className="modal__actions">
        <button className="button button--modal-cancel" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="button button--primary" disabled={isSubmitting} type="submit">
          Add
        </button>
      </div>
    </form>
  );
}
