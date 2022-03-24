const fs = require('fs')
const http= require('http')
const { parse } = require('path')
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


const data = fs.readFileSync('/home/suffo/Downloads/NEW/starter/dev-data/data.json','utf-8')
    const dataobj = JSON.parse(data)

const server = http.createServer((req,res)=>{
    const pathname=req.url
    if(pathname ==='/' || pathname ==='/overview'){
        res.end('this is the overview')
    }else if(pathname === '/product'){
        res.end ('this is the product')
    
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
