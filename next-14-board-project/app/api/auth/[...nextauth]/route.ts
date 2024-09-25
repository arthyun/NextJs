import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { Adapter } from 'next-auth/adapters';
import { cookies } from 'next/headers';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET, // 안넣으면 에러발생
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }) as Adapter, // Supabase 연동
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      type: 'credentials',
      credentials: {
        // authorize 함수의 credentials 타입을 지정
        email: { type: 'email' },
        password: { type: 'password' },
      },
      // @ts-ignore
      async authorize(credentials, req) {
        const { email, password } = credentials as Record<
          'email' | 'password',
          string
        >;
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_LOCAL_URL + '/api/member/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            }
          );
          const result = await res.json();
          if (result.message === 'ok') {
            // 결과값이 callback > jwt > user로 넘어감
            return result;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  debug: true, // 디버깅
  session: {
    strategy: 'jwt',
    maxAge: 60 * 1, // 1분...
  },
  jwt: {
    maxAge: 60 * 1, // 1분...
  },
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // authrize의 결과값이 user로 넘어온다.
      if (user) {
        token.user = user;
      }
      return token;
    },
    async session({ token, session }) {
      // jwt의 결과값인 token이 들어온다.
      session.user = token.user as any;
      // 쿠키 설정
      cookies().set({
        name: 'accessToken',
        // @ts-ignore
        value: session.user.accessToken,
        httpOnly: true,
        secure: true,
        sameSite: true,
        // maxAge: 60 * 1,
      });

      return session;
    },
  },
});

export { handler as GET, handler as POST };
