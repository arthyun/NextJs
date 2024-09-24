'use client';
import React, { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

// client component에서만 session provider를 사용할 수 있기에 별도 wrapper를 제작
const SessionProviderWrapper = ({ children }: { children: ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default SessionProviderWrapper;
