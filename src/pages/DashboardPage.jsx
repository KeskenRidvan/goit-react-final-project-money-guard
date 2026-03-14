import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import Header from "../components/Dashboard/Header";
import Navigation from "../components/Dashboard/Navigation";
import BalanceCard from "../components/Dashboard/BalanceCard";
import CurrencyCard from "../components/Dashboard/CurrencyCard";
import { fetchCurrencyRates } from "../redux/finance/operations";

export default function DashboardPage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrencyRates());
  }, [dispatch]);

  return (
    <div className="dashboard-page">
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
