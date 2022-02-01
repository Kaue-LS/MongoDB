const express= require("express")
const cookieParser=require('cookie-parser')
const cors= require("cors")
const mongoose=require("mongoose")
const Routes= require("./src/routes")
const app= express()

// Iniciando o servidor na porta
const port = process.env.PORT || 8000;

// colocando os requisitos que a const app vai usar
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*')
    res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,token");
    
    app.use(cors())
    next()
})
app.use(cookieParser())
app.use(express.json())
//  O cors vai indicar quais dominios vai utilizar a api
app.use(Routes)

// ===================================


// Conectando ao banco de dados mongoDB

mongoose.connect('mongodb+srv://nome:senha@cluster0.1msze.mongodb.net/nome do BD',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Conexao realizada com sucesso')
}).catch((erro)=>{
    console.log(`Conexão falhou ${erro}`)
});

// ==================================================







app.listen(port,()=>{
    console.log(`Server iniciado na porta : http://localhost:${port} `)
})