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
          placeholder={'아이디를 입력하세요'}
          value={loginForm.email}
          onChange={handleLoginChange}
          required={false}
          disabled={false}
        />
        <BaseInput
          id={'password'}
          name={'패스워드'}
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
          onClick={() => signIn()}
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
