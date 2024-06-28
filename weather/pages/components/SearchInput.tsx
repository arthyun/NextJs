import React, { ChangeEvent, useState } from 'react';

export default function SearchInput({ type, placeholder, onChange, execFunc }) {
  const [text, setText] = useState<string>('');

  return (
    <section className='searchArea flex fixed top-0 left-0 z-1000 box-border'>
      <input
        className='bg-white border-2 border-green-500 rounded-2xl pl-[10px] min-h-8'
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button className='block min-w-8 min-h-8 bg-green-500 rounded-2xl text-white' type='button' onClick={() => execFunc(text)}>
        검색
      </button>
    </section>
  );
}
