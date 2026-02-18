import axios from 'axios';

const BASE_URL = 'https://api.exchangerate.host';

const FALLBACK_SYMBOLS = {
  'USD': { description: 'United States Dollar' },
  'EUR': { description: 'Euro' },
  'GBP': { description: 'British Pound Sterling' },
  'JPY': { description: 'Japanese Yen' },
  'AUD': { description: 'Australian Dollar' },
  'CAD': { description: 'Canadian Dollar' },
  'CHF': { description: 'Swiss Franc' },
  'CNY': { description: 'Chinese Yuan' },
  'INR': { description: 'Indian Rupee' },
  'MXN': { description: 'Mexican Peso' },
  'SGD': { description: 'Singapore Dollar' },
  'HKD': { description: 'Hong Kong Dollar' },
  'NZD': { description: 'New Zealand Dollar' },
  'SEK': { description: 'Swedish Krona' },
  'NOK': { description: 'Norwegian Krone' },
  'KRW': { description: 'South Korean Won' },
  'TRY': { description: 'Turkish Lira' },
  'RUB': { description: 'Russian Ruble' },
  'BRL': { description: 'Brazilian Real' },
  'ZAR': { description: 'South African Rand' }
};

export async function getSymbols() {
  try {
    const res = await axios.get(`${BASE_URL}/symbols`);
    return res.data.symbols || FALLBACK_SYMBOLS;
  } catch (err) {
    console.warn('Failed to fetch symbols from API, using fallback list:', err);
    return FALLBACK_SYMBOLS;
  }
}

export async function getLatest(base = 'USD') {
  const res = await axios.get(`${BASE_URL}/latest`, { params: { base } });
  return res.data;
}

export async function getHistorical(date, base = 'USD') {
  const res = await axios.get(`${BASE_URL}/${date}`, { params: { base } });
  return res.data;
}

export function convertAmount(amount, rate) {
  return amount * rate;
}
