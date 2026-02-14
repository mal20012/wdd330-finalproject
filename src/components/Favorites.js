import React, { useEffect, useState } from 'react';

const KEY = 'currency:favorites';

export default function Favorites({ onSelect }) {
  const [list, setList] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
    setList(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(list));
  }, [list]);

  const add = () => {
    if (!input) return;
    setList((s) => Array.from(new Set([input.toUpperCase(), ...s])));
    setInput('');
  };

  const remove = (c) => setList((s) => s.filter((x) => x !== c));

  return (
    <section>
      <h3>Favorites</h3>
      <div>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Currency code e.g. USD" />
        <button onClick={add}>Add</button>
      </div>
      <ul>
        {list.map((c) => (
          <li key={c}>
            <button onClick={() => onSelect && onSelect(c)}>{c}</button>
            <button onClick={() => remove(c)}>Remove</button>
          </li>
        ))}
      </ul>
    </section>
  );
}
