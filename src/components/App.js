import React, { useEffect, useState } from 'react';
import Header from './Header';
import Converter from './Converter';
import RatesTable from './RatesTable';
import History from './History';
import Favorites from './Favorites';
import { getSymbols, getLatest } from '../services/exchangeService';
import '../styles/main.css';

export default function App() {
    const [symbols, setSymbols] = useState({});
    const [base, setBase] = useState('USD');
    const [rates, setRates] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        async function init() {
            try {
                const sy = await getSymbols();
                setSymbols(sy);
                const latest = await getLatest(base);
                setRates(latest.rates || {});
            } catch (err) {
                console.error('Error initializing app:', err);
                setError('Failed to load currencies. Using defaults.');
            }
        }
        init();
    }, []);

    useEffect(() => {
        async function fetch() {
            try {
                const latest = await getLatest(base);
                setRates(latest.rates || {});
            } catch (err) {
                console.error('Error fetching rates:', err);
                setError('Failed to fetch exchange rates.');
            }
        }
        fetch();
    }, [base]);

    return (
        <div className="app">
            <Header />
            <main>
                <Converter symbols={symbols} base={base} onBaseChange={setBase} />
                <Favorites onSelect={(c) => setBase(c)} />
                <RatesTable rates={rates} base={base} />
                <History symbols={symbols} />
            </main>
        </div>
    );
}