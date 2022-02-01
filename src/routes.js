// Rotas da API

const express=require('express');
const clientes = require('./controllers/userControllers');
const Routes=express.Router()

// Routes.use(bodyParser.json())

Routes.get("/", clientes.index)


// Rotas de usuarios
// Post
Routes.post("/api/clientes",clientes.create)
// GET
Routes.get("/api/clientes",clientes.index)
// Routes.get("/api/clientes/adm",clientes.tipo1)
// Routes.get("/api/clientes/client",clientes.tipo2)


// GET PELO ID
Routes.get("/api/clientes.details/:id",clientes.details)
// DELETE
Routes.delete("/api/clientes/:id",clientes.delete)
// UPDATE
Routes.put("/api/clientes/:id",clientes.update)

// LOGIN
Routes.post('/api/clientes/login',clientes.login)
Routes.get('/api/clientes/checkToken',clientes.checkToken)
Routes.get('/api/clientes/destroyToken',clientes.destroyToken)

module.exports=Routes


//Voce pode testar no  insmonia
