import { Link } from "react-router-dom";

export default function Brand({ centered = false, to = "/" }) {
  return (
    <Link className={`brand ${centered ? "brand--centered" : ""}`} to={to}>
      <span className="brand__symbol">
        <span className="brand__dot brand__dot--left" />
        <span className="brand__dot brand__dot--right" />
      </span>
      <span className="brand__text">Money Guard</span>
    </Link>
  );
}
