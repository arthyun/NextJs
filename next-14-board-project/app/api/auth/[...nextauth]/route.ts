import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { SupabaseAdapter } from '@auth/supabase-adapter';
import { Adapter } from 'next-auth/adapters';

// 구글 리프레시 토큰 관련
const GOOGLE_AUTHORIZATION_URL =
  'https://accounts.google.com/o/oauth2/v2/auth?' +
  new URLSearchParams({
    prompt: 'consent',
    access_type: 'offline',
    response_type: 'code',
  });
///////////////////////////////////////////////////
const refreshAccessToken = async (token: any) => {
  try {
    // account.provider를 기준으로 api url 분기처리
    const google_url =
      'https://oauth2.googleapis.com/token?' +
      new URLSearchParams({
        client_id: process.env.GOOGLE_CLIENT_ID ?? '',
        client_secret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        grant_type: 'refresh_token',
        refresh_token: token.refreshToken as string,
      });
    const res = await fetch(token.provider === 'google' ? google_url : '', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      method: 'POST',
    });
    const refreshedTokens = await res.json();
    if (!res.ok) {
      throw refreshedTokens;
    }
    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token ?? token.refreshToken, // Fall back to old refresh token
    };
  } catch (error) {
    console.log(error);
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

// 본문
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
      authorization: GOOGLE_AUTHORIZATION_URL,
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
          if (result.status === 200) {
            // 결과값이 callback > jwt > user로 넘어감
            return result;
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, trigger, session }) {
      // 구글 관련
      if (account && user) {
        return {
          provider: account.provider, // 구분자
          accessToken: account.accessToken,
          accessTokenExpires:
            (account.expires_at && (account.expires_at as number) * 1000) ??
            new Date().getTime() + 60000,
          refreshToken: account.refresh_token,
          user,
        };
      }
      // @ts-ignore
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }
      return refreshAccessToken(token);
    },
    async session({ token, session }: { token: any; session: any }) {
      // 구글 관련
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.error = token.error;
      }
      return session;
    },
  },
  // 토큰 주기
  // jwt: {
  //   maxAge: 60 * 1, // 1분...
  // },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 2, // 2분...
  },
  debug: true, // 디버깅
});

export { handler as GET, handler as POST };
