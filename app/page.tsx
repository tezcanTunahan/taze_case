'use client';
import React, { useState } from 'react';
import Table from '@/components/table/table';
import './page.scss';
import Input from '@/components/ui/input';
import { useCRYPTOContext } from '@/context/cryptoContext';
export default function Home() {
  const { sortCryptoPriceList, cryptoPriceList, watchList, loading } = useCRYPTOContext();
  const [filter, setFilter] = useState('');

  return (
    <main>
      <Input
        placeholder='Search'
        onChange={(e) => {
          setFilter(e.target.value);
          sortCryptoPriceList(e.target.value);
        }}
        value={filter}
      />
      {watchList.map((id) => (
        <div key={id}>{id}</div>
      ))}
      <div className='table-container'>
        <Table />
      </div>
    </main>
  );
}
