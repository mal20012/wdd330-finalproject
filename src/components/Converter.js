import React, { useEffect, useState } from 'react';
import { getLatest, convertAmount } from '../services/exchangeService';

export default function Converter({ symbols, base, onBaseChange }) {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState(base || 'USD');
  const [to, setTo] = useState('EUR');
  const [rate, setRate] = useState(null);

  useEffect(() => {
    setFrom(base);
  }, [base]);

  useEffect(() => {
    async function fetchRate() {
      if (!from || !to) return;
      try {
        const data = await getLatest(from);
        const r = data.rates[to];
        setRate(r);
      } catch (err) {
        setRate(null);
      }
    }
    fetchRate();
  }, [from, to]);

  const converted = rate ? convertAmount(Number(amount), rate) : '--';

  return (
    <section>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <label>Base:</label>
        <select value={from} onChange={(e) => { setFrom(e.target.value); onBaseChange && onBaseChange(e.target.value); }}>
          {Object.keys(symbols).map((s) => (
            <option key={s} value={s}>{s} - {symbols[s].description}</option>
          ))}
        </select>

        <label>To:</label>
        <select value={to} onChange={(e) => setTo(e.target.value)}>
          {Object.keys(symbols).map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: '12px' }}>
        <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div>Rate: {rate ? rate.toFixed(6) : '--'}</div>
        <div>Converted: {typeof converted === 'number' ? converted.toFixed(2) : converted}</div>
      </div>
    </section>
  );
}
