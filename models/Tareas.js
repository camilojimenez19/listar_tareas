const Tarea = require("./Tarea")



class Tareas {

    _listado = {}

    constructor() {
        this._listado = {}        
    }

    /**
     * Funcion para crear una tarea
     * @param {string} desc 
     */

    crearTarea(desc = ''){

        const tarea = new Tarea(desc)        
        this._listado[tarea.id] = tarea
    }

    /**
     * Eliminamos una tarea del listado
     * @param {string} id 
     */
    borrarTarea( id = '' ){
        if( this._listado[id] ){
            delete this._listado[id]
        }
    }

    /**
     * Transformamos las tareas que estan en DB como array y las guardamos 
     * en la variable _listado como un objeto
     * @param {array} tareas 
     */
    cargarTareasFromArray( tareas=[] ) {

        tareas.forEach( tarea => {
            this._listado[tarea.id] = tarea
        })
    }

    /**
     * Imprimimos el listado de todas las tareas
     */
    listadoCompleto(){
        const tareas = this.listadoArr

        console.log();
        tareas.forEach((tarea, index) => { 
            const idx = `${index + 1}.`.green;
            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red

            console.log(`${idx} ${descripcion} :: ${estado}`);
        })
    }

    /**
     * Listamos las tareas completadas o pendientes
     * @param {bool} completadas 
     */
    listarPendientesCompletadas( completadas = true ){
        const tareas = this.listadoArr
        let contador = 1

        console.log();
        tareas.forEach( (tarea, index) => {
            const { descripcion, completadoEn } = tarea;
            const estado = ( completadoEn )
                                    ? 'Completada'.green
                                    : 'Pendiente'.red

            if (completadas) {
                if (completadoEn) {
                    console.log(`${(contador + '.').green} ${descripcion} :: ${completadoEn.green}`);
                    contador++
                }
            } else {
                if (!completadoEn) {
                    console.log(`${(contador + '.').green} ${descripcion} :: ${estado}`);
                    contador++
                }
            }

        })
    }

    toggleCompletadas( ids = [] ){
        ids.forEach( id => {
            const tarea = this._listado[id]

            if(!tarea.completadoEn){
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach( tarea => {

            if( !ids.includes(tarea.id) ){
                this._listado[tarea.id].completadoEn = null
            }
        })


    }

    /**
     * Obtener un array con las tareas
     */
    get listadoArr(){
        const listado = []

        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key])
        })

        return listado
    }


}

module.exports = Tareas