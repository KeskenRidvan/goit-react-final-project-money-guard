import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatisticsChart from "../../components/Statistics/StatisticsChart/StatisticsChart";
import StatisticsDashboard from "../../components/Statistics/StatisticsDashboard/StatisticsDashboard";
import StatisticsTable from "../../components/Statistics/StatisticsTable/StatisticsTable";
import { fetchTransactionsSummary } from "../../redux/finance/operations";
import {
  selectStatistics,
  selectStatisticsPeriod,
} from "../../redux/finance/selectors";
import { setStatisticsPeriod } from "../../redux/finance/slice";
import { getMonthLabel } from "../../utils/formatters";
import styles from "./StatisticsTab.module.css";

export default function StatisticsTab() {
  const dispatch = useDispatch();
  const statistics = useSelector(selectStatistics);
  const period = useSelector(selectStatisticsPeriod);

  useEffect(() => {
    dispatch(fetchTransactionsSummary(period));
  }, [dispatch, period]);

  return (
    <section className={`${styles.page} page-section`}>
      <div className="section-heading">
        <div>
          <span className="section-heading__eyebrow">Monthly insight</span>
          <h1 className="section-heading__title">Statistics</h1>
        </div>
        <span className="section-heading__badge">
          {getMonthLabel(period.month)} {period.year}
        </span>
      </div>

      <StatisticsDashboard
        onChange={(nextPeriod) => dispatch(setStatisticsPeriod(nextPeriod))}
        period={period}
      />

      <div className="statistics-layout">
        <StatisticsChart statistics={statistics} />
        <StatisticsTable statistics={statistics} />
      </div>
    </section>
  );
}
