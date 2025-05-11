import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { format, addDays } from "date-fns";
import PregnancyProgress from "@/components/PregnancyProgress";

const symptomsList = [
  "Irregular periods",
  "Excess facial/body hair",
  "Acne",
  "Rapid weight gain",
  "Hair thinning",
  "Mood swings",
  "Stomach/Abdominal pain",
  "Fatigue",
  "Pelvic discomfort",
];

const symptomData = [
  { symptom: "Irregular periods", percent: 85 },
  { symptom: "Excess facial/body hair", percent: 70 },
  { symptom: "Acne", percent: 65 },
  { symptom: "Rapid weight gain", percent: 60 },
  { symptom: "Hair thinning", percent: 55 },
  { symptom: "Mood swings", percent: 50 },
  { symptom: "Stomach/Abdominal pain", percent: 45 },
  { symptom: "Fatigue", percent: 40 },
  { symptom: "Pelvic discomfort", percent: 35 },
];

const SheCare: React.FC = () => {
  const [lastPeriodDate, setLastPeriodDate] = useState<string>("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [pcodRisk, setPcodRisk] = useState<string | null>(null);
  const [pregnancyDate, setPregnancyDate] = useState<string>("");
  const [dueDate, setDueDate] = useState<string | null>(null);

  const handleSymptomChange = (symptom: string) => {
    setSymptoms((prev) =>
      prev.includes(symptom) ? prev.filter((s) => s !== symptom) : [...prev, symptom]
    );
  };

  const calculatePCODRisk = () => {
    const score = symptoms.length;
    let risk = "Low";
    if (score >= 4 && score <= 6) risk = "Moderate";
    else if (score > 6) risk = "High";
    setPcodRisk(risk);
  };

  const calculateDueDate = () => {
    if (pregnancyDate) {
      const estimatedDue = addDays(new Date(pregnancyDate), 280); // 40 weeks
      setDueDate(format(estimatedDue, "yyyy-MM-dd"));
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10 bg-pink-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-pink-600">
        💗🌸 SheCare – Women's Health Tracker 🌸💗
      </h1>


      {/* 🔍 PCOD Symptoms Chart */}
      <div className="w-full h-96 mb-16">
        <h2 className="text-2xl font-semibold mb-4 text-center text-pink-500">
          Common PCOD Symptoms & Their Indicative Strength
        </h2>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={symptomData}
            layout="vertical"
            margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
            <YAxis dataKey="symptom" type="category" width={180} />
            <Tooltip formatter={(value) => `${value}% likelihood`} />
            <Bar dataKey="percent" fill="#ec4899" radius={[0, 10, 10, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="h-8" />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Column: Forms */}
        <div className="flex-1 space-y-8">
          {/* Period Tracking and PCOD Risk */}
          <Card>
            <CardHeader>
              <CardTitle>Period Tracking & PCOD Prediction</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Last Period Date:</Label>
              <Input
                type="date"
                value={lastPeriodDate}
                onChange={(e) => setLastPeriodDate(e.target.value)}
              />

              <Label>Check symptoms you've experienced recently:</Label>
              <div className="grid grid-cols-2 gap-2">
                {symptomsList.map((symptom) => (
                  <label key={symptom} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={symptoms.includes(symptom)}
                      onChange={() => handleSymptomChange(symptom)}
                    />
                    <span>{symptom}</span>
                  </label>
                ))}
              </div>

              <Button onClick={calculatePCODRisk}>Predict PCOD Risk</Button>

              {pcodRisk && (
                <div className="p-4 rounded bg-pink-50 text-pink-700 border border-pink-300 mt-4">
                  🔍 <strong>Predicted PCOD Risk:</strong> {pcodRisk}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Pregnancy Due Date Estimator */}
          <Card>
            <CardHeader>
              <CardTitle>Pregnancy Due Date Estimator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Label>Date of Last Menstrual Period (LMP):</Label>
              <Input
                type="date"
                value={pregnancyDate}
                onChange={(e) => setPregnancyDate(e.target.value)}
              />
              <Button onClick={calculateDueDate}>Estimate Due Date</Button>
              {dueDate && (
                <div className="p-4 rounded bg-green-50 text-green-700 border border-green-300 mt-4">
                  🤰 <strong>Estimated Due Date:</strong> {dueDate}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Pregnancy Progress Graph */}
        <div className="w-full lg:w-1/3">
          <PregnancyProgress />
        </div>
      </div>
    </div>
  );
};

export default SheCare;
