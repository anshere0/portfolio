/**
 * Delta Exchange Options Risk-Reward Engine — Demo Data
 * Tag: recorded run
 * Real-time Greeks, order-flow delta, and setup criteria
 */

export interface DeltaOptionsFrame {
  id: string;
  strike: number;
  type: "CALL" | "PUT";
  expiry: string;
  spotPrice: number;
  premium: number;
  iv: number;        // Implied Volatility %
  delta: number;     // Δ
  gamma: number;     // Γ
  theta: number;     // Θ
  vega: number;      // V
  riskReward: number; // e.g. 2.8
  setupStatus: "VALID SETUP" | "NO TRADE";
  reason: string;
}

export const DELTA_OPTIONS_FRAMES: DeltaOptionsFrame[] = [
  {
    id: "frame_01",
    strike: 92000,
    type: "CALL",
    expiry: "28-NOV-2026",
    spotPrice: 91840.5,
    premium: 1240.0,
    iv: 56.4,
    delta: 0.54,
    gamma: 0.00042,
    theta: -42.8,
    vega: 28.6,
    riskReward: 3.1,
    setupStatus: "VALID SETUP",
    reason: "Order-flow delta positive, tight spread (<0.5%), R:R above 1:2.5 threshold.",
  },
  {
    id: "frame_02",
    strike: 91500,
    type: "PUT",
    expiry: "28-NOV-2026",
    spotPrice: 91840.5,
    premium: 980.0,
    iv: 68.2,
    delta: -0.42,
    gamma: 0.00038,
    theta: -38.4,
    vega: 24.1,
    riskReward: 1.6,
    setupStatus: "NO TRADE",
    reason: "IV spike exceeds historical 90th percentile; adverse risk-reward (1:1.6 < 1:2.5 min).",
  },
  {
    id: "frame_03",
    strike: 93000,
    type: "CALL",
    expiry: "28-NOV-2026",
    spotPrice: 91840.5,
    premium: 650.0,
    iv: 54.1,
    delta: 0.32,
    gamma: 0.00029,
    theta: -31.2,
    vega: 19.8,
    riskReward: 2.7,
    setupStatus: "VALID SETUP",
    reason: "Volume absorption confirms support level, risk-reward 1:2.7 meets execution gate.",
  },
];
