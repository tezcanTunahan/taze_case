import React from 'react';
import '@/styles/ui/button.scss';

interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button className='button' onClick={onClick}>
      {children}
    </button>
  );
}
