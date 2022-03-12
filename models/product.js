const mongoose = require('mongoose');
const PRoduct = mongoose.model('PRoduct',{
   
    name: String,
    code: Number,
    price: Number,
})

module.exports = PRoduct
//Modelos definem a estrutura dos dados armazenados, incluindo os tipos de 
//campos e possivelmente também o seu tamanho máximo, valores default, opções 
//de listas de seleção, texto de ajuda para documentação, texto de labels para formulários, etc