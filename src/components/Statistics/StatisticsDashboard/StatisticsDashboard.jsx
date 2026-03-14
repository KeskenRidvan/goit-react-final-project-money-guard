import { MONTH_OPTIONS, getYearOptions } from "../../../utils/constants";
import styles from "./StatisticsDashboard.module.css";

export default function StatisticsDashboard({ period, onChange }) {
  const yearOptions = getYearOptions();

  return (
    <div className={`${styles.root} statistics-dashboard`}>
      <label className="field">
        <span className="field__label">Month</span>
        <select
          className="field__input"
          value={period.month}
          onChange={(event) =>
            onChange({ ...period, month: Number(event.target.value) })
          }
        >
          {MONTH_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </label>

      <label className="field">
        <span className="field__label">Year</span>
        <select
          className="field__input"
          value={period.year}
          onChange={(event) =>
            onChange({ ...period, year: Number(event.target.value) })
          }
        >
          {yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}
