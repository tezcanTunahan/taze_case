import React from 'react';
import { useCRYPTOContext } from '@/context/cryptoContext';
import Button from './ui/button';

export default function Pagination() {
  const { nextPage, previousPage, page } = useCRYPTOContext();
  return (
    <div>
      <Button onClick={previousPage}>Previous</Button>
      <span>{page}</span>
      <Button onClick={nextPage}>Next</Button>
    </div>
  );
}
