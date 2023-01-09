const express = require('express');
const app = express();

const { Server: HttpServer } = require('http')
const { Server: IOServer } = require("socket.io");

const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const session = require('express-session')

const MongoStore = require('connect-mongo');
const mongoOptions = { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

const {loggerConsole, loggerWarn, loggerError} = require('./loggers/winston');

require('dotenv').config();

const passport = require('./authentication/passport');

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const parseArgs = require('minimist');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Routers
const routerCarrito = require('./routes/routerCarrito')
const routerProductos = require('./routes/routerProductos')
const authRouter = require('./routes/auth')
const routerOrdenes = require('./routes/routerOrden')
const routerMensajes = require('./routes/routerMensajes')


app.set('view engine', 'ejs')

const {save, verMsj} = require("./normalizado/mensajes");
const { builtinModules } = require('module');
const config = require('./config')

app.use(session({
    store: MongoStore.create({
        mongoUrl: config.MONGO_DB,
        mongoOptions,
        maxAge:600000,
        retries: 0
    }),
    secret: "Secret",
    resave: false,
    saveUninitialized: true
}))

//Inicializacion passport
app.use(passport.initialize());
app.use(passport.session())

app.use('/api/productos', routerProductos)
app.use('/api/carritos', routerCarrito)
app.use('/api/ordenes', routerOrdenes)
app.use('/api/mensajes', routerMensajes)


io.on('connection', async (socket) => {
    socket.on("chat_message", (msj)=> {
        save(msj)
        io.sockets.emit('new_message', msj)
    });
    const getAll= await verMsj()
    const getAllPesoOriginal= JSON.stringify(getAll).length / 1024

    io.sockets.emit('MENSAJES_EXISTENTES', getAll)
    io.sockets.emit('porcentaje', getAll, getAllPesoOriginal )

})


// uso Router authRouter
app.use('/',authRouter)
authRouter.use(express.static('public'));

app.get('*', (req, res) => {
    res.send(`<h1> Ruta ${req.url} no implementada</h1>` )
})



if (config.MODE =="cluster") {
    if (cluster.isPrimary) {
        console.log(`Master ${process.pid} is running`)
        for (let i = 0; i < numCPUs; i++) {
            cluster.fork()
        }
        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`)
        })
    } else {
        httpServer.listen(config.PORT || 8080)
        console.log("en else")
        console.log(`Worker ${process.pid} started`)
    }
} else if (config.MODE =="fork")  {
    httpServer.listen(config.PORT, () => {
        console.log(`Servidor online puerto ${config.PORT || 8080}`)
        /* loggerConsole.log('debug', `Servidor online puerto ${process.env.PORT || 8080}`) */
    })
    .on('error', (e) => console.log('Error en inicio de servidor: ', e.message)); 
}

