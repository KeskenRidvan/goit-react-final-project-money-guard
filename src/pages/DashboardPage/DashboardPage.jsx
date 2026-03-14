import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../../components/Dashboard/Header/Header";
import Navigation from "../../components/Dashboard/Navigation/Navigation";
import BalanceCard from "../../components/Dashboard/BalanceCard/BalanceCard";
import CurrencyCard from "../../components/Dashboard/CurrencyCard/CurrencyCard";
import { fetchCurrencyRates } from "../../redux/finance/operations";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  return (
    <div className={`${styles.page} dashboard-page`}>
      <Header />
      <div className="dashboard-layout container">
        <aside className="dashboard-sidebar">
          <Navigation />
          <BalanceCard />
          <div className="dashboard-sidebar__currency">
            <CurrencyCard />
          </div>
        </aside>

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
