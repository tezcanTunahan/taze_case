'use client';
import React, { useState } from 'react';
import Table from '@/components/table/table';
import './page.scss';
import Input from '@/components/ui/input';
import { useCRYPTOContext } from '@/context/cryptoContext';
import WatchList from '@/components/watchList/watchList';
export default function Home() {
  const { sortCryptoPriceList, cryptoPriceList, watchList, loading } = useCRYPTOContext();
  const [filter, setFilter] = useState('');

  return (
    <main className='main'>
      <div>
        <Input
          placeholder='Search'
          onChange={(e) => {
            setFilter(e.target.value);
            sortCryptoPriceList(e.target.value);
          }}
          value={filter}
        />
        <div className=''>
          <Table />
        </div>
      </div>
      <WatchList />
    </main>
  );
}
