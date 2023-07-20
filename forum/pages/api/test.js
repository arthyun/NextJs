
export default function testApi(req, res){
    
    if(req.method == 'POST'){
        return res.status(200).json('success');
    }
};