import React from 'react';
import '@/styles/ui/input.scss';

type InputProps = {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

export default function Input({ placeholder, onChange, value }: InputProps) {
  return <input className='input' placeholder={placeholder} onChange={onChange} value={value} />;
}
