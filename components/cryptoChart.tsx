'use client';
import React, { useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';
import axios from 'axios';

export default function CryptoChart({ id }: { id: string }) {
  const [data, setData] = React.useState([{}]);

  useEffect(() => {
    if (!id) {
      return;
    }

    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=20&interval=daily&precision=2`, {
        method: 'GET',
        headers: { accept: 'application/json', 'x-cg-demo-api-key': process.env.API_KEY },
      })
      .then((response) => {
        console.log('Data fetched: ', response.data);
        setData(
          response.data.prices.map((price: number[]) => {
            return { date: new Date(price[0]).toDateString(), price: price[1].toFixed(2) };
          })
        );
      })
      .catch((error) => {
        console.log('Error fetching data: ', error);
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
      <BarChart width={300} height={200} data={data}>
        <YAxis />
        <XAxis dataKey='date' />
        <Bar dataKey='price' fill='red' />
      </BarChart>
    </div>
  );
}
