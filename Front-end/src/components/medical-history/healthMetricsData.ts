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

const today = new Date();
const yesterday = new Date();
yesterday.setDate(today.getDate() - 1);

export const healthMetrics: HealthMetric[] = [
  {
    id: 'blood-pressure',
    name: 'Blood Pressure',
    unit: 'mmHg',
    normalRange: { min: 90, max: 120 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 118, type: 'blood-pressure' },
      { date: today.toISOString().split('T')[0], value: 120, type: 'blood-pressure' }
    ]
  },
  {
    id: 'heart-rate',
    name: 'Heart Rate',
    unit: 'BPM',
    normalRange: { min: 60, max: 100 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 74, type: 'heart-rate' },
      { date: today.toISOString().split('T')[0], value: 75, type: 'heart-rate' }
    ]
  },
  {
    id: 'blood-glucose',
    name: 'Blood Glucose',
    unit: 'mg/dL',
    normalRange: { min: 70, max: 140 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 98, type: 'blood-glucose' },
      { date: today.toISOString().split('T')[0], value: 100, type: 'blood-glucose' }
    ]
  },
  {
    id: 'oxygen-saturation',
    name: 'Oxygen Saturation',
    unit: '%',
    normalRange: { min: 95, max: 100 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 97, type: 'oxygen-saturation' },
      { date: today.toISOString().split('T')[0], value: 98, type: 'oxygen-saturation' }
    ]
  },
  {
    id: 'body-temperature',
    name: 'Body Temperature',
    unit: '°F',
    normalRange: { min: 97, max: 99 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 98.4, type: 'body-temperature' },
      { date: today.toISOString().split('T')[0], value: 98.6, type: 'body-temperature' }
    ]
  },
  {
    id: 'bmi',
    name: 'BMI',
    unit: 'kg/m²',
    normalRange: { min: 18.5, max: 24.9 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 21.8, type: 'bmi' },
      { date: today.toISOString().split('T')[0], value: 22, type: 'bmi' }
    ]
  },
  {
    id: 'hemoglobin',
    name: 'Hemoglobin',
    unit: 'g/dL',
    normalRange: { min: 12, max: 16 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 13.8, type: 'hemoglobin' },
      { date: today.toISOString().split('T')[0], value: 14, type: 'hemoglobin' }
    ]
  },
  {
    id: 'cholesterol',
    name: 'Total Cholesterol',
    unit: 'mg/dL',
    normalRange: { min: 125, max: 200 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 178, type: 'cholesterol' },
      { date: today.toISOString().split('T')[0], value: 180, type: 'cholesterol' }
    ]
  },
  {
    id: 'creatinine',
    name: 'Creatinine',
    unit: 'mg/dL',
    normalRange: { min: 0.7, max: 1.3 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 0.98, type: 'creatinine' },
      { date: today.toISOString().split('T')[0], value: 1.0, type: 'creatinine' }
    ]
  },
  {
    id: 'urea',
    name: 'Urea',
    unit: 'mg/dL',
    normalRange: { min: 7, max: 20 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 14, type: 'urea' },
      { date: today.toISOString().split('T')[0], value: 15, type: 'urea' }
    ]
  },
  {
    id: 'liver-enzymes',
    name: 'Liver Enzymes (SGPT)',
    unit: 'U/L',
    normalRange: { min: 7, max: 56 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 28, type: 'liver-enzymes' },
      { date: today.toISOString().split('T')[0], value: 30, type: 'liver-enzymes' }
    ]
  },
  {
    id: 'thyroid',
    name: 'TSH',
    unit: 'mIU/L',
    normalRange: { min: 0.4, max: 4.0 },
    data: [
      { date: yesterday.toISOString().split('T')[0], value: 2.3, type: 'thyroid' },
      { date: today.toISOString().split('T')[0], value: 2.5, type: 'thyroid' }
    ]
  }
]; 