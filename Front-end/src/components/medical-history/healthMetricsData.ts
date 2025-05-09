export interface HealthMetric {
  id: string;
  name: string;
  unit: string;
  normalRange: {
    min: number;
    max: number;
  };
  data: {
    date: string;
    value: number;
    type: string;
  }[];
}

export const healthMetrics: HealthMetric[] = [
  {
    id: 'blood-pressure',
    name: 'Blood Pressure',
    unit: 'mmHg',
    normalRange: { min: 90, max: 120 },
    data: [
      { date: '2024-01-01', value: 120, type: 'systolic' },
      { date: '2024-02-01', value: 118, type: 'systolic' },
      { date: '2024-03-01', value: 122, type: 'systolic' },
    ]
  },
  {
    id: 'heart-rate',
    name: 'Heart Rate',
    unit: 'BPM',
    normalRange: { min: 60, max: 100 },
    data: [
      { date: '2024-01-01', value: 75, type: 'heart_rate' },
      { date: '2024-02-01', value: 72, type: 'heart_rate' },
      { date: '2024-03-01', value: 78, type: 'heart_rate' },
    ]
  },
  {
    id: 'blood-glucose',
    name: 'Blood Glucose',
    unit: 'mg/dL',
    normalRange: { min: 70, max: 140 },
    data: [
      { date: '2024-01-01', value: 95, type: 'glucose' },
      { date: '2024-02-01', value: 102, type: 'glucose' },
      { date: '2024-03-01', value: 98, type: 'glucose' },
    ]
  },
  {
    id: 'oxygen-saturation',
    name: 'Oxygen Saturation',
    unit: '%',
    normalRange: { min: 95, max: 100 },
    data: [
      { date: '2024-01-01', value: 98, type: 'spo2' },
      { date: '2024-02-01', value: 97, type: 'spo2' },
      { date: '2024-03-01', value: 99, type: 'spo2' },
    ]
  },
  {
    id: 'body-temperature',
    name: 'Body Temperature',
    unit: '°F',
    normalRange: { min: 97, max: 99 },
    data: [
      { date: '2024-01-01', value: 98.2, type: 'temperature' },
      { date: '2024-02-01', value: 98.4, type: 'temperature' },
      { date: '2024-03-01', value: 98.1, type: 'temperature' },
    ]
  },
  {
    id: 'bmi',
    name: 'BMI',
    unit: 'kg/m²',
    normalRange: { min: 18.5, max: 24.9 },
    data: [
      { date: '2024-01-01', value: 22.5, type: 'bmi' },
      { date: '2024-02-01', value: 22.3, type: 'bmi' },
      { date: '2024-03-01', value: 22.4, type: 'bmi' },
    ]
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    unit: 'g/dL',
    normalRange: { min: 12, max: 16 },
    data: [
      { date: '2024-01-01', value: 14.2, type: 'hemoglobin' },
      { date: '2024-02-01', value: 14.0, type: 'hemoglobin' },
      { date: '2024-03-01', value: 14.1, type: 'hemoglobin' },
    ]
  },
  {
    id: 'cholesterol',
    name: 'Total Cholesterol',
    unit: 'mg/dL',
    normalRange: { min: 125, max: 200 },
    data: [
      { date: '2024-01-01', value: 180, type: 'cholesterol' },
      { date: '2024-02-01', value: 175, type: 'cholesterol' },
      { date: '2024-03-01', value: 178, type: 'cholesterol' },
    ]
  },
  {
    id: 'creatinine',
    name: 'Creatinine',
    unit: 'mg/dL',
    normalRange: { min: 0.7, max: 1.3 },
    data: [
      { date: '2024-01-01', value: 1.0, type: 'creatinine' },
      { date: '2024-02-01', value: 1.1, type: 'creatinine' },
      { date: '2024-03-01', value: 1.0, type: 'creatinine' },
    ]
  },
  {
    id: 'urea',
    name: 'Urea',
    unit: 'mg/dL',
    normalRange: { min: 7, max: 20 },
    data: [
      { date: '2024-01-01', value: 15, type: 'urea' },
      { date: '2024-02-01', value: 14, type: 'urea' },
      { date: '2024-03-01', value: 16, type: 'urea' },
    ]
  },
  {
    id: 'liver-enzymes',
    name: 'Liver Enzymes (SGPT)',
    unit: 'U/L',
    normalRange: { min: 7, max: 56 },
    data: [
      { date: '2024-01-01', value: 30, type: 'sgpt' },
      { date: '2024-02-01', value: 28, type: 'sgpt' },
      { date: '2024-03-01', value: 32, type: 'sgpt' },
    ]
  },
  {
    id: 'thyroid',
    name: 'TSH',
    unit: 'mIU/L',
    normalRange: { min: 0.4, max: 4.0 },
    data: [
      { date: '2024-01-01', value: 2.5, type: 'tsh' },
      { date: '2024-02-01', value: 2.3, type: 'tsh' },
      { date: '2024-03-01', value: 2.4, type: 'tsh' },
    ]
  }
]; 