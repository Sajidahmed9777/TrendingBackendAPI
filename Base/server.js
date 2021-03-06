var http = require('http');
const express = require('express');
var router = express.Router();
var eBay = require('ebay-node-api');

var searchTerm;

router.get('/:search', function(req,res, next){
    console.log('requested url: ' + req.url);
    console.log('requested item: ' + req.params.search);
    searchTerm = req.params.search;
    calculatePrice(searchTerm,res);
   });


function calculatePrice(searchTerm, res){


    var finalJson;
    let ebay = new eBay({
        clientID: "pricefin-pricefin-PRD-bf2cd4cf7-bca5e5ee",
     limit:20,// fetches top 10 results in form of JSON.
        env: "PRODUCTION" // optional default = "PRODUCTION"
    })
    
   // const searchTerm = "iphone 5s";
    var jsonRes =[];
     stri = "";
    

     var recommededJson = {

     };
    var prices = 0;
    var pArr = [];
    var total  = 0;
    var img = [];
    var urlArr = [];
    
    ebay.findItemsByKeywords(searchTerm).then((data) => {
        jsonRes = data;
        // var item["@count"] = "";
        
       // console.log(JSON.stringify(data));
    var itemCount = 0;
        for(var searchResult in jsonRes[0].searchResult[0].item){
          

            prices = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].sellingStatus[0].currentPrice[0].__value__));



            var imgageurl = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].galleryURL[0]));
            var urlArray = (JSON.stringify(jsonRes[0].searchResult[0].item[searchResult].viewItemURL[0]));
                
    
            var fPrice = parseFloat(prices.replace(/"/g,''));
           // console.log((fPrice));
            total =fPrice+total;
            pArr.push(fPrice);
            img.push(imgageurl);
            urlArr.push(urlArray);
            itemCount++;
            
    
    
        }
  
        
    //    console.log("Total : " +total);
    //    console.log("items : " +itemCount);
    //    console.log("Average : " +total/itemCount);
    //    console.log("Image :" + img.toString());
    //    console.log("Viewed URL :" + urlArr.toString());
    //    console.log("Productprice" + pArr)
       //  predictedPrice = total/itemCount;

         recommededJson =  {
            'phone':{
               'img' : img[0],
               'url' : urlArr[0],
               'price' : pArr[0]
            },
             'phoneOne':{
                'img' : img[1],
                'url' : urlArr[1],
                'price' : pArr[1]
             },
             'phoneTwo':{
                'img' : img[2],
                'url' : urlArr[2],
                'price' : pArr[2]
             },
             'phoneThree':{
                'img' : img[3],
                'url' : urlArr[3],
                'price' : pArr[3]
             },
             'phoneFour':{
                'img' : img[4],
                'url' : urlArr[4],
                'price' : pArr[4]
             },
         };


         /*result="recommendedJson:[";
         for(i in img,urlArr,pArr){
             result=result+'{urlArr:'+i+",img,urlArr,parr"+img[]+'}';
         }*/


         
   

     
  /*  return predictedJson;
    }, (error) => {
        console.log(error);*/
   
    }).then((json)=>{
        console.log(JSON.stringify(recommededJson));
        finalJson = json;
        res.end(JSON.stringify(recommededJson));

        //return recommededJson;
      (error) =>{
            console.log(error)
        }
     
},function(error){
    console.log(error);
});
}




http.createServer(router).listen(3000);

console.log("server is running")