const socket = io();

// update-productos
const formProducto = document.getElementById('form-producto')
formProducto.addEventListener('submit', e => {
    e.preventDefault()

    const producto = {
        nombre: document.getElementById('producto-nombre').value,
        precio: document.getElementById('producto-precio').value,
        url: document.getElementById('producto-url').value
    }

    socket.emit('update-productos', producto);
    formProducto.reset()
})

// render-productos
socket.on('productos', manejarEventoProductos);
async function manejarEventoProductos(productos) {

    const recursoRemoto = await fetch('hbs/productos.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ productos })
    document.getElementById('productos').innerHTML = html
}



// update-chat
const formChat = document.getElementById('form-chat')
formChat.addEventListener('submit', e => {
    e.preventDefault()

    const hora = new Date()

    const chat = {
        mail: document.getElementById('chat-mail').value,
        msg: document.getElementById('chat-msg').value,
        hora: '[' + hora.toLocaleString() + ']'
    }
    
    socket.emit('update-chat', chat);
    document.getElementById('chat-msg').value = ''
})

// render-chat
socket.on('chat', manejarEventoChat);
async function manejarEventoChat(chat) {
    console.log(chat)

    const recursoRemoto = await fetch('hbs/chat.hbs')
    const textoPlantilla = await recursoRemoto.text()
    const functionTemplate = Handlebars.compile(textoPlantilla)

    const html = functionTemplate({ chat })
    document.getElementById('chat').innerHTML = html
}






