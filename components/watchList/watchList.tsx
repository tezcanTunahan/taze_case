'use client';
import React from 'react';
import { useCRYPTOContext } from '@/context/cryptoContext';
import '@/styles/watchList.scss';
import CryptoChart from '../cryptoChart';

export default function WatchList() {
  const { watchList } = useCRYPTOContext();
  const [active, setActive] = React.useState<string>('');
  return (
    <div className='watchList_container'>
      <div className='watchList'>
        {watchList.map((id) => (
          <div key={id} onClick={() => setActive(id)} className={`watchList__item ${active === id ? 'watchList__item--active' : ''}`}>
            {id}
          </div>
        ))}
      </div>
      <p>{active}</p>
      <CryptoChart id={active} />
    </div>
  );
}
