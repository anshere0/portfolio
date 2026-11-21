/**
 * GridGuard AI — Demo Data
 * Tag: synthetic data (and illustrative for SHAP attribution)
 */

export interface GridGuardMetricPoint {
  time: string;
  voltage: number;   // Nominal 230V
  current: number;   // Nominal 15-25A
  freq: number;      // Nominal 50.0 Hz
  powerFactor: number; // 0.85 - 0.98
  isAnomaly: boolean;
  zScore: number;
}

export const GRIDGUARD_SAMPLE_POINTS: GridGuardMetricPoint[] = [
  { time: "00:00.0", voltage: 230.1, current: 18.2, freq: 50.01, powerFactor: 0.94, isAnomaly: false, zScore: 0.12 },
  { time: "00:00.2", voltage: 229.8, current: 19.4, freq: 49.99, powerFactor: 0.93, isAnomaly: false, zScore: 0.28 },
  { time: "00:00.4", voltage: 230.4, current: 18.9, freq: 50.02, powerFactor: 0.95, isAnomaly: false, zScore: 0.19 },
  { time: "00:00.6", voltage: 228.9, current: 21.1, freq: 49.97, powerFactor: 0.91, isAnomaly: false, zScore: 0.74 },
  { time: "00:00.8", voltage: 231.2, current: 18.0, freq: 50.03, powerFactor: 0.96, isAnomaly: false, zScore: 0.31 },
  { time: "00:01.0", voltage: 204.5, current: 58.7, freq: 48.82, powerFactor: 0.62, isAnomaly: true, zScore: 3.48 },
  { time: "00:01.2", voltage: 206.1, current: 54.2, freq: 48.91, powerFactor: 0.65, isAnomaly: true, zScore: 3.12 },
  { time: "00:01.4", voltage: 222.4, current: 29.3, freq: 49.65, powerFactor: 0.84, isAnomaly: false, zScore: 1.45 },
  { time: "00:01.6", voltage: 229.4, current: 19.8, freq: 49.98, powerFactor: 0.92, isAnomaly: false, zScore: 0.35 },
  { time: "00:01.8", voltage: 230.2, current: 18.5, freq: 50.01, powerFactor: 0.95, isAnomaly: false, zScore: 0.15 },
];

export interface ShapAttribution {
  feature: string;
  weight: number; // Percentage contribution
  direction: "positive" | "negative";
  baseline: string;
  actual: string;
}

export const SHAP_EXPLANATION_ANOMALY: ShapAttribution[] = [
  { feature: "Current Surge (A)", weight: 48, direction: "positive", baseline: "18.5 A", actual: "58.7 A (+217%)" },
  { feature: "Voltage Sag (V)", weight: 32, direction: "negative", baseline: "230.0 V", actual: "204.5 V (-11%)" },
  { feature: "Grid Frequency (Hz)", weight: 14, direction: "negative", baseline: "50.00 Hz", actual: "48.82 Hz (-2.3%)" },
  { feature: "Power Factor Drop", weight: 6, direction: "negative", baseline: "0.94", actual: "0.62 (-34%)" },
];
