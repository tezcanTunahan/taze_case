import React from 'react';
import '@/styles/table/table.scss';
import TableRow from './atoms/tableRow';
import { useCRYPTOContext } from '@/context/cryptoContext';
import Pagination from '@/components/pagination';

export default function Table() {
  const { cryptoPriceList, loading, page } = useCRYPTOContext();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
}
