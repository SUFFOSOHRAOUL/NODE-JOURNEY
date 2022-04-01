const fs = require("fs")
const crypto = require("crypto")
const start = Date.now()

 process.env.UV_THREADPOOL_SIZE = 1

setTimeout(() => console.log('timer 1 finished'),0)
setImmediate(()=>console.log('immediate 1 finished'))

fs.readFile('test-file.txt',()=> {
    console.log('I/O task is finished' )
    setTimeout(() => console.log('timer 2 finished'),3000)
    setTimeout(() => console.log('timer 3 finished'),0)

setImmediate(()=>console.log('immediate 2 finished'))

process.nextTick(()=> console.log('process.nextTick'))

crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
    console.log(Date.now()-start,"password encrypted")

    crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
    console.log(Date.now()-start,"password encrypted")
    crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
    console.log(Date.now()-start,"password encrypted")
    crypto.pbkdf2Sync("password", "salt", 10000, 1024, "sha512")
    console.log(Date.now()-start,"password encrypted")



})

console.log('hello from the top level code')
