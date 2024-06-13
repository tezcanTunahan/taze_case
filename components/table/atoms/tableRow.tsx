import React from 'react';
import '@/styles/table/tableRow.scss';
import Image from 'next/image';
import { LiaStarSolid } from 'react-icons/lia';
import { useCRYPTOContext } from '@/context/cryptoContext';
import Button from '@/components/ui/button';

type Props = {
  crypto: {
    id: string;
    name: string;
    current_price: number;
    price_change_24h: number;
    price_change_percentage_24h: number;
    image: string;
  };
};

export default function TableRow({ crypto }: Props) {
  const { addToWatchList, removeFromWatchList, watchList } = useCRYPTOContext();

  function handleAddToWatchList(id: string) {
    if (watchList.includes(id)) {
      removeFromWatchList(id);
    } else {
      addToWatchList(id);
    }
  }

  return (
    <tr key={crypto.id}>
      <td>
        <Image src={crypto.image} alt={crypto.name} width={25} height={25} />
      </td>
      <td>{crypto.name}</td>
      <td>{crypto.current_price}</td>
      <td> {crypto.price_change_24h.toFixed(4)}</td>
      <td>{crypto.price_change_percentage_24h.toFixed(4)}</td>

      <td>
        <button
          className={'button-star' + (watchList.includes(crypto.id) ? ' button-star__active' : '')}
          onClick={() => handleAddToWatchList(crypto.id)}>
          <LiaStarSolid />
        </button>
      </td>
    </tr>
  );
}
