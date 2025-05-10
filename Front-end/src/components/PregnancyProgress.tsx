import React, { useState } from "react";
import { differenceInWeeks, addDays, format } from "date-fns";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer
} from "recharts";

const PregnancyProgress = () => {
  const [lmpDate, setLmpDate] = useState<string>("");

  const calculateProgress = () => {
    const lmp = new Date(lmpDate);
    const dueDate = addDays(lmp, 280);
    const today = new Date();
    const weeksPassed = differenceInWeeks(today, lmp);
    const progressPercent = Math.min((weeksPassed / 40) * 100, 100);
    return { dueDate, weeksPassed, progressPercent };
  };

  const { dueDate, weeksPassed, progressPercent } = lmpDate
    ? calculateProgress()
    : { dueDate: null, weeksPassed: 0, progressPercent: 0 };

  const chartData = [
    {
      name: "Pregnancy Progress",
      uv: progressPercent,
      fill: "#ec4899" // Tailwind pink-500
    }
  ];

  const trimester =
    weeksPassed < 13
      ? "1st Trimester"
      : weeksPassed < 27
      ? "2nd Trimester"
      : "3rd Trimester";

  return (
    <div className="w-full max-w-xl mx-auto bg-white shadow-md rounded p-6 mt-6">
      <h2 className="text-xl font-semibold mb-4 text-pink-600">Pregnancy Progress</h2>

      <label className="block mb-2 text-gray-700">
        Enter Date of Last Menstrual Period (LMP):
      </label>
      <input
        type="date"
        value={lmpDate}
        onChange={(e) => setLmpDate(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full"
      />

      {lmpDate && (
        <div className="mt-6">
          <p><strong>Weeks Passed:</strong> {weeksPassed} / 40 weeks</p>
          <p><strong>Estimated Due Date:</strong> {dueDate ? format(dueDate, "PPP") : "N/A"}</p>

          {/* Chart */}
          <div className="h-72 my-6">
  <ResponsiveContainer width="100%" height="100%">
    <RadialBarChart
      cx="50%"
      cy="50%"
      innerRadius="60%"
      outerRadius="100%"
      barSize={20}
      data={[
        { name: "Completed", uv: progressPercent, fill: "#ec4899" },
        { name: "Remaining", uv: 100 - progressPercent, fill: "#f3f4f6" } // Tailwind gray-100
      ]}
      startAngle={90}
      endAngle={-270}
    >
      <RadialBar
        minAngle={5}
        label={{
          position: "center",
          content: () => (
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" fontSize="16" fill="#ec4899">
              {`${Math.floor(progressPercent)}% Completed`}
            </text>
          )
        }}
        background
        clockWise
        dataKey="uv"
      />
    </RadialBarChart>
  </ResponsiveContainer>
</div>


          {/* Trimester info */}
          <div className="mt-4 text-sm text-gray-700">
            <p className="text-center mb-2">
              <strong>Current Trimester:</strong> {trimester}
            </p>
            <div className="text-xs leading-relaxed bg-pink-50 p-4 rounded border border-pink-200">
              <p><strong>1st Trimester (Week 1–12):</strong> Initial fetal development, organ formation, and high fatigue/nausea.</p>
              <p><strong>2nd Trimester (Week 13–26):</strong> More energy, baby movement, belly becomes visible.</p>
              <p><strong>3rd Trimester (Week 27–40):</strong> Final growth, baby positions for delivery, stronger kicks, and contractions.</p>
            </div>

            <div className="mt-4 text-xs text-gray-500 italic text-center">
              This chart shows how far along you are in your pregnancy based on the last menstrual period (LMP). Progress is calculated out of 40 weeks.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PregnancyProgress;
