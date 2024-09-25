import React, { ChangeEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import classes from '@/app/components/styles/login.module.scss';
import BaseInput from '@/app/components/base/BaseInput';
import BaseButton from '@/app/components/base/BaseButton';

const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleLoginChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setLoginForm({
      ...loginForm,
      [id]: value,
    });
  };

  return (
    <article className={classes.login_article}>
      <h2>로그인</h2>
      <form>
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
        <BaseButton
          type='button'
          title='일반 로그인'
          onClick={() => {
            if (loginForm.email !== '' && loginForm.password !== '') {
              signIn('credentials', {
                email: loginForm.email,
                password: loginForm.password,
                redirect: false, // true 일경우 로그인 성공하면 에러를 보여줄 수 없다.
                callbackUrl: '/', // true 일경우 동작 에러일때 에러페이지 동작
              });
            } else {
              // @ts-ignore
              alert('error', '이메일, 패스워드를 확인해주세요');
            }
          }}
          disabled={false}
        />
        <BaseButton
          type='button'
          title='구글 로그인'
          onClick={() => signIn('google')}
          disabled={false}
        />
      </form>
    </article>
  );
};

export default Login;
