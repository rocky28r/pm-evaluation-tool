import { useMemo } from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";
import { skillCategories, pointLabelColors } from "@/lib/pm-skills-data";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

interface SkillsChartProps {
  ownScores: (number | null)[];
  roleScores: (number | null)[];
  selectedRole: string;
}

export function SkillsChart({
  ownScores,
  roleScores,
  selectedRole,
}: SkillsChartProps) {
  const data = useMemo(
    () => ({
      labels: skillCategories,
      datasets: [
        {
          label: "Own Assessment",
          data: ownScores,
          fill: true,
          backgroundColor: "rgba(54, 162, 235, 0.2)",
          borderColor: "rgb(54, 162, 235)",
          pointBackgroundColor: "rgb(54, 162, 235)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(54, 162, 235)",
          spanGaps: true,
          borderWidth: 2,
        },
        {
          label: `${selectedRole} Expectation`,
          data: roleScores,
          fill: true,
          backgroundColor: "rgba(255, 99, 132, 0.2)",
          borderColor: "rgb(255, 99, 132)",
          borderDash: [5, 5],
          pointBackgroundColor: "rgb(255, 99, 132)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgb(255, 99, 132)",
          spanGaps: true,
          borderWidth: 2,
        },
      ],
    }),
    [ownScores, roleScores, selectedRole]
  );

  const options = useMemo(
    () => ({
      animation: {
        duration: 400,
      },
      elements: {
        line: {
          borderWidth: 2,
        },
      },
      scales: {
        r: {
          angleLines: {
            display: true,
            color: "rgba(0, 0, 0, 0.1)",
          },
          grid: {
            color: "rgba(0, 0, 0, 0.08)",
          },
          suggestedMin: 0,
          suggestedMax: 3,
          ticks: {
            stepSize: 0.5,
            backdropColor: "rgba(255, 255, 255, 0.9)",
            font: {
              size: 10,
            },
          },
          pointLabels: {
            callback: function (label: string, index: number) {
              return skillCategories[index] !== "" ? label : null;
            },
            font: {
              size: window.innerWidth < 480 ? 8 : window.innerWidth < 768 ? 10 : 11,
              weight: 500,
            },
            color: (ctx: { index: number }) => pointLabelColors[ctx.index] || "#666",
          },
        },
      },
      plugins: {
        tooltip: {
          filter: function (tooltipItem: { raw: unknown }) {
            return tooltipItem.raw !== null;
          },
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          titleFont: {
            size: 13,
          },
          bodyFont: {
            size: 12,
          },
          padding: 12,
          cornerRadius: 8,
        },
        legend: {
          position: "top" as const,
          display: window.innerWidth >= 480,
          labels: {
            usePointStyle: true,
            padding: 20,
            font: {
              size: 12,
              weight: 500,
            },
          },
        },
      },
      maintainAspectRatio: true,
      responsive: true,
    }),
    []
  );

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-card rounded-xl border shadow-sm animate-scale-in">
      <Radar data={data} options={options} />
    </div>
  );
}
