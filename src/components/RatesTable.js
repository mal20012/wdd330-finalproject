import React from 'react';

export default function RatesTable({ rates = {}, base }) {
  const entries = Object.entries(rates).slice(0, 50);
  return (
    <section>
      <h2>Rates relative to {base}</h2>
      <table>
        <thead>
          <tr>
            <th>Currency</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(([code, rate]) => (
            <tr key={code}>
              <td>{code}</td>
              <td>{rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
