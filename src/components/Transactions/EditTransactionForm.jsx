import { yupResolver } from "@hookform/resolvers/yup";
import DatePicker from "react-datepicker";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateTransaction } from "../../redux/finance/operations";
import { editTransactionSchema } from "../../utils/validationSchemas";
import { buildTransactionPayload } from "../../redux/finance/operations";

export default function EditTransactionForm({ transaction, onClose }) {
  const dispatch = useDispatch();
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      amount: transaction.amount,
      comment: transaction.comment,
      transactionDate: new Date(transaction.transactionDate),
    },
    resolver: yupResolver(editTransactionSchema),
  });

  const onSubmit = async (values) => {
    try {
      await dispatch(
        updateTransaction({
          transactionId: transaction.id,
          values: buildTransactionPayload({
            ...values,
            categoryId: transaction.categoryId,
            type: transaction.type,
          }),
        })
      ).unwrap();
      toast.success("Transaction updated.");
      onClose();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
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
        <span className="field__label">Comment</span>
        <textarea className="field__input field__input--textarea" rows="4" {...register("comment")} />
        {errors.comment ? <span className="field__error">{errors.comment.message}</span> : null}
      </label>

      <div className="modal__actions">
        <button className="button button--modal-cancel" onClick={onClose} type="button">
          Cancel
        </button>
        <button className="button button--primary" disabled={isSubmitting} type="submit">
          Save
        </button>
      </div>
    </form>
  );
}
