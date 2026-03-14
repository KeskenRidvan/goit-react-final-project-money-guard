import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { formatCurrency } from "../../../utils/formatters";
import styles from "./StatisticsChart.module.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const centerTextPlugin = {
  id: "centerText",
  afterDraw(chart, _args, pluginOptions) {
    const {
      ctx,
      chartArea: { left, right, top, bottom },
    } = chart;

    if (!pluginOptions?.text) {
      return;
    }

    ctx.save();
    ctx.fillStyle = "#fbfbfb";
    ctx.font = "700 18px Poppins";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(
      pluginOptions.text,
      (left + right) / 2,
      (top + bottom) / 2
    );
    ctx.restore();
  },
};

ChartJS.register(centerTextPlugin);

const palette = [
  "#14b8a6",
  "#f97316",
  "#fb7185",
  "#38bdf8",
  "#facc15",
  "#a78bfa",
];

export default function StatisticsChart({ statistics }) {
  if (!statistics?.categoriesSummary?.length) {
    return <p className="placeholder">Expense chart will appear when summary data is available.</p>;
  }

  const expenseData = statistics.categoriesSummary.filter(
    (item) => item.type === "EXPENSE"
  );

  if (!expenseData.length) {
    return <p className="placeholder">No expense data for the selected period.</p>;
  }

  const data = {
    labels: expenseData.map((item) => item.name),
    datasets: [
      {
        data: expenseData.map((item) => Math.abs(item.total)),
        backgroundColor: expenseData.map(
          (_, index) => palette[index % palette.length]
        ),
        hoverOffset: 8,
        spacing: 2,
        borderWidth: 0,
      },
    ],
  };

  const options = {
    animation: {
      animateRotate: true,
      duration: 900,
    },
    cutout: "60%",
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      centerText: {
        text: formatCurrency(statistics.expenseSummary, { absolute: true }),
      },
      tooltip: {
        callbacks: {
          label(context) {
            return `${context.label}: ${formatCurrency(context.raw)}`;
          },
        },
      },
    },
  };

  const chartKey = `${statistics.year}-${statistics.month}-${expenseData
    .map((item) => `${item.name}:${Math.abs(item.total)}`)
    .join("|")}`;

  return (
    <div className={`${styles.card} chart-card`}>
      <div className={`${styles.visual} chart-card__visual`}>
        <Doughnut data={data} key={chartKey} options={options} />
      </div>
      <div className={`${styles.legend} chart-card__legend`}>
        {expenseData.map((item, index) => (
          <div
            className={`${styles.legendItem} chart-card__legend-item`}
            key={`${item.name}-${item.type}`}
          >
            <span
              className={`${styles.legendSwatch} chart-card__legend-swatch`}
              style={{ backgroundColor: palette[index % palette.length] }}
            />
            <span>{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
