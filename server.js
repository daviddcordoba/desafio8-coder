import express  from 'express'
const app = express()
import { createServer } from 'http'
import { Server}  from 'socket.io'

const httpServer = createServer(app);
const io = new Server(httpServer, {

});

import ClienteSql from './sql.js'
/* import { config } from './config/sqlite3.js' */
import {mysql} from './config/mysql.js'

/* const sql = new ClienteSql(config) */ // sql3 no funciona????
const sql = new ClienteSql(mysql)


const productos = []

io.on('connection', async socket => {

    console.log('Nuevo cliente conectado!');
    
    await sql.crearTabla('mensajes')
    console.log("**TABLA DE MENSAJES CREADA**")

    await sql.crearTabla('productos')
    console.log("**TABLA DE PRODUCTOS CREADA**")

    socket.emit('productos', productos);
    socket.on('update-productos',async e => {
        await sql.insert('productos',e)
        io.sockets.emit('productos', await sql.listar('productos'));
    })

    socket.emit('chat', await sql.listar('mensajes'));
    socket.on('update-chat', async e => {
        await sql.insert('mensajes',e)
        io.sockets.emit('chat', await sql.listar('mensajes'));
    })


});


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
