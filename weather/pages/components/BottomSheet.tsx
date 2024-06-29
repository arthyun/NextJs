import React, { useState } from 'react';

export default function BottomSheet() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <section
      className={`bg-red-300 w-full h-3/6 fixed bottom-0 left-0 z-1100 xl:hidden md:block transition-transform duration-3600 ease-in-out ${
        open ? 'translate-y-0' : 'translate-y-[90%]'
      }`}
    >
      <button type='button' className='block' onClick={() => setOpen(!open)}>
        여닫기버튼
      </button>
      <h3>BottomSheet</h3>
    </section>
  );
}