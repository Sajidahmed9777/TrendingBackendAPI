import { config } from "./config";
import * as fileHelpers from "./fileHelpers"
import * as request from 'request';


analyzeImage('broken-phone-on-white-background-royalty-free-image-1049624022-1552404766.jpg')

function analyzeImage(fileName: string){
    const requestOptions: request.CoreOptions ={
        headers:{
            "Content-Type":"application/octet-stream",
            "Ocp-Apim-Subscription-Key": config.vision.key1,
            "Prediction-Key" :config.vision.key1
        },
        body:fileHelpers.readImage(__dirname+'/'+fileName)
    };
    
    let uri = config.vision.endpoint;
   
request.post(
    uri,
    requestOptions,
    (err,response,body) =>{
            console.log(body);
    }
    )   
}
