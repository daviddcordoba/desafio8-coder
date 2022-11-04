import knexLib from 'knex'

class ClienteSql {
  constructor(config) {
    this.knex = knexLib(config)
  }

  crearTabla(tabla) {
    return this.knex.schema.dropTableIfExists(tabla)
      .finally(() => {
        if (tabla == 'mensajes'){
        return this.knex.schema.createTable(tabla, table => {
          table.increments('id').primary();
          table.string('hora', 50);
          table.string('mail', 100);
          table.string('msg', 2000);
        })
      } else  if (tabla == 'productos'){
        return this.knex.schema.createTable(tabla, table => {
          table.increments('id').primary();
          table.string('nombre', 100);
          table.float('precio',12);
          table.string('url', 100);
        })        
      }

      })
  }

  insert(tabla,registro) {
    return this.knex(tabla).insert(registro)
  }

  listar(tabla) {
    return this.knex(tabla).select('*')
  }

  borrarMensajePorId(id) {
    return this.knex.from('mensajes').where('id', id).del()
  }


  close() {
    this.knex.destroy();
  }
}

export default ClienteSql