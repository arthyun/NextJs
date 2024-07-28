'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';

const WritePage = () => {
  const router = useRouter();

  const { data: session } = useSession(); // CSR 메소드

  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');

  const CommOnChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    if (id === 'title') {
      setTitle(value);
    } else if (id === 'content') {
      setContent(value);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/post/', {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify({
        userName: session?.user?.name,
        title: title,
        content: content
      })
    });
    const result = await response.json();

    if (result.status === 'ok') {
      alert('글이 등록되었습니다.');
      router.push('/');
    } else {
      console.error('에러 발생 => ', result.status);
    }

    return result;
  };

  useEffect(() => {
    if (session === null) {
      router.replace('/');
      return alert('로그인 해주세요.');
    }
  }, [session]);

  return (
    <>
      <h3 className='text-3xl font-bold'>글 작성하기</h3>
      <form onSubmit={handleSubmit}>
        <input className='w-full py-2 pl-2 bg-gray-400 text-black' name='userName' type='text' id='userName' defaultValue={session?.user?.name as string} disabled readOnly />
        <div className='w-full my-4'>
          <label htmlFor='title'>제목</label>
          <input className='w-full py-2 pl-2 bg-gray-200 text-black' name='title' type='text' id='title' placeholder='title' value={title} onChange={CommOnChange} required />
        </div>
        <div className='w-full my-4'>
          <label htmlFor='content'>본문</label>
          <textarea
            className='w-full py-2 pl-2 bg-gray-200 text-black'
            name='content'
            id='content'
            placeholder='content'
            value={content}
            onChange={CommOnChange}
            required
          ></textarea>
        </div>
        <button type='submit' className='w-full py-2 bg-[#0081cc] text-[#fff]'>
          작성
        </button>
      </form>
    </>
  );
};

export default WritePage;
