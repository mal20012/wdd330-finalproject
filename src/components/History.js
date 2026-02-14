import React, { useState } from 'react';
import { getHistorical } from '../services/exchangeService';

export default function History({ symbols }) {
  const [date, setDate] = useState('2022-01-01');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetch = async () => {
    setError(null);
    try {
      const res = await getHistorical(date);
      setData(res);
    } catch (err) {
      setError('Failed to fetch historical data');
    }
  };

  return (
    <section>
      <h2>Historical Rates</h2>
      <div>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <button onClick={fetch}>Fetch</button>
      </div>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      {data && (
        <div>
          <div>Date: {data.date}</div>
          <table>
            <thead>
              <tr><th>Currency</th><th>Rate</th></tr>
            </thead>
            <tbody>
              {Object.entries(data.rates).slice(0, 50).map(([c, r]) => (
                <tr key={c}><td>{c}</td><td>{r}</td></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
