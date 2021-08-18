require('colors')
const { inquirerMenu, inquirerPausa, leerInput } = require('./helpers/inquirer')
const Tareas = require('./models/Tareas')

console.clear()

const main = async() => {
    
    let option = ''
    const tareas = new Tareas()

    do {
        // Mostrar el menu
        option = await inquirerMenu()

        switch (option) {
            case '1':

                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
                break;
            case '2':
                console.log(tareas._listado);
                
                break;
            case '3':
                
                break;
            case '4':
                
                break;
            case '5':
                
                break;
            case '6':
                
                break;
        
            default:
                break;
        }
        
        if (option !== '0') await inquirerPausa()

    } while (option !== '0');
}

main()