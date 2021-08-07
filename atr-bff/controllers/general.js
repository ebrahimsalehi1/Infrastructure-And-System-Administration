
const express =require('express');
const router = express.Router();
const axios = require('axios');

const redis = require('redis');
const redisClient = redis.createClient({
	host:'172.25.67.56',
	port:6379
});

redisClient.on('connect',(err)=>{
	if(err){
        console.error("error in redis connection");
        //throw err;
    }
	console.log('connected to the Redis');		
});

router.get('/callWebService',(req,res,next)=>{

    const {urlHeader,accessToken} = req.query;

    const midString = urlHeader.includes("?") ? "&":"?";
    const url = `${urlHeader}${midString}access_token=${accessToken}`;
    console.log(url);

    redisClient.GET(urlHeader,(err,val)=>{

        if(val){
            //console.log('val is OK');        
            res.status(200).send(JSON.parse(val));
        }
        else{
            //console.log('val is not OK');       
            
            axios.get(url)
            .then(responseService=>{
                if(responseService.status == 200){     
                    const data = responseService.data;
                    redisClient.set(urlHeader,JSON.stringify(data),(err)=>{
                        //console.log('redis-set',err);                        
                    });       
                    res.status(200).send(data);
        
                }
            })
            .catch(err=>{
                res.status(417).send(err);
                //console.error(err);
            });
        }
    });

});


router.delete('/deleteWebServiceFromCache',(req,res,next)=>{

    const {urlHeader} = req.query;

    const midString = urlHeader.includes("?") ? "&":"?";
    const url = `${urlHeader}${midString}`;
    console.log(url);

    redisClient.DEL(urlHeader,(err,apply)=>{

        res.status(200).json(
            {
                status:apply==1 ? 'Ok':'Cancel',
                message:apply==1 ? 'حذف کلید با موفقیت انجام شد' : 'کلید موجود نیست'        
            }
            );

    });

});

module.exports = router;
