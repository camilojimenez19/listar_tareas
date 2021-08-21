require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, inquirerPausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./models/Tareas')

console.clear()

const main = async() => {
    
    let option = ''
    const tareas = new Tareas()

    const tareasDB = leerDB()

    if(tareasDB){
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        // Mostrar el menu
        option = await inquirerMenu()


        switch (option) {
            case '1':

                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                break;
            case '2':
                tareas.listadoCompleto()               
                break;
            case '3':
                tareas.listarPendientesCompletadas()
                break;
            case '4':
                tareas.listarPendientesCompletadas(false)                    
                break;
            case '5':
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareasBorrar(tareas.listadoArr)

                if( id !== '0'){
                    const confirmarBorrado = await confirmar('Esta Seguro?')
                    
                    if (confirmarBorrado){
                        tareas.borrarTarea(id)
                        console.log('Tarea borrada correctamente');
    
                    }
                }
                break;   
        }

        guardarDB(tareas.listadoArr)
        
        if (option !== '0') await inquirerPausa()

    } while (option !== '0');
}

main()