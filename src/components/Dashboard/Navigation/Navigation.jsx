import { NavLink } from "react-router-dom";
import { HiOutlineChartPie, HiOutlineCurrencyDollar, HiOutlineHome } from "react-icons/hi2";
import styles from "./Navigation.module.css";

const getNavClassName = ({ isActive }) =>
  `nav-link${isActive ? " nav-link--active" : ""}`;

export default function Navigation() {
  return (
    <nav className={`${styles.nav} dashboard-nav`} aria-label="Dashboard">
      <NavLink className={getNavClassName} to="/home">
        <HiOutlineHome size={22} />
        <span>Home</span>
      </NavLink>
      <NavLink className={getNavClassName} to="/statistics">
        <HiOutlineChartPie size={22} />
        <span>Statistics</span>
      </NavLink>
      <NavLink
        className={({ isActive }) =>
          `${getNavClassName({ isActive })} nav-link--mobile-only`
        }
        to="/currency"
      >
        <HiOutlineCurrencyDollar size={22} />
        <span>Currency</span>
      </NavLink>
    </nav>
  );
}
