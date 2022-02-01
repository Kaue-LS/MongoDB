const clientes = require("../models/Cliente.model");
const jwt=require('jsonwebtoken')
const secret='mysecret'
// Colocando funções
// vai exportar todas as funçoes
module.exports={
    // Get
    async index(req,res){
        const cliente= await clientes.find();

        res.json(cliente)
    },
    async admin1(req,res){
        const cliente= await clientes.find({admin:true});

        res.json(cliente)
    },
    async admin2(req,res){
        const cliente= await clientes.find({admin:false});

        res.json(cliente)
    },
    // POST
    async create(req,res){
        // Essas sao as info que vao vim do front-end
       const {nome,sobrenome,email,admin,senha}= req.body;
       let data={};
    //    Vai verificar se o email ja existe dentro
      let user= await clientes.findOne({email})
       if(!user){
        //    Caso nao exista mesmo email
           data={nome,sobrenome,email,admin,senha};
           user= await clientes.create(data);
           return res.status(200).json({
               error:false,
               message:'Cadastrado com sucesso'
           })
       }else{
        return res.status(400).json({
            error:true,
            message:`E-mail já cadastrado!`,
            user
        })

       }
       
    },
    // Get pelo ID
    async details(req,res){
        const {id} = req.params;
        const user= await clientes.findById(id)
        res.json(user)
    },
    // Delete pelo ID
    async delete(req,res){
        const {id}= req.params;
        console.log("O ID é"+ {id})
        const user= await clientes.findByIdAndDelete(id)
        return res.json(user)
    },
    // Update pelo ID
    async update(req,res){
        const {id}=req.params;
        const {nome,sobrenome,email,admin,senha}= req.body;
        const data={nome,sobrenome,admin,email,senha};
       const user=await clientes.findByIdAndUpdate(id,data,{new:true})
       return res.json(user)
    },
    async login(req,res){
        req.header("*");
        const {email,senha}=req.body;
        clientes.findOne({email},function(err,user){
            if(err){
                 console.log(err)
                res.status(200).json({error:"Erro no servidor"})
            }else if(!user){
                res.status(200).json({status:2,error:"Email não encontrado"})
            }
            else{
                user.isCorrecPassword(senha,function(err,same){
                    if(err){
                        console.log(err)
                        res.status(200).json({error:"Erro no servidor"})
                    }else if(!same){
                        res.status(200).json({status:2,error:"A senha nao confere"})
                    }
                    const payload={email}
                    const token = jwt.sign(payload,secret,{
                        expiresIn:"24h"
                    })
                    res.cookie('token',token,{httpOnly:true})
                    res.status(200).json({status:1,auth:true,token:token,id:user.id,nome:user.nome,sobrenome:user.sobrenome,admin:user.admin})
                    
                })
    }
})
},
    async checkToken(req,res){
        const token = req.body.token || req.query.token || req.cookies.token || req.header("x-access-token");
        req.token=token;
        if(!token){
            res.json({
                status:401,
                message:"Não autorizado"
            })
        }
        else{
            jwt.verify(token,secret,function(err,decoded){
                if(err){
                
                    res.json({status:401,msg:"Token invalido"})
                }
                else{
                    res.json({decoded,status:200})
                }
            })
        }
    },
    async destroyToken(req,res){
        const token = req.headers.token;
        if(token){
            res.cookie('token',null,{httpOnly:true});
        }else{
            res.status(401).send("Logout não autorizado!")
        }
        res.send("Sessão finalizada com sucesso!");
    }

}

    
// Precisa ir na rota dps de colocar tudo para informar
// O caminho para executar essa função