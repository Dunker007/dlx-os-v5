"use client";

import { useEffect } from "react";
import LuxChat from "../../components/LuxChat";

// ══════════════════════════════════════════════
//  DATA
// ══════════════════════════════════════════════

const HOLDINGS = [
  { sym: 'ETH',  name: 'Grayscale Ethereum Mini Trust',   qty: 743,  price: 20.20, cost: 14058.24, value: 15008.60, gl: 950.36,  glPct: 6.76,  dayChg: -0.39, year52Low: 13.69, year52High: 45.78, color: '#627EEA', acct: 'trad' },
  { sym: 'IBIT', name: 'iShares Bitcoin Trust ETF',        qty: 362,  price: 39.77, cost: 14052.96, value: 14396.74, gl: 343.78,  glPct: 2.45,  dayChg: -0.13, year52Low: 35.30, year52High: 71.82, color: '#F7931A', acct: 'trad' },
  { sym: 'BITQ', name: 'Bitwise Crypto Innovators ETF',    qty: 300,  price: 20.38, cost: 5917.22,  value: 6114.00,  gl: 196.78,  glPct: 3.33,  dayChg: -2.35, year52Low: 10.50, year52High: 31.45, color: '#FF6B35', acct: 'roth' },
  { sym: 'BSOL', name: 'Bitwise Solana Staking ETF',       qty: 501,  price: 11.91, cost: 6681.03,  value: 5966.91,  gl: -714.12, glPct: -10.69,dayChg:  0.34, year52Low: 10.10, year52High: 26.60, color: '#9945FF', acct: 'roth' },
  { sym: 'EZPZ', name: 'Franklin Crypto Index ETF',        qty: 289,  price: 17.88, cost: 4995.93,  value: 5167.32,  gl: 171.39,  glPct: 3.43,  dayChg:  0.17, year52Low: 15.92, year52High: 33.77, color: '#00B4D8', acct: 'roth' },
  { sym: 'CRPT', name: 'SkyBridge Crypto Industry ETF',    qty: 238,  price: 12.84, cost: 2954.15,  value: 3055.92,  gl: 101.77,  glPct: 3.44,  dayChg:  0.01, year52Low: 10.51, year52High: 25.90, color: '#06D6A0', acct: 'roth' },
  { sym: 'XRPZ', name: 'Franklin XRP Trust',               qty: 301,  price: 15.58, cost: 5167.92,  value: 4689.58,  gl: -478.34, glPct: -9.26, dayChg:  null, year52Low: null,  year52High: null,  color: '#00AAE4', acct: 'roth' },
  { sym: 'GSUI', name: 'Grayscale Sui Staking ETF',         qty: 1,    price: 13.85, cost: 13.20,   value: 13.85,    gl: 0.65,    glPct: 4.92,  dayChg:  null, year52Low: null,  year52High: null,  color: '#4FD1C5', acct: 'roth' },
];

const OPEN_ORDERS = [
  // Trad
  { sym: 'ETH',  type: 'buy', price: 15.80, qty: 87,  acct: 'Trad' },
  { sym: 'ETH',  type: 'buy', price: 13.50, qty: 153, acct: 'Trad' },
  { sym: 'ETH',  type: 'buy', price: 11.15, qty: 309, acct: 'Trad' },
  { sym: 'IBIT', type: 'buy', price: 32.75, qty: 42,  acct: 'Trad' },
  { sym: 'IBIT', type: 'buy', price: 28.50, qty: 72,  acct: 'Trad' },
  { sym: 'IBIT', type: 'buy', price: 23.10, qty: 149, acct: 'Trad' },
  // Roth
  { sym: 'GSUI', type: 'buy', price: 12.75, qty: 20,  acct: 'Roth' },
  { sym: 'GSUI', type: 'buy', price: 12.26, qty: 20,  acct: 'Roth' },
  { sym: 'BSOL', type: 'buy', price: 9.67,  qty: 20,  acct: 'Roth' },
  { sym: 'BSOL', type: 'buy', price: 8.54,  qty: 34,  acct: 'Roth' },
  { sym: 'BSOL', type: 'buy', price: 6.83,  qty: 71,  acct: 'Roth' },
  { sym: 'EZPZ', type: 'buy', price: 14.76, qty: 13,  acct: 'Roth' },
  { sym: 'EZPZ', type: 'buy', price: 13.02, qty: 22,  acct: 'Roth' },
  { sym: 'EZPZ', type: 'buy', price: 10.42, qty: 46,  acct: 'Roth' },
  { sym: 'CRPT', type: 'buy', price: 9.50,  qty: 41,  acct: 'Roth' },
  { sym: 'CRPT', type: 'buy', price: 7.60,  qty: 77,  acct: 'Roth' },
  { sym: 'XRPZ', type: 'buy', price: 12.60, qty: 15,  acct: 'Roth' },
  { sym: 'XRPZ', type: 'buy', price: 11.12, qty: 26,  acct: 'Roth' },
  { sym: 'XRPZ', type: 'buy', price: 8.89,  qty: 54,  acct: 'Roth' },
].sort((a, b) => b.price - a.price);

const TARGET_LEVELS = [
  { sym: 'ETH',  current: 20.20, buyTarget: '$19.00',  sellTarget: '$25.00 (30% trim)' },
  { sym: 'IBIT', current: 39.77, buyTarget: '$37.00',  sellTarget: '$50.00 (25% trim)' },
  { sym: 'BITQ', current: 20.38, buyTarget: '$18.00',  sellTarget: '$25.00 (20% trim)' },
  { sym: 'BSOL', current: 11.91, buyTarget: '$7–10 ladder', sellTarget: '$13.00 avg up' },
  { sym: 'EZPZ', current: 17.88, buyTarget: '$10–15 ladder', sellTarget: '$22.00 (20% trim)' },
  { sym: 'XRPZ', current: 15.58, buyTarget: '$9–13 ladder', sellTarget: '$17.17 breakeven' },
];

const PRICE_HISTORY: any = {
  dates: ['Dec 22','Dec 29','Jan 5','Jan 12','Jan 19','Jan 26','Feb 2','Feb 9','Feb 16','Feb 23','Mar 2','Mar 9','Mar 16','Mar 22'],
  ETH:   [28.08, 27.50, 34.20, 36.50, 41.80, 45.78, 22.10, 21.30, 22.80, 21.00, 20.90, 19.50, 20.71, 20.20],
  IBIT:  [50.09, 49.00, 55.20, 60.10, 65.40, 71.82, 43.50, 41.00, 44.20, 42.00, 41.20, 39.50, 40.26, 39.77],
  BSOL:  [16.40, 16.00, 19.50, 21.80, 24.20, 26.60, 12.50, 11.20, 12.80, 12.00, 12.20, 11.40, 12.01, 11.91],
  BITQ:  [21.77, 21.00, 24.80, 27.50, 29.00, 31.45, 18.00, 17.20, 19.50, 18.80, 20.10, 19.80, 20.95, 20.38],
  EZPZ:  [22.98, 22.50, 27.80, 30.50, 32.00, 33.77, 17.80, 16.50, 18.50, 17.50, 18.00, 17.20, 18.11, 17.88],
  CRPT:  [16.35, 15.80, 19.50, 21.50, 23.00, 25.90, 12.30, 11.50, 13.20, 12.50, 13.00, 12.40, 13.20, 12.84],
};

const fmt = (n: number | null) => n == null ? '—' : '$' + Math.abs(n).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
const fmtPct = (n: number | null) => n == null ? '—' : (n >= 0 ? '+' : '') + n.toFixed(2) + '%';
const pillClass = (n: number | null) => n == null ? 'flat' : n > 0 ? 'up' : n < 0 ? 'down' : 'flat';
const arrow = (n: number) => n > 0 ? '▲' : n < 0 ? '▼' : '●';

export default function Home() {
  const maxAbsGL = Math.max(...HOLDINGS.map(h => Math.abs(h.glPct)));
  const holdingColors: any = {};
  HOLDINGS.forEach(h => holdingColors[h.sym] = h.color);

  useEffect(() => {
    // Early API calls or Chart.js instantiation goes here if we want to run the vanilla script.
    // For now we're just using React mapping for the DOM elements to make it "Next.js" native, minus Chart JS
    // which can be dropped in later if we add Chart JS explicitly.
  }, []);

  return (
    <>
      <main className="main">
        <div className="kpi-row">
          <div className="kpi-card teal">
            <div className="kpi-label">Total Portfolio</div>
            <div className="kpi-value">$75,412</div>
            <div className="kpi-delta flat">2 accounts</div>
          </div>
          <div className="kpi-card blue">
            <div className="kpi-label">Day Change</div>
            <div className="kpi-value" style={{ color: "var(--red)" }}>-$195.50</div>
            <div className="kpi-delta down">▼ -0.26%</div>
          </div>
          <div className="kpi-card green">
            <div className="kpi-label">Total Gain / Loss</div>
            <div className="kpi-value" style={{ color: "var(--green)" }}>+$572</div>
            <div className="kpi-delta up">▲ +1.07%</div>
          </div>
          <div className="kpi-card yellow">
            <div className="kpi-label">Open Orders</div>
            <div className="kpi-value">19</div>
            <div className="kpi-delta flat">GTC-ext · unfilled</div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: "16px" }}>
          <div className="card-header">
            <div className="card-title">Holdings</div>
            <span className="card-badge blue">Charles Schwab</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Asset</th>
                  <th>Price</th>
                  <th>Qty</th>
                  <th>Market Value</th>
                  <th>Cost Basis</th>
                  <th>Gain / Loss</th>
                  <th>Day Chg</th>
                  <th>52W Range</th>
                </tr>
              </thead>
              <tbody>
                {HOLDINGS.map(h => {
                  const rangePos = (h.year52Low && h.year52High) ? ((h.price - h.year52Low) / (h.year52High - h.year52Low) * 100).toFixed(0) : 50;
                  return (
                    <tr key={h.sym}>
                      <td>
                        <div className="ticker-cell">
                          <div className="ticker-icon" style={{ background: `${h.color}22`, color: h.color }}>{h.sym.slice(0, 4)}</div>
                          <div className="ticker-info">
                            <div className="ticker-sym">{h.sym}</div>
                            <div className="ticker-name">{h.name}</div>
                          </div>
                        </div>
                      </td>
                      <td><strong>${h.price.toFixed(2)}</strong></td>
                      <td>{h.qty.toLocaleString()}</td>
                      <td><strong>${h.value.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</strong></td>
                      <td style={{ color: "var(--text-secondary)" }}>${h.cost.toLocaleString('en-US',{minimumFractionDigits:2,maximumFractionDigits:2})}</td>
                      <td>
                        <span style={{ color: h.gl >= 0 ? 'var(--green)' : 'var(--red)', fontWeight: 600 }}>
                          {h.gl >= 0 ? '+' : ''}${Math.abs(h.gl).toFixed(2)}
                        </span>
                        <br/><span className={`change-pill ${pillClass(h.glPct)}`} style={{ fontSize: "10px" }}>{fmtPct(h.glPct)}</span>
                      </td>
                      <td>
                        <span className={`change-pill ${pillClass(h.dayChg)}`} style={{ fontSize: "11px" }}>{h.dayChg != null ? `${arrow(h.dayChg)} ${fmtPct(h.dayChg)}` : '—'}</span>
                      </td>
                      <td>
                        {h.year52Low && h.year52High ? (
                          <div className="range-wrap" style={{ minWidth: "100px" }}>
                            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>${h.year52Low}</span>
                            <div className="range-track">
                              <div className="range-dot" style={{ left: `${rangePos}%`, background: h.color }}></div>
                            </div>
                            <span style={{ fontSize: "10px", color: "var(--text-muted)" }}>${h.year52High}</span>
                          </div>
                        ) : <span style={{ color: "var(--text-muted)", fontSize: "11px" }}>New ETF</span>}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid-equal">
          <div className="card">
            <div className="card-header">
              <div className="card-title">P&amp;L Performance</div>
              <span className="card-badge teal">Gain / Loss %</span>
            </div>
            <div className="card-body">
              {HOLDINGS.map(h => {
                const barWidth = (Math.abs(h.glPct) / maxAbsGL * 100).toFixed(1);
                const color = h.glPct >= 0 ? 'var(--green)' : 'var(--red)';
                return (
                  <div key={h.sym} className="perf-row">
                    <div className="perf-sym" style={{ color: h.color }}>{h.sym}</div>
                    <div className="perf-bar-track">
                      <div className="perf-bar-fill" style={{ width: `${barWidth}%`, background: color }}></div>
                    </div>
                    <div className="perf-pct" style={{ color }}>{fmtPct(h.glPct)}</div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title">Open Limit Orders</div>
              <span className="card-badge blue">19 GTC-ext</span>
            </div>
            <div>
              {OPEN_ORDERS.map((o, idx) => (
                <div key={idx} className="order-row">
                  <div className="order-left">
                    <span className={`order-type ${o.type}`}>{o.type.toUpperCase()}</span>
                    <span className="order-sym" style={{ color: holdingColors[o.sym] || '#888' }}>{o.sym}</span>
                    <span className="order-meta">{o.acct} · GTC-ext</span>
                  </div>
                  <div className="order-right">
                    <div className="order-price">${o.price.toFixed(2)}</div>
                    <div className="order-qty">×{o.qty} shares</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
