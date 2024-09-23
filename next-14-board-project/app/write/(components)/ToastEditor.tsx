'use client';
import React, { Dispatch, RefObject, SetStateAction } from 'react';
import { FormDataTypes } from '../(types)/WriteTypes';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

const ToastEditor = ({
  editorRef,
  formData,
  setFormData,
  handleEditorImage,
}: {
  editorRef: RefObject<Editor>;
  formData: FormDataTypes;
  setFormData: Dispatch<SetStateAction<FormDataTypes>>;
  handleEditorImage: (file: File, callback: typeof Function) => Promise<void>;
}) => {
  //////////////////////////////////////////////////////
  //////////////////////////////////////////////////////
  return (
    <>
      <Editor
        ref={editorRef}
        initialValue={
          formData.content !== ''
            ? formData.content
            : '본문 내용을 입력해주세요.'
        }
        previewStyle='vertical' // tab, vertical
        height='450px'
        initialEditType='wysiwyg' // markdown, wysiwyg
        usageStatistics={false}
        useCommandShortcut={true}
        hideModeSwitch={true} // 하단 모드 보이고 안보이고
        // hooks={{ addImageBlobHook: handleEditorImage }}
        // onChange={() =>
        //   setFormData(editorRef.current?.getInstance().getMarkdown())
        // }
        // theme={'dark'} // '' & 'dark'
        // placeholder=''
      />
    </>
  );
};

export default ToastEditor;
