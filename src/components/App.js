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

    useEffect(() => {
        async function init() {
            const sy = await getSymbols();
            setSymbols(sy);
            const latest = await getLatest(base);
            setRates(latest.rates || {});
        }
        init();
    }, []);

    useEffect(() => {
        async function fetch() {
            const latest = await getLatest(base);
            setRates(latest.rates || {});
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