const { json } = require('express');
const express=require('express');
const fs=require('fs');
const { stringify } = require('querystring');
var test=require(`${__dirname}/post.json`);
const app=express();
// const values=JSON.parse(
// fs.readFileSync(`${__dirname}/post.json`));
var read=JSON.parse(fs.readFileSync(`${__dirname}/post.json`,'utf-8'));
console.log(read);
app.use(express.json());//middleware for json
app.get('/',(req,res)=>{
    res.send('hello');
})
app.post('/',(req,res)=>{
const x=req.body;
read.push(x);
// console.log(x);
// console.log(read);
        fs.writeFile(`${__dirname}/post.json`,JSON.stringify(read),function(err){
        if(err)throw err;
        console.log("saved");
        res.sendStatus(200);
    }
    )
})
app.get('/post/:id',(req,res)=>{
    var word=req.params;//it has parameter object
    // console.log(word);
    // console.log(read[word.id].age);
    for(i in read){
        if(read[i].id===word.id)
        res.send(read[i]);
    }
    // console.log(word.id);
})
app.get('/view',(req,res)=>{
    // const word=req.params.key;
    const word=req.query.id
    if(word===null){
        const x=JSON.stringify(read);
        res.send(x);
    }
    else{
        var i=0;
        for(i in read){
            if(read[i].id===word){
    const x=JSON.stringify(read[i]);
    res.send(x);
    res.sendStatus(200);
    }
}
}
})
app.get('/edit/:id',(req,res)=>{
    var word=req.params;
    console.log(word);
    var i=0;
    for( i in read){
        if(read[i].id===word.id){
            read[i].name="updated name";
            res.send(read[i]);
            res.sendStatus(200);
        }
    }

})
const port=4000;
app.listen(port,()=>{
    console.log('working')
})
