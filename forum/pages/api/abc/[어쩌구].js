// 이 파일은 다이나믹 라우트 기능이 있는 서버 api이다.
// '/api/abc/아무말로 요청가능하다.

export default function handler(req, res){
    console.log(req.query);
    return res.status(200).json('요청 주소를 다시 확인하세요.');
}