const fs = require('fs')

const archivo = './database/data.json'

const guardarDB = (data) => {
    fs.writeFileSync(archivo, JSON.stringify(data));    
}

const leerDB = () => {
    if(!fs.existsSync(archivo)) 
        return null

    const info = fs.readFileSync(archivo, { encoding: 'utf-8'})
    
    if (info === "")
        return []

    return JSON.parse(info)
}

module.exports = {
    guardarDB,
    leerDB
}