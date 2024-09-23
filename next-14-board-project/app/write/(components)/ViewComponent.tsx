'use client';
import React, { useRef } from 'react';

// Nextjs에서 toast ui 사용시 별도 컴포넌트화 후 한번더 ssr 해제해서 사용
import { Viewer } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
const NoSsrViewer = dynamic(() => import('./ToastViewer'), { ssr: false });

const ViewComponent = ({ content }: { content: string }) => {
  // Viewer Ref
  const viewerRef = useRef<Viewer | null>(null);

  return <NoSsrViewer viewerRef={viewerRef} content={content} />;
};

export default ViewComponent;
