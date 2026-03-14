import { formatCurrency } from "../../utils/formatters";

export default function StatisticsTable({ statistics }) {
  if (!statistics?.categoriesSummary?.length) {
    return <p className="placeholder">There is no summary for the selected period.</p>;
  }

  const expenseRows = statistics.categoriesSummary.filter(
    (item) => item.type === "EXPENSE"
  );

  return (
    <div className="statistics-table">
      <div className="statistics-table__head">
        <span>Category</span>
        <span>Total</span>
      </div>
      <div className="statistics-table__body">
        {expenseRows.map((item) => (
          <div className="statistics-table__row" key={`${item.name}-${item.type}`}>
            <span>{item.name}</span>
            <span>{formatCurrency(item.total, { absolute: true })}</span>
          </div>
        ))}
      </div>
      <div className="statistics-table__summary">
        <div>
          <span>Income</span>
          <strong>{formatCurrency(statistics.incomeSummary, { absolute: true })}</strong>
        </div>
        <div>
          <span>Expenses</span>
          <strong>{formatCurrency(statistics.expenseSummary, { absolute: true })}</strong>
        </div>
        <div>
          <span>Net total</span>
          <strong>{formatCurrency(statistics.periodTotal)}</strong>
        </div>
      </div>
    </div>
  );
}
