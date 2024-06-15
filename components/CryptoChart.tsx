'use client';
import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import axios from 'axios';

export default function CryptoChart({ id }: { id: string }) {
  const [data, setData] = React.useState([{}]);
  const [error, setError] = React.useState('');

  useEffect(() => {
    setError('');
    if (!id) {
      return;
    }

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7&interval=daily&precision=2`, {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.API_KEY },
      })
      .then((response) => {
        console.log('Data fetched: ', response.data);
        setData(
          response.data.prices.map((price: number[], index: number) => {
            return { date: new Date(price[0]).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }), price: price[1].toFixed(2) };
          })
        );
      })
      .catch((error) => {
        console.log('Error fetching data: ', error.message);
        setError('Error fetching data');
      });
  }, [id]);
  console.log('Data: ', data);

  if (!id) {
    return (
      <div className=''>
        <p>Please select a crypto</p>
      </div>
    );
  }

  return (
    <div>
      <h1>{id}</h1>
      <BarChart width={600} height={200} data={data}>
        <YAxis />
        <XAxis dataKey='date' />
        <Bar dataKey='price' fill='red' />
      </BarChart>
      {error.length > 0 && (
        <div>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
}
