/**
 * NSE Momentum & Breadth Scanner — Demo Data
 * Tag: recorded run
 * Realistic binary tick sequence and market breadth updates
 */

export interface NseTickFrame {
  id: number;
  timestamp: string;
  rawHex: string;
  symbol: string;
  ltp: number;
  change: number;
  advances: number;
  declines: number;
  ratio: number;
  ssePayload: string;
}

export const NSE_DEMO_FRAMES: NseTickFrame[] = [
  {
    id: 1,
    timestamp: "09:15:02 IST",
    rawHex: "01 2A 4E 49 46 54 59 00 00 5E 9A 14 00 00 00 12",
    symbol: "NIFTY 50",
    ltp: 24210.45,
    change: +14.2,
    advances: 28,
    declines: 22,
    ratio: 1.27,
    ssePayload: '{"event":"breadth","adv":28,"dec":22,"ratio":1.27,"regime":"neutral"}',
  },
  {
    id: 2,
    timestamp: "09:15:08 IST",
    rawHex: "01 2A 4E 49 46 54 59 00 00 5E 9B 40 00 00 00 14",
    symbol: "NIFTY 50",
    ltp: 24228.8,
    change: +32.55,
    advances: 34,
    declines: 16,
    ratio: 2.12,
    ssePayload: '{"event":"breadth","adv":34,"dec":16,"ratio":2.12,"regime":"bullish_momentum"}',
  },
  {
    id: 3,
    timestamp: "09:15:15 IST",
    rawHex: "01 2A 4E 49 46 54 59 00 00 5E 9D 18 00 00 00 18",
    symbol: "NIFTY 50",
    ltp: 24254.1,
    change: +57.85,
    advances: 41,
    declines: 9,
    ratio: 4.55,
    ssePayload: '{"event":"breadth","adv":41,"dec":9,"ratio":4.55,"regime":"extreme_expansion"}',
  },
  {
    id: 4,
    timestamp: "09:15:22 IST",
    rawHex: "01 2A 4E 49 46 54 59 00 00 5E 9B 90 00 00 00 14",
    symbol: "NIFTY 50",
    ltp: 24239.6,
    change: +43.35,
    advances: 37,
    declines: 13,
    ratio: 2.84,
    ssePayload: '{"event":"breadth","adv":37,"dec":13,"ratio":2.84,"regime":"volume_absorption"}',
  },
  {
    id: 5,
    timestamp: "09:15:30 IST",
    rawHex: "01 2A 4E 49 46 54 59 00 00 5E 9E 50 00 00 00 20",
    symbol: "NIFTY 50",
    ltp: 24272.95,
    change: +76.7,
    advances: 44,
    declines: 6,
    ratio: 7.33,
    ssePayload: '{"event":"breadth","adv":44,"dec":6,"ratio":7.33,"regime":"trend_confirmation"}',
  },
];
