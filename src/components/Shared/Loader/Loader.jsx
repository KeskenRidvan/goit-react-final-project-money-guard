import { CirclesWithBar } from "react-loader-spinner";
import styles from "./Loader.module.css";

export default function Loader() {
  return (
    <div className={`${styles.root} loader-backdrop`} role="status" aria-live="polite">
      <CirclesWithBar
        color="#f97316"
        height="120"
        outerCircleColor="#14b8a6"
        width="120"
      />
      <p className="loader-backdrop__text">Money Guard is syncing your data...</p>
    </div>
  );
}
