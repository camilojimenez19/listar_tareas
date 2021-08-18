const inquirer = require('inquirer')
require('colors')

const preguntasMenu = [
    {
        type: 'list',
        name: 'option',
        message: 'Que deseas hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.yellow} Crear una tarea.`
            },
            {
                value: '2',
                name: `${'2.'.yellow} Listar tareas.`
            },
            {
                value: '3',
                name: `${'3.'.yellow} Listar tareas completadas.`
            },
            {
                value: '4',
                name: `${'4.'.yellow} Listar tareas pendientes.`
            },
            {
                value: '5',
                name: `${'5.'.yellow} Completar tarea.`
            },
            {
                value: '6',
                name: `${'6.'.yellow} Borrar una tarea.`
            },
            {
                value: '0',
                name: `${'0.'.yellow} Salir.`
            },
        ]
    }
]

const inquirerMenu = async () => {
    console.clear()
    console.log('=============================='.blue)
    console.log('    Seleccione una opción     ')
    console.log('==============================\n'.blue)

    const { option } = await inquirer.prompt(preguntasMenu)

    return option
}

const inquirerPausa = async () => {

    const msgPausa = [
        {
            type: 'input',
            name: 'pausa',
            message: `Presione ${'ENTER'.blue} para continuar`
        }
    ] 

    console.log('\n');
    await inquirer.prompt(msgPausa)
}

const leerInput = async ( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate( value ){
                if ( value.length === 0 )
                    return 'Por favor ingrese un valor'

                return true                    
            }
        }
    ]

    const { desc } = await inquirer.prompt(question)

    return desc

}

module.exports = {
    inquirerMenu,
    inquirerPausa,
    leerInput
}