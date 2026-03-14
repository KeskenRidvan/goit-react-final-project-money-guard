import { useSelector } from "react-redux";
import { selectTotalBalance } from "../../redux/finance/selectors";
import { formatCurrency } from "../../utils/formatters";

export default function BalanceCard() {
  const totalBalance = useSelector(selectTotalBalance);

  return (
    <section className="info-card balance-card" aria-label="Balance">
      <span className="info-card__eyebrow">Your balance</span>
      <strong className="balance-card__amount">{formatCurrency(totalBalance)}</strong>
      <p className="info-card__description">
        Keep every inflow and expense visible from one place.
      </p>
    </section>
  );
}
