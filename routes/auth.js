const express = require("express");
const { Router } = express
const path = require('path')
const authRouter = new Router()
const auth = require('../middleware/auth')
const passport = require('passport')
const {loggerConsole} = require('../loggers/winston');
const mailer = require("../utils/mailer");


//Routes

authRouter.post("/login",  
    passport.authenticate('login', { failureRedirect: '/nocredentials' }), 
    (req, res) => {
        loggerConsole.log('info', 'peticion a /')
        /* req.session.user = req.user */
        res.redirect('/home')
        /* res.render('./pages/home') */
    }
)


authRouter.post('/signup',
	passport.authenticate('signup', {
		successRedirect: "/registroExitoso", 
		failureRedirect: "/errorRegister",   
	}),
	(req, res) => {
        
		res.redirect("./pages/singupExitoso");
	}
);
/* console.log("req.user", req.user) */

authRouter.get('/home', auth, (req, res) => {   
    console.log("peticion a home")
    loggerConsole.log('info', 'peticion a /home')
    /* const email= req.user.username */
    const email= req.user.email
    console.log("email en auth _", email)
    res.render('./pages/home', {
        /* user: req.user, */
        /* email:email */
        user:email
    })

})
authRouter.get('/signup', (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/signup')
    res.render('./pages/signup')
})

authRouter.get('/registroExitoso', (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/registroExitoso')
    res.render('./pages/registroExitoso')
});
/* authRouter.get('/singupExitoso', (req, res) => {
    res.sendFile('./singup.html', {root:'public'})
}); */

//Errores
/* authRouter.get('/userexistente', (req, res) => {
    res.render('./pages/noCredentials', { error: 'Correo electronico ya existente' })
}); */
authRouter.get('/nocredentials', (req, res) =>{
    const email= req.user.email
    const user = req.user
    console.log("email en /noCredentials", email) // OK
    console.log("user en /noCredentials", user)
    loggerConsole.log('info', 'peticion a /pages/noCredentials')
    res.render('./pages/noCredentials', { error: 'Correo o password invalidos' })
});
authRouter.get('/errorRegister', (req, res) =>{
    loggerConsole.log('info', 'peticion a /pages*errorRegister')
    res.render('./pages/errorRegister', { error: 'Registro incorrecto, correo o password invalidos' })
});


//Logout
authRouter.get("/logout", (req, res) => {
    loggerConsole.log('info', 'peticion a /pages/logout')
    const email= req.user.username // username?
    req.session.destroy();
    req.logout(() => {
        res.render('./pages/logout',{email})
    })
});

module.exports= authRouter
