const fs = require('fs')
const http= require('http')
const url= require('url')




//BLOCKING SYNCHRONOUS  

/*const textIn =fs.readFileSync('/home/suffo/Downloads/NEW/starter/txt/input.txt','utf-8')
console.log(textIn)
const textOut=`this is what we know about avocados \n ${textIn} \ncreated on ${Date.now()}`
fs.writeFileSync('/home/suffo/Downloads/NEW/starter/txt/output.txt' , textOut)
*/
//NON BLOCKING SYNCHRONOUS  
// fs.readFile('/home/suffo/Downloads/NEW/starter/txt/start.txt','utf-8', (err,data)=>{
    
//     fs.readFile(`/home/suffo/Downloads/NEW/starter/txt/${data}.txt`,'utf-8', (err,data2)=>{
//         console.log(data2)
//         fs.readFile(`/home/suffo/Downloads/NEW/starter/txt/append.txt`,'utf-8',(err,data3)=>{
//             console.log(data3)
//             fs.writeFile('/home/suffo/Downloads/NEW/starter/txt/final.txt', `${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('the file is written')
//             })
//         })
       
//     })
    
// })
const replacetemplate = (temp,product) => {
    let output = temp.replace(/{%PRODUCTNAME%}/g,product.productName)
        output = output.replace(/{%IMAGE%}/g,product.image)
         output = output.replace(/{%PRICE%}/g,product.price)
         output = output.replace(/{%FROM%}/g,product.from)
        output = output.replace(/{%NUTRIENTS%}/g,product.nutrients)
        output = output.replace(/{%QUANTITY%}/g,product.quantity)
        output = output.replace(/{%DESCRIPTION%}/g,product.description)
        output = output.replace(/{%ID%}/g,product.id)


      if(!product.organic)  output = output.replace(/{%NOT_ORGANIC%}/g,'not-organic')      
     return output
    }






const tempOverview = fs.readFileSync('/home/suffo/Downloads/NEW/starter/templates/overview.html','utf-8')
const tempproduct= fs.readFileSync('/home/suffo/Downloads/NEW/starter/templates/templateproduct.html','utf-8')
const tempcard= fs.readFileSync('/home/suffo/Downloads/NEW/starter/templates/productcard.html','utf-8')
const data = fs.readFileSync('/home/suffo/Downloads/NEW/starter/dev-data/data.json','utf-8')
    const dataobj = JSON.parse(data)

const server = http.createServer((req,res)=>{

const {query, pathname} = url.parse(req.url, true)


    
    if(pathname ==='/' || pathname ==='/overview'){
        
        res.writeHead(200,{'content-type': 'text/html'})

        const cardhtml = dataobj.map(el => replacetemplate(tempcard,el)).join(' ')
        const output= tempOverview.replace('{%PRODUCT_CARD%}',cardhtml)
     

        res.end(output)


        
    }else if(pathname === '/product'){
        res.writeHead(200,{'content-type': 'text/html'})
        const product = dataobj[query.id]
        const output=replacetemplate(tempproduct,product)
        res.end (output)
    
    }else if(pathname === '/api')
    {
           res.writeHead(200,{'content-type': 'application/json'})
           res.end (data)
       
    
    }else{
    res.writeHead(404, {
        'content-type': 'text/html',
        'my-own-header': 'hello-world'
    })
    res.end('<h1>page not found</h1>')
}
    
})
server.listen(8000,'127.0.0.1' ,()=>{
    console.log('listening to port 8000')
})
