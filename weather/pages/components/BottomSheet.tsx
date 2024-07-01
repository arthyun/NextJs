import React, { useState } from 'react';

export default function BottomSheet() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <>
      {open ? <div className='screenOverlay fixed bottom-0 left-0 z-1000 w-full h-screen bg-black opacity-30' onClick={() => setOpen(!open)}></div> : null}
      <section
        className={`bg-[#fff] w-full h-3/6 fixed bottom-0 left-0 z-1100 rounded-tl-xl rounded-tr-xl xl:hidden md:block transition-transform duration-3600 ease-in-out ${
          open ? 'translate-y-0' : 'translate-y-[90%]'
        }`}
      >
        <button type='button' className='block' onClick={() => setOpen(!open)}>
          여닫기버튼
        </button>
        <h3>BottomSheet</h3>
      </section>
    </>
  );
}
