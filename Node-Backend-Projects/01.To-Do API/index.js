const http = require('http')
const server = http.createServer()

const toDoList = [
    {id:0,title:'Buy Grocery',status:true},
    {id:1,title:'Wash Car',status:false},
    {id:2,title:'Complete Assignment',status:false},
]


server.on('request',(req,res)=>{
    // URL ELEMENTS
    const item = req.url.split('/')
    
    // GET METHOD
    // HOME URL
    if(req.method=='GET' && req.url=='/'){
        return res.end(JSON.stringify({"message":"Welcome to ToDo App"}))
    }

    // ALL TODOS
    if(req.method=='GET' && req.url == '/todos'){
        res.writeHead(200,{'Content-Type':'application/json'})
        return res.end(JSON.stringify(toDoList))
    }

    // PARTICULAR TODOS
    if(req.method=='GET' && item[1]=='todo' && item.length==3 && ((toDoList.length)>(Number(item[2])))){
        res.writeHead(200,{'Content-Type':'application/json'})
        return res.end(JSON.stringify(toDoList[Number(item[2])]))
    }

    if(req.method=='GET'){
        res.writeHead(404,{'Content-Type':'application/json'})
        return res.end(JSON.stringify({error:"Something went wrong"}))
    }

    // ###########################################################################################################

    // POST METHOD
    if(req.method=='POST'&&req.url=='/todos'){
        req.on('data',(chunk)=>{
            data = JSON.parse(chunk)
            toDoList.push(data)
        })
        req.on('end',()=>{
            res.writeHead(201,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(toDoList))
        })
    }
    if(req.method=='POST'){
        res.writeHead(404,{'Content-Type':'application/json'})
        return res.end(JSON.stringify({error:"Something went wrong"}))
    }

    // ###########################################################################################################

    // PATCH METHOD
    if(req.method=='PATCH' && item[1]== 'todo'&&item.length==3 &&((toDoList.length)>(Number(item[2])))){
        req.on('data',(chunk)=>{
            newData = JSON.parse(chunk)
            toDoList[Number(item[2])]={
                id:toDoList[Number(item[2])].id,
                title:newData.title||toDoList[Number(item[2])].title,
                status:newData.status||toDoList[Number(item[2])].status
            }
        })
        req.on('end',()=>{
            res.writeHead(201,{'Content-Type':'application/json'})
            return res.end(JSON.stringify(toDoList))
        })
    }
    if(req.method=='PATCH'){
        res.writeHead(404,{'Content-Type':'application/json'})
        return res.end(JSON.stringify({error:"Something went wrong"}))
    }
    
    // ###########################################################################################################


    // DELETE METHOD
    if(req.method=='DELETE' && item[1]== 'todo'&&item.length==3 &&((toDoList.length)>(Number(item[2])))){
        toDoList.splice(Number(item[2]),1)
        res.writeHead(201,{'Content-Type':'application/json'})
        return res.end(JSON.stringify(toDoList))
    }
    if(req.method=='DELETE'){
        res.writeHead(404,{'Content-Type':'application/json'})
        return res.end(JSON.stringify({error:"Something went wrong"}))
    }
    
})


server.listen(3000,()=>{
    console.log(`Server is listening at port 3000!!`)
})