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

5. url을 이용하여 상세페이지로 이동하게 하기
  / 다이나믹 라우트 기능을 이용하여 폴더링하기 폴더명 = [id] 
  / DB 연결문을 작성 후 findOne({'객체 내용'}) 을 사용하여 해당 객체데이터를 선택하여 가져오기

6. 다이나믹 라우트가 사용된 페이지로 이동 시 입력한 url값은 해당 컴포넌트에서 props로 받아올 수 있다!!
  / list 컴포넌트에서 해당 글 클릭 시 _id값을 url로 넘겨 다이나믹 라우트가 가능하게 해보자! -> Link 태그를 이용!

7. useRouter 기능을 이용해서 페이지를 이동해보자
  / Hook을 사용하려면 client 컴포넌트에서만 가능하다.
  / useRouter을 'next/navigation'으로 import 한다.
  / 변수에 useRouter()을 담아주고, push('경로'), forward(), back(), refresh(), prefetch('경로')를 사용해 보자.
  / prefetch()는 거의 사용하지 않는다. -> Link가 있기 때문

* 유저의 모든 동작이 관련된 컴포넌트는 클라이언트 컴포넌트이며, 서버 컴포넌트에서 사용하고자 한다면, 별도의 클라이언트 컴포넌트 파일을 서버 컴포넌트 내에서 import해서 붙이면 된다.
