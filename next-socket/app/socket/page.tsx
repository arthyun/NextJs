'use client';

import React, { useEffect } from 'react';
import { io } from 'socket.io-client';

const Page = () => {
  useEffect(() => {
    const socket = io('http://localhost:4000');

    socket.on('connect', () => {
      console.log('socket connected');
    });
  }, []);

  return <div>Page</div>;
};

export default Page;
