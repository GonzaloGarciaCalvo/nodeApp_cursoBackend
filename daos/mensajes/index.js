
const MensajesDaoMongo = require('./MensajesDaoMongo')
/* const MensajesDaoArchivo = require('./mensajes/MensajesDaoArchivo') */

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