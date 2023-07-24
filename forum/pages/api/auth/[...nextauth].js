import { connectDB } from '@/util/database';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    //현재는 깃헙이지만 타 사이트 추가 가능
    //발급받은 ID와 Secret Key 입력하기
    GithubProvider({
      clientId: '925bcbb88fd4ea2bb73f',
      clientSecret: 'c9d0e9e562c0aecdd257641357f006d9286c91a9'
    }),
    GoogleProvider({
      clientId: '342433032296-89g2djerd757tbrctgdegt5slf7vt1fs.apps.googleusercontent.com',
      clientSecret: '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'
    })
  ],
  //JWT 사용시 입력 암호
  secret: '3316',
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions);