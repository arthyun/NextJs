import React from 'react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Notice | onBoard',
};

const NoticeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <h3>NoticeLayout</h3>
      {children}
    </div>
  );
};

export default NoticeLayout;
