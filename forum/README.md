# Nextjs 13 게시판 만들기

1. npx create-next-app experimental-app
 - 각종 옵션 선택하기

2. /app/page.js 파일 비우기

3. mongoDB 사용 (저장 방식이 자유로움)
 - 비관계형으로 noSQL이라고 불림.
 - 구글 아이디로 로그인 하기.
 - Database Access 설정 -> admin계정 -> 권한은 atlas-admin
 - Network Access 설정 -> All Allow

4. app폴더 밖에 util 폴더 생성 후 database.js 작성
 - mongoDB 연결문 : 
   ; cosnt client = await MongoClient.connect('URL', { useNewUrlParser : true });
   ; const db = client.db('DB명');
   ; database.js에서 db변수까지 생성하지 않고 client만 export 해 준다.(db변수 선언은 컴포넌트 내에서 하기)
   ; const client = await connectDB;
     const db = client.db('forum');
     let result = await db.collection('post').find().toArray();
   ; DB 입출력 코드는 서버 컴포넌트안에서만 작성하기!

5. 

