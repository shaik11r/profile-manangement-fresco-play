const { json } = require('express');
const express=require('express');
const fs=require('fs');
const app=express();
var read=JSON.parse(fs.readFileSync(`${__dirname}/post.json`,'utf-8'));

console.log(read);
app.use(express.json());
app.get('/',(req,res)=>{
    res.send('hello');
})
app.post('/',(req,res)=>{
    const x=req.body;
    read.push(x);
    fs.writeFile(`${__dirname}/post.json`,JSON.stringify(read),function(err){
        if(err)throw err;
        console.log("saved");
        res.sendStatus(200);
    }
    )
})
app.get('/post/:id',(req,res)=>{
    var word=req.params;//object 
    console.log(word);
    for(i in read){
        if(read[i].id===word.id)
        res.send(read[i]);
    }
})
app.get('/view',(req,res)=>{
    const word=req.query.id
    console.log(word);
    if(word===null){
    const x=JSON.stringify(read);
    res.send(x);
    }
    else{
        var i=0;
        for(i in read){
            console.log(read[i].id);
            if(read[i].id===word){
                const x=JSON.stringify(read[i]);
                res.send(x);
                res.sendStatus(200);
            }
        }
    }

})
const port=4000;
app.listen(port,()=>{
console.log('working');
})