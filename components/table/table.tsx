'use client';
import React from 'react';
import '@/styles/table/table.scss';
import TableRow from './atoms/tableRow';
import { useCRYPTOContext } from '@/context/cryptoContext';
import Pagination from '@/components/pagination';
import Input from '@/components/ui/input';

type Props = {
  className?: string;
};

export default function Table({ className }: Props) {
  const [filter, setFilter] = React.useState('');
  const { cryptoPriceList, loading, page, sortCryptoPriceList, error } = useCRYPTOContext();

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className={'table_container' + className}>
      <Input
        placeholder='Search'
        onChange={(e) => {
          setFilter(e.target.value);
          sortCryptoPriceList(e.target.value);
        }}
        value={filter}
      />
      <table>
        <caption>Crypto Price List</caption>
        <thead>
          <tr>
            <th>Logo</th>
            <th>Name</th>
            <th>Current price</th>
            <th>Change </th>
            <th>Change %</th>
            <th>Watch</th>
          </tr>
        </thead>

        <tbody>
          {cryptoPriceList?.slice((page - 1) * 5, page * 5)?.map((crypto) => (
            <TableRow key={crypto.id} crypto={crypto} />
          ))}
        </tbody>
      </table>
      <Pagination />
    </div>
  );
}
