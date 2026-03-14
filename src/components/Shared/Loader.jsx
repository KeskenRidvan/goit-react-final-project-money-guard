import { CirclesWithBar } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className="loader-backdrop" role="status" aria-live="polite">
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
