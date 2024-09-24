import React from 'react';
import classes from '@/app/components/styles/login.module.scss';
import BaseInput from '@/app/components/base/BaseInput.tsx';
import BaseButton from '@/app/components/base/BaseButton.tsx';

const Login = () => {
  return (
    <article className={classes.login_article}>
      <form>
        <BaseInput
          id={'id'}
          name={'아이디'}
          type={'text'}
          placeholder={'아이디를 입력해주세요'}
          value={''}
          onChange={() => console.log('id')}
          required={false}
          disabled={false}
        />
        <BaseInput
          id={'password'}
          name={'패스워드'}
          type={'password'}
          placeholder={'비밀번호를 입력해주세요'}
          value={''}
          onChange={() => console.log('password')}
          required={false}
          disabled={false}
        />
        <BaseButton
          type='submit'
          title='로그인'
          onClick={() => console.log('login')}
          disabled={false}
        />
      </form>
    </article>
  );
};

export default Login;
