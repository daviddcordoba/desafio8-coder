const fs = require('fs')


class Contenedor {
    constructor(rutaArchivo) {
        this.rutaArchivo = rutaArchivo
    }


    getAll = async () => {
        try{
            // Extraemos info de archivo.txt y lo convertimos en array
            const file = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const arrayItems = JSON.parse(file)
            
            // Devolvemos el array
            return arrayItems
        } catch(err){
            // Creamos el archivo si no existe
            await fs.promises.writeFile(this.rutaArchivo, '[]')
            const file = await fs.promises.readFile(this.rutaArchivo, 'utf-8')
            const arrayItems = JSON.parse(file)
            
            // Devolvemos el array
            return arrayItems
        }
    }
    

    getById = async (id) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Obtenemos el elemento del array con id solicitado
        const item = arrayItems.find(e => e.id === id)
        
        // Devolvemos el objeto si existe si no null
        return item ? item : null
    }


    save = async (nuevoItem) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Definimos nuevo Id y lo incluimos al objeto recibido
        const Ids = arrayItems.map(e => e.id)
        const nuevoId = Math.max(...Ids, 0) + 1
        nuevoItem['id'] = nuevoId

        // Incluimos el nuevo item en array
        arrayItems.push(nuevoItem)

        //Volcamos el array en archivo
        const arrayJSON = JSON.stringify(arrayItems, null, 2)
        await fs.promises.writeFile(this.rutaArchivo, arrayJSON)

        // Devolvemos el nuevo Id
        return nuevoId
    }


    deleteById = async (id) => {
        // Utilizamos Funcion getAll
        const arrayItems = await this.getAll()
        
        // Eliminamos el item del array
        const newArrayItems = arrayItems.filter(e => e.id !== id)

        //Volcamos el array en archivo
        const arrayJSON = JSON.stringify(newArrayItems, null, 2)
        await fs.promises.writeFile(this.rutaArchivo, arrayJSON)

        // Devolvemos nada
    }


    deleteAll = async () => {
        //Escribimos archivo vacio
        await fs.promises.writeFile(this.rutaArchivo, '[]')

        // Devolvemos nada
    }
}

module.exports = Contenedor

