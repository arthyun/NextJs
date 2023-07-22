# Nextjs 13 강의

1. npx create-next-app experimental-app
 - 각종 옵션 선택하기

2. /app/page.js 파일 비우기 -> 새로운 시작을 위함

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

7. useRouter 기능을 이용해서 페이지를 이동해보자 -> DetailLink.js 파일 참고
  / Hook을 사용하려면 client 컴포넌트에서만 가능하다.
  / useRouter을 'next/navigation'으로 import 한다.
  / 변수에 useRouter()을 담아주고, push('경로'), forward(), back(), refresh(), prefetch('경로')를 사용해 보자.
  / prefetch()는 거의 사용하지 않는다. -> Link가 있기 때문

* 유저의 모든 동작이 관련된 컴포넌트는 클라이언트 컴포넌트이며, 서버 컴포넌트에서 사용하고자 한다면, 별도의 클라이언트 컴포넌트 파일을 서버 컴포넌트 내에서 import해서 붙이면 된다.

8. 서버 코드 작성해보기 (글 작성기능 만들기)
  / url과 method로 구분됨
  / GET/POST/PUT/DELETE/PATCH
  / app폴더 밖에 pages/api 폴더에 서버 코드 작성하기
  / pages/api 폴더에 만든 파일과 폴더는 자동으로 서버기능의 URL이 된다.
  / url에 /api/test를 추가하여 이동하면 서버가 응답한다.
  / 요청을 위한 가장 쉬운 방법은 form 태그를 사용할 것
  / 글작성을 위해 write 컴포넌트에서 등록 버튼을 클릭 후 req.body 값을 db에 insert 해준다. -> db.collection('post').insertOne(req.body);
  / 함부로 저장이 되지않게 예외처리가 필요

* 서버에서 return할때 res.status(200).redirect(302,'경로')를 사용해서 완료 후 페이지가 이동되게 하자.
* 서버 코드에서 응답(res)에 대한 return을 하지 않으면 오류가 발생한다.

9. 글 수정기능 만들기
  / list에서 해당 게시물의 수정버튼을 클릭하여 edit 페이지로 이동
  / 이동 시 url에 DB의 id값을 같이 넘겨줘서 props로 받은 후 findOne({_id: props...})로 찾아서 기존 게시글을 태그에 박아줘야함.
  / await db.collection('post').updateOne({'수정할 대상'}, {$set: {'수정할 객체 내용'}})을 입력해서 수정문을 서버에 보내줘야 한다.
  / 위의 내용이 수반되려면 update의 성능을 가진 서버를 필요로 한다.
  / next.js는 input태그에 value를 사용하지 않고 defaultValue를 사용한다.
  / 수정 서버에서는 updateOne({}, {$set: {}})을 사용하는데 필요한 id값을 글 수정 페이지에서 넘겨줘야한다. 이때 input 태그로 id값을 담아서 보내주는데 화면에 보이지 않게 하기 위해 display: none 처리한다. -> input에 disable속성을 사용하게 되면 값을 제대로 넘기지 못한다.

10. 글 삭제기능 만들기
  / List 페이지가 서버 컴포넌트이며, 내부에 포함된 result.map은 클라이언트 컴포넌트로 사용하기 위해 파일을 별도로 생성하자. -> ListItem.js 생성
  / 상위 List페이지에서 ListItem 컴포넌트로 DB데이터를 props로 넘겨주자. -> SEO를 최적화 하려면 데이터를 props로 넘겨주는게 좋음
  / form태그 대신 서버에 요청하려면 ajax(fetch)를 사용해야함.
  / deleteOne({})를 사용하여 전달 받은 id에 맞는 DB 필드를 삭제시켜 주자.

* fetch 요청 시 url값에 쿼리 스트링(ex. /api/test?name=son&age=31)을 보내면, 서버 파일에서 req.query로 받아올 수 있다. -> GET요청과 동일
* api도 다이나믹 라우트가 가능함 -> /pages/api/ 경로에 [어쩌구].js 파일을 생성하면됨

11. 구현이 되었으니 성능 향상 및 배포에 대해서 배워보자.
  / 프로젝트 배포 명령어 -> npm run build -> npm run start
    ; 터미널에 로그를 보면 동그라미 기호와 람다 기호가 표시되는데 동그라미는 Static Rendering(HTML을 바로 보내줌) 해주고 람다기호는 Dynamic Rendering(상황마다 HTML을 제작해서 보내줌) 해준다.
  / list 페이지는 다이나믹 렌더링이 되어야 하는데 스태틱으로 동작한다고 로그에 찍혔다. 수정해보자 -> 해당 페이지 상단에 export const dynamic = 'force-dynamic' or export const dynamic = 'force-static'으로 작성하면 된다.
  / 다이나믹 렌더링의 단점은 서버나 DB의 부하가 올 수 있음 -> 해결책은 캐시(Cache) 기능을 사용하면 될듯하다. -> fetch('URL', { cache: 'force-cache' or 'no-store'(실시간 갱신) }) or fetch('URL', { next: { revalidate: 60 } })
  / 페이지 상단에 export const revalidate = 60; 입력 해 두면, 페이지 첫 방문에 60초 동안 페이지를 캐싱한다.

12. 회원 기능에 대해서 설명... (Session, JWT, OAuth)
  / 서버로부터 데이터를 받아와 쿠키 저장소에 저장해두고 페이지마다 확인한다.
  / 세션은 서버와 DB에 직접적으로 데이터 확인을 하기 때문에 부담이 있다.
  / JWT는 서버가 확인은 하지만 DB에는 직접적으로 요청을 하지 않기때문에 부담이 덜 하다.
  / OAuth는 A 사이트의 회원정보를 가져다 B 사이트에서 사용할 수 있다. -> ex. 구글, 네이버 로그인
  / 하지만 Nextjs에서는 NextAuth.js를 지원하기 때문에 별도 구현없이 NextAuth를 사용하면 편하다. -> 하지만 아이디/패스워드를 입력하여 로그인 해야하는 경우에는 강제로 JWT 방식을 사용하여야 한다.(Session 금지) -> Next.js에서 막아둠

13. 소셜로그인 구현 해보자 (NextAuth 라이브러리 사용)
  1. 깃헙 설정 페이지가서 Developer Settiong > OAuth Apps 생성 후 Key값 받기
  2. npm install next-auth@4.21.1 설치하기
  3. /pages/api/ 경로에 auth 폴더 생성 후 [...nextauth].js 파일 생성하기 -> 해당 js 파일에는 강의 하단에 코드를 붙여 넣을것
  4. secret은 JWT 사용 시 기입할 암호를 지정할 것
  5. 최상단의 layout.js로 가서 로그인 버튼을 추가 -> 로그인 버튼은 클라이언트 컴포넌트에서 사용할 수 있기 때문에 별도로 컴포넌트를 생성하여 layout.js에 추가해야한다.
  6. 로그인 버튼에 next-auth/react에서 지원하는 signIn()을 사용한다.
  7. 로그인된 유저정보를 확인하려면 최상단 layout.js에서 await getServerSession(authOptions/[...nextauth].js 파일 참고)을 사용해야하며, 비동기 처리이기 때문에 await를 붙여준다.
  8. 삼항연산자를 이용하여 session값이 존재할때는 로그아웃 버튼이 보이게, 반대일땐 로그인 버튼이 보이게 셋팅해주자.

  * Client Component일때 -> layout.js에서 <SessionProvider></SessionProvider>로 children을 감싸준 후 -> 자식 컴포넌트에서 useSession()을 이용해서 상태를 확인할 수 있다.
  * Server Component일때 -> getServerSession('설정값')으로 세션을 가져와 상태를 확인할 수 있다.