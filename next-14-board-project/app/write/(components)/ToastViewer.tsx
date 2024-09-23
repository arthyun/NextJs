'use client';
import React, { RefObject } from 'react';
import { Viewer } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';

const ToastViewer = ({
  viewerRef,
  content,
}: {
  viewerRef: RefObject<Viewer>;
  content: string;
}) => {
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  return (
    <>
      <Viewer initialValue={content} height='450px' />
    </>
  );
};

export default ToastViewer;
