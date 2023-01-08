const CarritosDaoMongo = require('./CarritosDaoMongo')
const CarritosDaoArchivo = require('./CarritosDaoArchivo')

let carritosDao;
let selector;
selector = 'mongoDB'
/* selector = 'archivo' */


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