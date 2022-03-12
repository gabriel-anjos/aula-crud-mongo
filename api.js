const express = require('express');
/*
O Express é um framework incrível e possui diversas características que facilitam o 
desenvolvimento de nossas aplicações. Dentre suas principais características, podemos citar:

    -Possui um sistema de rotas completo;
    -Possibilita o tratamento de exceções dentro da aplicação;
    -Permite a integração de vários sistemas de templates que facilitam a criação de páginas web para suas aplicações;
    -Gerencia diferentes requisições HTTP com seus mais diversos verbos;
    -Feito para a criação rápida de aplicações utilizando um conjunto pequeno de arquivos e pastas;

*/
const mongoose = require('mongoose');
//Mongoose é uma biblioteca para node.js baseada em Schemas para modelar os dados de 
//nossa aplicação. Tudo no Mongoose começa com um Schema, 
//e cada schema mapeia uma collection no MongoBD e nessas collections
//Isso significa que o Mongoose traduz os dados do banco de dados para objetos 
//JavaScript para que possam ser utilizados por sua aplicação.
const PRoduct = require('./models/product');

const PORT = 3000;
//porta para o uso do servidor!
const app = express();


//configuraçao do .env
const dbuser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;

app.use(express.json());

//rota home 
app.get('/',(req,res)=>{
    res.status(200).json({msg:'bem vindo a nossa API!!'})
})

//rota de todos os produtos
app.get('/products',async(req,res)=>{
    const product = await PRoduct.find()
    res.status(200).json({product})
    
})

//rota de um produto especifico
app.get('/product/:id',async(req,res)=>{
    const id = req.params.id;
    console.log(id)
    const product = await PRoduct.findById(id)
    if(!product){
        return res.status(404).json({msg:'produto nao encontrado'})
    }
    res.status(200).json({product})
})

//rota para cadastrar um produto
app.post('/product/register',async(req,res)=>{
    const{name,code,price} = req.body;
    
    const productExists = await PRoduct.findOne({code:code});

    if(productExists){
        return res.status(422).json({msg: "produto já cadastrado"})
    }
    //utilizando o model
    const Product = new PRoduct({
        name,
        code,
        price,
    });

    try{
        await Product.save();
        res.status(201).json({msg: 'produto cadastrado com sucesso'});
    }catch(err){
        console.log(err)
    }
})

//rota para deletar um produto
app.delete('/product/:id',async(req,res)=>{
        const {id} = req.params;

            const productExists = await PRoduct.findByIdAndDelete(id)
            if(!productExists){
              return  res.status(404).json({msg:'produto nao encontrado'})
            }
            res.status(202).json({msg:'produto deletado '})

 })

//rota para a atualização de um produto
app.put('/product/:id',async(req,res)=>{
    try{
        const product = await PRoduct.findById(req.params.id);
       //é usado para copiar valores de todas as propriedades enumeraceis de um ou mais objetos
       //de origem para  uma objeto.Este metodo ira retonar o objeto destino
       //Object.assign(destino, ...origens)
        Object.assign(product,req.body);
        product.save();
        res.send({msg:'produto atualizado com sucesso!'})
    }catch(error){
        console.log(error)
    }
});

//configuraçao da inicializaçao do server 
//funçao do Express usada para ligar e escutar conexoes em uma porta especifica 
app.listen(PORT,()=>{
    console.log('server is running!!!')
})

//Conexao com o banco 
mongoose.connect(`mongodb+srv://gabriel-1:ppHo3n81KKp7Xt2r@aula-mongo.tc2ip.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`)
.then(()=>{
    console.log('conectou!!!')
}).catch((err)=>console.log(err))
