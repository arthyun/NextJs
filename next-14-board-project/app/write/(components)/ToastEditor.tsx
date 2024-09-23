import React, { RefObject, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const ToastEditor = ({
  editorRef,
  handleEditorImage,
}: {
  editorRef: RefObject<Editor>;
  handleEditorImage: (file: File, callback: typeof Function) => Promise<void>;
}) => {
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={''}
        previewStyle='vertical' // tab, vertical
        height='450px'
        initialEditType='markdown' // markdown, wysiwyg
        usageStatistics={false}
        useCommandShortcut={true}
        hideModeSwitch={true} // 하단 모드 보이고 안보이고
        hooks={{ addImageBlobHook: handleEditorImage }}
        // placeholder='내용이 없습니다.'
      />
    </>
  );
};

export default ToastEditor;
