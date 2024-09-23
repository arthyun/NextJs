'use client';
import React, {
  ChangeEvent,
  FormEvent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { FormDataTypes } from '../(types)/WriteTypes';
import BaseInput from '@/app/components/base/BaseInput';
import BaseButton from '@/app/components/base/BaseButton';

// nextjs에서 toast ui 사용시 별도 컴포넌트화 후 한번더 ssr 해제해서 사용
import dynamic from 'next/dynamic';
const NoSsrEditor = dynamic(() => import('./ToastEditor'), { ssr: false });

const WriteComponent = ({ classes }: { classes: any }) => {
  const router = useRouter();

  // Editor Ref
  const editorRef = useRef(null);

  const [formData, setFormData] = useState<FormDataTypes>({
    nick_name: '',
    title: '',
    content: '',
    editorData: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // editor
    if (editorRef.current) {
      const editorIns = editorRef.current.getInstance();
      const contentHtml = editorIns.getHTML();
      const contentMark = editorIns.getMarkdown();
      console.log(contentHtml);
      console.log(contentMark);
    }

    // let validateArr: string[] = [];
    // Object.keys(formData).forEach((item) => {
    //   if (formData[item] === '') validateArr.push(item);
    // });

    // if (validateArr.length > 0) {
    //   alert(
    //     'error',
    //     //@ts-ignore
    //     `${validateArr.toString().split(',').join(', ')}이 입력되지 않았습니다.`
    //   );
    // } else {
    //   const newFormData = new FormData();
    //   newFormData.append('nick_name', formData.nick_name);
    //   newFormData.append('title', formData.title);
    //   newFormData.append('content', formData.content);

    //   try {
    //     // Content-Type 지정시 서버에서 바디 파싱 안됌 (multi-part만 해당)
    //     const res = await fetch(
    //       process.env.NEXT_PUBLIC_LOCAL_URL + '/api/list/',
    //       {
    //         method: 'POST',
    //         body: newFormData,
    //         // headers: {
    //         //   'Content-Type': 'multipart/form-data',
    //         // },
    //       }
    //     );
    //     const result = await res.json();
    //     if (result.message === 'ok') {
    //       // @ts-ignore
    //       alert('success', '게시글이 등록되었습니다.');
    //       // 인풋값들 초기화
    //       setFormData({
    //         nick_name: '',
    //         title: '',
    //         content: '',
    //       });
    //       return router.replace('/list');
    //     }
    //   } catch (error) {
    //     throw new Error(error);
    //   }
    // }
  };

  const handleEditorImage = async (
    blob: File,
    callback: typeof Function
  ): Promise<void> => {
    console.log(blob);
    console.log(callback);
  };

  return (
    <form className={classes.write_form} onSubmit={handleOnSubmit}>
      {/* ToastUiEditor (ssr 미지원) */}
      <NoSsrEditor
        editorRef={editorRef}
        handleEditorImage={handleEditorImage}
      />

      <BaseInput
        id={'nick_name'}
        name={'닉네임'}
        type={'text'}
        placeholder={'닉네임을 입력하세요'}
        value={formData.nick_name}
        onChange={handleOnChange}
        required={false} // Submit할때 별도로 validate 진행
        disabled={false}
      />
      <BaseInput
        id={'title'}
        name={'제목'}
        type={'text'}
        placeholder={'제목을 입력하세요'}
        value={formData.title}
        onChange={handleOnChange}
        required={false}
        disabled={false}
      />
      <BaseInput
        id={'content'}
        name={'본문'}
        type={'text'}
        placeholder={'본문 내용을 입력하세요'}
        value={formData.content}
        onChange={handleOnChange}
        required={false}
        disabled={false}
      />
      <div className={classes.write_button_group}>
        <BaseButton type={'submit'} title={'등록'} disabled={false} />
        <BaseButton
          type={'button'}
          title={'다시작성'}
          onClick={() =>
            setFormData({
              nick_name: '',
              title: '',
              content: '',
            })
          }
          disabled={false}
        />
      </div>
    </form>
  );
};

export default WriteComponent;
