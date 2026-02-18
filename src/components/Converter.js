import React, { useEffect, useState } from 'react';
import { getLatest, convertAmount } from '../services/exchangeService';

export default function Converter({ symbols, base, onBaseChange }) {
  const [amount, setAmount] = useState('1');
  const [from, setFrom] = useState(base || 'USD');
  const [to, setTo] = useState('EUR');
  const [rate, setRate] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFrom(base);
  }, [base]);

  useEffect(() => {
    async function fetchRate() {
      if (!from || !to) return;
      setLoading(true);
      try {
        const data = await getLatest(from);
        const r = data.rates[to];
        setRate(r);
      } catch (err) {
        console.error('Error fetching rate:', err);
        setRate(null);
      } finally {
        setLoading(false);
      }
    }
    fetchRate();
  }, [from, to]);

  const amountNum = parseFloat(amount) || 0;
  const converted = rate && amountNum > 0 ? convertAmount(amountNum, rate) : 0;

  return (
    <section className="converter">
      <h2>Currency Converter</h2>
      <div className="converter-controls">
        <div className="select-group">
          <label htmlFor="from-currency">From:</label>
          <select id="from-currency" value={from} onChange={(e) => { setFrom(e.target.value); onBaseChange && onBaseChange(e.target.value); }} className="currency-select">
            {Object.keys(symbols).map((s) => (
              <option key={s} value={s}>{s} - {symbols[s].description}</option>
            ))}
          </select>
        </div>

        <div className="select-group">
          <label htmlFor="to-currency">To:</label>
          <select id="to-currency" value={to} onChange={(e) => setTo(e.target.value)} className="currency-select">
            {Object.keys(symbols).map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="converter-input">
        <label htmlFor="amount-input">Amount:</label>
        <input id="amount-input" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" className="amount-input" />
      </div>

      <div className="converter-results">
        <div className="result-item">
          <span className="label">Exchange Rate:</span>
          <span className="value">{loading ? 'Loading...' : rate ? `1 ${from} = ${rate.toFixed(6)} ${to}` : 'N/A'}</span>
        </div>
        <div className="result-item highlight">
          <span className="label">Converted Amount:</span>
          <span className="value converted-value">{amountNum} {from} = <strong>{converted.toFixed(2)} {to}</strong></span>
        </div>
      </div>
    </section>
  );
}
