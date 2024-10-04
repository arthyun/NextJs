import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { signIn } from 'next-auth/react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { modalStore } from '@/app/contexts/modalStore';
import classes from '@/app/components/styles/login.module.scss';
import BaseInput from '@/app/components/base/BaseInput';
import BaseButton from '@/app/components/base/BaseButton';

const Login = () => {
  const router = useRouter();

  // Zustand
  const setIsOpen = modalStore((state) => state.setIsOpen);

  // States
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const [joinForm, setJoinForm] = useState({
    nick_name: '',
    email: '',
    password: '',
    file: null as any,
  });
  const [isJoinForm, setIsJoinForm] = useState(false);

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({
      ...loginForm,
      [id]: value,
    });
  };

  const handleJoinChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value, files } = e.target;
    if (id === 'file') {
      const file = files![0];
      setJoinForm({
        ...joinForm,
        [id]: file,
      });
      // // FileReader 객체 생성
      // const reader = new FileReader();
      // // 파일을 읽는 작업이 완료되면 실행될 콜백 함수
      // reader.onload = function () {
      //   // Base64 인코딩된 결과를 출력
      //   const base64String = reader.result;
      //   console.log(base64String); // 'data:image/jpeg;base64,...' 같은 문자열 출력
      // };
      // // 파일을 Base64로 읽기
      // reader.readAsDataURL(file);
    } else {
      setJoinForm({
        ...joinForm,
        [id]: value,
      });
    }
  };

  const handleCommonLogin = async (type: string) => {
    if (type === 'google') {
      return signIn('google');
    } else if (type === 'credentials') {
      if (loginForm.email !== '' && loginForm.password !== '') {
        await signIn('credentials', {
          email: loginForm.email,
          password: loginForm.password,
          redirect: false, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
          callbackUrl: '/', // true 일경우 동작 에러일때 에러페이지 동작
        }).then((res) => {
          if (!res!.ok) {
            // @ts-ignore : no problem
            alert('error', `ERROR CODE : ${res?.status}`);
          } else {
            setIsOpen(false);
            return router.refresh();
          }
        });
      } else {
        // @ts-ignore : no problem
        return alert('error', '이메일, 패스워드를 확인해주세요');
      }
    }
  };

  const handleReset = (type: string) => {
    if (type === 'all') {
      setIsOpen(false);
      setIsJoinForm(false);
      setJoinForm({
        nick_name: '',
        email: '',
        password: '',
        file: null,
      });
    } else {
      setJoinForm({
        nick_name: '',
        email: '',
        password: '',
        file: null,
      });
    }
  };

  const handleJoin = async () => {
    // 새로운 객체 생성
    const newFormData = new FormData();
    newFormData.append('nick_name', joinForm.nick_name);
    newFormData.append('email', joinForm.email);
    newFormData.append('password', joinForm.password);
    newFormData.append('file', joinForm.file); // 파일은 서버에서 별도처리

    // 유효성 검사
    const validate = Object.fromEntries(newFormData);

    const valiArr = [];
    for (const key in validate) {
      if (validate[key] === '') {
        valiArr.push(key);
      }
    }
    if (valiArr.length > 0) {
      // @ts-ignore : no problem
      return alert('error', `${valiArr.toString()}(을/를) 입력하세요.`);
    } else {
      // content type 지정시 서버에서 인식 못함
      try {
        const res = await fetch(
          process.env.NEXT_PUBLIC_LOCAL_URL + '/api/member/join',
          {
            method: 'POST',
            // headers: {
            //   'Content-Type': 'multipart/form-data',
            // },
            body: newFormData,
          }
        );
        const result = await res.json();
        if (result.status === 200) {
          // @ts-ignore : no problem
          alert('success', '회원가입에 성공하였습니다.');
          handleReset('all'); // 초기화
          return router.refresh();
        }
      } catch (error: any) {
        throw new Error(error);
      }
    }
  };

  // Enter 적용된 로그인
  const handleSubmit = (e: FormEvent<HTMLFormElement>, type: string) => {
    e.preventDefault();
    switch (type) {
      case 'login':
        return handleCommonLogin('credentials');
      case 'join':
        return handleJoin();
      default:
        return;
    }
  };

  return (
    <>
      {!isJoinForm && (
        <motion.article
          variants={container}
          initial='hidden'
          animate='show'
          className={classes.login_article}
        >
          <h2>로그인</h2>
          <form onSubmit={(e) => handleSubmit(e, 'login')}>
            <BaseInput
              id={'email'}
              name={'이메일'}
              type={'text'}
              placeholder={'이메일 주소를 입력하세요'}
              value={loginForm.email}
              onChange={handleLoginChange}
              required={false}
              disabled={false}
            />
            <BaseInput
              id={'password'}
              name={'비밀번호'}
              type={'password'}
              placeholder={'비밀번호를 입력하세요'}
              value={loginForm.password}
              onChange={handleLoginChange}
              required={false}
              disabled={false}
            />
            <BaseButton type='submit' title='일반 로그인' disabled={false} />
            <BaseButton
              type='button'
              title='구글 로그인'
              onClick={() => handleCommonLogin('google')}
              disabled={false}
            />
          </form>
          <p className={classes.login_join} onClick={() => setIsJoinForm(true)}>
            회원가입이 필요하세요?
          </p>
        </motion.article>
      )}
      {isJoinForm && (
        <motion.article
          variants={container}
          initial='hidden'
          animate='show'
          className={classes.login_article}
        >
          <h2>회원가입</h2>
          <form onSubmit={(e) => handleSubmit(e, 'join')}>
            <BaseInput
              id={'nick_name'}
              name={'닉네임'}
              type={'text'}
              placeholder={'닉네임을 입력하세요'}
              value={joinForm.nick_name}
              onChange={handleJoinChange}
              required={false}
              disabled={false}
            />
            <BaseInput
              id={'email'}
              name={'이메일'}
              type={'text'}
              placeholder={'이메일 주소를 입력하세요'}
              value={joinForm.email}
              onChange={handleJoinChange}
              required={false}
              disabled={false}
            />
            <BaseInput
              id={'password'}
              name={'비밀번호'}
              type={'password'}
              placeholder={'비밀번호를 입력하세요'}
              value={joinForm.password}
              onChange={handleJoinChange}
              required={false}
              disabled={false}
            />
            <BaseInput
              id={'file'}
              name={'이미지'}
              type={'file'}
              // placeholder={'업로드할 파일을 추가하세요'}
              // value={joinForm?.file?.name}
              onChange={handleJoinChange}
              required={false}
              disabled={false}
            />
            <BaseButton type='submit' title='회원가입' disabled={false} />
            <BaseButton
              type='button'
              title='다시 작성'
              onClick={() => handleReset('part')}
              disabled={false}
            />
          </form>
          <p
            className={classes.login_join}
            onClick={() => setIsJoinForm(false)}
          >
            돌아가기
          </p>
        </motion.article>
      )}
    </>
  );
};

export default Login;

// motion-framer styling
const container = {
  hidden: { opacity: 0, left: '-50%' },
  show: {
    opacity: 1,
    left: '50%',
    transition: {
      delayChildren: 0.1,
    },
  },
};
