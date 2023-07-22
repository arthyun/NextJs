import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
    providers: [
        //현재는 깃헙이지만 타 사이트 추가 가능
        //발급받은 ID와 Secret Key 입력하기
        GithubProvider({
        clientId: '925bcbb88fd4ea2bb73f',
        clientSecret: 'c9d0e9e562c0aecdd257641357f006d9286c91a9',
        }),
    ],
    //JWT 사용시 입력 암호
    secret : '3316'
};
export default NextAuth(authOptions); 