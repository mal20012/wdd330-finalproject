import axios from 'axios';

const BASE_URL = 'https://api.exchangerate.host';

export async function getSymbols() {
  const res = await axios.get(`${BASE_URL}/symbols`);
  return res.data.symbols || {};
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
