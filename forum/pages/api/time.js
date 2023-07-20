export default function timeApi(req, res){
    const date = new Date();
    const result1 = `${date.getFullYear()}-${Number(date.getMonth()) + 1}-${date.getDate()}`;
    const result2 = `현재시간 : ${date.getHours()}시 ${date.getMinutes()}분 ${date.getSeconds()}초`;

    if(req.method == 'GET'){
        return res.status(200).json(result2);
    }
}