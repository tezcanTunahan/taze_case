import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  return (
    <div className='navbar'>
      <Link href='/'>Crypto Tracker</Link>
    </div>
  );
}
