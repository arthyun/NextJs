import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { Adapter } from 'next-auth/adapters';

const handler = NextAuth({
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
        // console.log(credentials?.email);
        // console.log(credentials?.password);
        try {
          const res = await fetch(
            process.env.NEXT_PUBLIC_LOCAL_URL + '/api/member/login',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            }
          );
          const result = await res.json();
          if (result.message === 'ok') {
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
    maxAge: 60 * 1, // 1분...
  },
  jwt: {
    maxAge: 60 * 1, // 1분...
  },
  callbacks: {
    async session({ session, token }) {
      console.log('세션 => ', session);
      console.log('세션 => ', token);
      // session.user = token.user as any;
      return session;
    },
    async jwt({ token, user, account, trigger, session }) {
      console.log('jwt => ', token);
      console.log('jwt => ', user);
      console.log('jwt => ', account);
      console.log('jwt => ', trigger);
      console.log('jwt => ', session);
      // if (user) {
      //   token.user = user;
      // }
      // if (trigger === 'update' && session) {
      //   token = { ...token, user: session };
      //   return token;
      // }
      return token;
    },
  },
});

export { handler as GET, handler as POST };
