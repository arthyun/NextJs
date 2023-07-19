// 기본방식
// import { MongoClient } from 'mongodb';
// //DB주소
// const URL = 'mongodb+srv://admin:3316@cluster0.ebm2cxs.mongodb.net/';
// //연결문
// const client = await MongoClient.connect(URL, { useNewUrlParser: true });
// //출력 -> 변수이기 때문에 중괄호로 export함
// export { client }


// 조건문을 걸어 상황에 맞게 연출
import { MongoClient } from 'mongodb';

const Url = 'mongodb+srv://admin:3316@cluster0.ebm2cxs.mongodb.net/';
const options = { useNewUrlParser: true };
let connectDB;

//전역 변수에 저장함
if (process.env.NODE_ENV === 'development') {
    if (!global._mongo) {
        global._mongo = new MongoClient(Url, options).connect();
    }
    connectDB = global._mongo
} else {
    connectDB = new MongoClient(Url, options).connect();
}
export { connectDB }