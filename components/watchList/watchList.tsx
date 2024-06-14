import React from 'react';
import { useCRYPTOContext } from '@/context/cryptoContext';
import '@/styles/watchList.scss';

export default function WatchList() {
  const { watchList } = useCRYPTOContext();
  const [active, setActive] = React.useState<string>();
  return (
    <div className='watchListContainer'>
      <div className='watchList'>
        {watchList.map((id) => (
          <div key={id} onClick={() => setActive(id)} className={`watchList__item ${active === id ? 'watchList__item--active' : ''}`}>
            {id}
          </div>
        ))}
      </div>
      <p>{active}</p>
    </div>
  );
}
