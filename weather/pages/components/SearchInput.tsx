import React, { ChangeEvent, useState } from 'react';

export default function SearchInput({ type, placeholder, onChange, execFunc }) {
  const [text, setText] = useState<string>('');

  return (
    <div className='searchArea'>
      <input type={type} placeholder={placeholder} value={text} onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)} />
      <button type='button' onClick={() => execFunc(text)}>
        검색
      </button>
    </div>
  );
}
