const mongoose = require("mongoose")
// Definindo o mongoose schema


const bcrypt=require("bcrypt")
// Usaremos brcrypt para criptogragar a senha


const DataSchema= new mongoose.Schema({
    nome:{
       type: String,
    },
    sobrenome:{
        type: String,
     },
    admin:{
        type:Boolean,
        default:false
    },
    email:{
       type: String,
    },
    senha:{
       type: String,
    }
},
    {
        timestamps:true
        // Ele vai criar o create at e update at
    }
)
// Antes de salvar ele vai executar a seguinte função
DataSchema.pre("save",function(next){
    if(!this.isModified("senha")){
        console.log(this.senha)
        return next();
    }
    this.senha=bcrypt.hashSync(this.senha,10)
    next()
    
});
DataSchema.pre('findOneAndUpdate', function (next){
    var password = this.getUpdate().senha_usuario+'';
    if(password.length<55){
        this.getUpdate().senha_usuario = bcrypt.hashSync(password,10);
    }
    next();
});
DataSchema.methods.isCorrecPassword= function(password,callback){
    const pass=this.senha
    bcrypt.compare(password,pass,function(err,same){
        if(err){
            callback(err)

        }else{
            callback(err,same);
        }
    })
}

const clientes= mongoose.model("Clientes",DataSchema);
module.exports=clientes;