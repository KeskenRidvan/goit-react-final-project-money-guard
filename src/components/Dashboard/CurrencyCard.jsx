import { useSelector } from "react-redux";
import {
  selectCurrencyFetchedAt,
  selectCurrencyRates,
} from "../../redux/finance/selectors";

const formatTime = (value) =>
  value
    ? new Intl.DateTimeFormat("en-GB", {
        day: "2-digit",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(value))
    : "No sync yet";

export default function CurrencyCard({ fullWidth = false }) {
  const rates = useSelector(selectCurrencyRates);
  const fetchedAt = useSelector(selectCurrencyFetchedAt);

  return (
    <section className={`info-card currency-card ${fullWidth ? "currency-card--wide" : ""}`}>
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">Monobank</span>
          <h2 className="section-heading__title">Currency</h2>
        </div>
        <span className="currency-card__time">{formatTime(fetchedAt)}</span>
      </div>

      {rates.length ? (
        <div className="currency-table">
          <div className="currency-table__head">
            <span>Pair</span>
            <span>Buy</span>
            <span>Sell</span>
          </div>
          <div className="currency-table__body">
            {rates.map((rate) => (
              <div className="currency-table__row" key={rate.code}>
                <span>{rate.code}/UAH</span>
                <span>{rate.buy.toFixed(2)}</span>
                <span>{rate.sell.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="placeholder">Currency rates will appear after the first sync.</p>
      )}
    </section>
  );
}
