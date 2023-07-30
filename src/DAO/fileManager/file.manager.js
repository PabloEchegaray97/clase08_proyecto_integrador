import {promises} from 'fs'
class FileManager {
    constructor (filename = './db.json') {
        this.filename = filename
    }
    
    get = async() => {
        return promises.readFile(this.filename, 'utf-8').then (r => JSON.parse(r)).catch(e => {
            return []
        })
    }
    getById = async(id) => {
        const data = await this.get()
        return data.find(data => data.id == id )
    }

    set = async(data) => {
        
        return promises.writeFile(this.filename, JSON.stringify(data))
    }
    update = async(data) => {
        const list = await this.get()
        const idx = list.findIndex(a => a.id == data.id)
        list[idx] = data
        return promises.writeFile(this.filename, JSON.stringify(list))
    }
}

export default FileManager;