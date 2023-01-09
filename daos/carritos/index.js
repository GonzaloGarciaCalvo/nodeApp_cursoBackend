const CarritosDaoMongo = require('./CarritosDaoMongo')
const CarritosDaoArchivo = require('./CarritosDaoArchivo')
const {selector} = require('../../config')

let carritosDao;

console.log(selector)

  switch (selector) {
    
    case 'mongoDB':{
    carritosDao = new CarritosDaoMongo()
    }
    break;

    case 'archivo':{
      carritosDao = new CarritosDaoArchivo()
    }
    }
    
    const getCarritosDao= carritosDao

    module.exports =  getCarritosDao