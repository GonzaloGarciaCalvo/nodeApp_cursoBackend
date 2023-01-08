
const MensajesDaoMongo = require('./MensajesDaoMongo')


let mensajesDao;
let selector;
selector = 'mongoDB'

  switch (selector) {
    
    case 'mongoDB':{
    mensajesDao = new MensajesDaoMongo()
    }
    break;

    }

    const getOrdenesDao = mensajesDao
    module.exports = getOrdenesDao