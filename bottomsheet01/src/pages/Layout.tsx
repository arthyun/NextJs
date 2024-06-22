import React, { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <h1>나는 레이아웃이다. 렛츠고우~</h1>
      <div>{children}</div>
    </>
  );
}
