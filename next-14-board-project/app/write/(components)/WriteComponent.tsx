'use client';
import React, {
  ChangeEvent,
  FormEvent,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { FormDataTypes } from '../(types)/WriteTypes';
import BaseInput from '@/app/components/base/BaseInput';
import BaseButton from '@/app/components/base/BaseButton';

// Nextjs에서 toast ui 사용시 별도 컴포넌트화 후 한번더 ssr 해제해서 사용
import { Editor } from '@toast-ui/react-editor';
import dynamic from 'next/dynamic';
import { useSession } from 'next-auth/react';
const NoSsrEditor = dynamic(() => import('./ToastEditor'), { ssr: false });

const WriteComponent = ({ classes }: { classes: any }) => {
  const router = useRouter();

  // Editor Ref
  const editorRef = useRef<Editor | null>(null);

  // 로그인 정보
  const { data: session } = useSession();

  const [formData, setFormData] = useState<FormDataTypes>({
    nick_name: '',
    title: '',
    content: '',
  });

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const handleReset = () => {
    // 인풋 초기화 및 별도로 에디터 초기화
    setFormData({
      ...formData,
      title: '',
      content: '',
    });

    if (editorRef.current) {
      editorRef.current.getInstance().reset();
    }
  };

  const handleOnSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let validateArr: string[] = [];
    Object.keys(formData).forEach((item: string) => {
      // content는 아래 editor 부분에서 별도 처리
      if (formData[item] === '' && item !== 'content') {
        validateArr.push(item);
      }
    });

    // editor
    let getMarkdown = '';
    // let getHtml = '';
    if (editorRef.current) {
      getMarkdown = editorRef.current.getInstance().getMarkdown();
      // getHtml = editorRef.current.getInstance().getHTML();
      // console.log(getHtml);
      if (getMarkdown === '') {
        validateArr.push('content');
      } else {
        setFormData({
          ...formData,
          content: getMarkdown,
        });
      }
    }

    if (validateArr.length > 0) {
      alert(
        'error',
        //@ts-ignore
        `${validateArr.toString().split(',').join(', ')}이 입력되지 않았습니다.`
      );
    } else {
      const newFormData = new FormData();
      newFormData.append('nick_name', formData.nick_name);
      newFormData.append('title', formData.title);
      newFormData.append('content', getMarkdown);

      try {
        // Content-Type 지정시 서버에서 바디 파싱 안됌 (multi-part만 해당)
        const res = await fetch(
          process.env.NEXT_PUBLIC_LOCAL_URL + '/api/list/',
          {
            method: 'POST',
            body: newFormData,
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
          }
        );
        const result = await res.json();
        if (result.message === 'ok') {
          // @ts-ignore
          alert('success', '게시글이 등록되었습니다.');
          handleReset(); // 인풋 초기화
          router.replace('/list'); // 리다이렉트
          return router.refresh();
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }
  };

  const handleEditorImage = async (
    blob: File,
    callback: typeof Function
  ): Promise<void> => {
    console.log(blob);
    console.log(callback);
  };

  useEffect(() => {
    if (session) {
      setFormData({
        ...formData,
        nick_name: session?.user.name as string,
      });
    } else {
      router.replace('/list');
    }
  }, [session]);

  return (
    <form className={classes.write_form} onSubmit={handleOnSubmit}>
      <BaseInput
        id={'nick_name'}
        name={'닉네임'}
        type={'text'}
        placeholder={'닉네임을 입력하세요'}
        value={formData.nick_name}
        // onChange={handleOnChange}
        required={false} // Submit할때 별도로 validate 진행
        disabled={true}
        readonly={true}
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
      {/* ToastEditor */}
      <NoSsrEditor
        editorRef={editorRef}
        formData={formData}
        setFormData={setFormData}
        handleEditorImage={handleEditorImage}
      />
      <div className={classes.write_button_group}>
        <BaseButton type={'submit'} title={'등록'} disabled={false} />
        <BaseButton
          type={'button'}
          title={'다시작성'}
          onClick={handleReset}
          disabled={false}
        />
      </div>
    </form>
  );
};

export default WriteComponent;
