import React, { ChangeEvent, useState } from 'react';

export default function SearchInput({ type, placeholder, onChange, execFunc }) {
  const [text, setText] = useState<string>('');

  return (
    <section className='searchArea w-full flex fixed top-4 left-[50%] translate-x-[-12.5%] z-1000 box-border'>
      <input
        className='bg-white border-2 border-green-500 rounded-3xl text-[16px] pl-[10px] w-1/4 min-h-12'
        type={type}
        placeholder={placeholder}
        value={text}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
      />
      <button className='block min-w-12 min-h-12 bg-green-500 rounded-3xl text-white' type='button' onClick={() => execFunc(text)}>
        검색
      </button>
    </section>
  );
}
