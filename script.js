const fs = require('fs')

class ProductManager {
    constructor(path) {
        this.products = []     //para guardar en la memoria todos los productos
        this.path = path    //para guardar en la memoria la ruta del archivo
        this.init(path)     //para iniciar la instancia y crear el archivo en caso de no existir o cargar la memoria en caso de existir productos
    }
    init(path) {
        //verifico si existe el archivo
        let file = fs.existsSync(path)
        //console.log(file)
        if (!file) {
            //si no existe lo creo
            fs.writeFileSync(path,'[]')
            console.log('file created at path: '+this.path)
            return 'file created at path: '+this.path
        } else {
            //si existe cargo los productos en la memoria del programa
            this.products = JSON.parse(fs.readFileSync(path,'UTF-8'))
            console.log('data recovered')
            return 'data recovered'
        }
    }
    async addProduct({ title, description, price, thumbnail, code, stock }) {
        stock = stock ?? 0
        try {
            //defino el objeto que necesito agregar al array
            let data = { title, description, price, thumbnail, code, stock }
            //si la memoria tiene productos
            if (this.products.length>0) {
                //busco el id del último elemento y le sumo 1
                let next_id = this.products[this.products.length-1].id+1
                //agrego la propiedad al objeto
                data.id = next_id
            } else {
                //en caso que no tenga: asigno el primer id
                data.id = 1
            }
            //agrego el objeto (usuario) a la memoria del programa
            this.products.push(data)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('id´s created product: '+data.id)
            return 'id´s user: '+data.id
        } catch(error) {
            console.log(error)
            return 'error: addProduct error'
        }
    }
    getProducts() {
        console.log(this.products)
        return this.products
    }

    getProductById(product_id) {
        let one = this.products.find(each=> each.id === product_id)
        if (one) {
            console.log(one)
            return one
        }
        console.log('not found')
        return null
    }
    
    async updateProduct(id,data) {
        //data es el objeto con las propiedades que necesito modificar del usuario
        try {
            //busco el usuario
            let one = this.getProductById(id)
            //itero para modificar la propiedad correspondiente
            for (let prop in data) {
                //console.log(prop)
                one[prop] = data[prop]
            }
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('updateProduct done: '+id)
            return 'updateProduct done '+id
        } catch(error) {
            console.log(error)
            return 'updateProduct error'
        }
    }
    async deleteProduct(id) {
        try {
            //saco el usuario
            this.products = this.products.filter(each=>each.id!==id)
            //console.log(this.products)
            //convierto a texto plano el array
            let data_json = JSON.stringify(this.products,null,2)
            //sobre-escribo el archivo
            await fs.promises.writeFile(this.path,data_json)
            console.log('deleteProduct done: '+id)
            return 'deleteProduct done: '+id
        } catch(error) {
            console.log(error)
            return 'deleteProduct error'
        }
    }
}

async function manager() {
    let manager = new ProductManager('./data/data.json')
    await manager.addProduct({ title: 'producto 1', description: 'Este es un producto prueba', price: 500, thumbnail: 'Sin imagen', code:'xxx-001', stock: 12 })
    await manager.addProduct({ title: 'producto 2', description: 'Este es otro producto', price: 85, thumbnail: 'Con imagen', code:'xxx-002', stock: 15 })
    await manager.addProduct({ title: 'producto 3', description: 'Este es un producto prueba', price: 300, thumbnail: 'Sin imagen', code:'xxx-003', stock: 43 })
    await manager.addProduct({ title: 'producto 4', description: 'Este es un producto', price: 40, thumbnail: 'Sin imagen', code:'xxx-004' })
    await manager.addProduct({ title: 'producto 5', description: 'Este es un producto', price: 20, thumbnail: 'Con imagen', code:'xxx-005', stock: 10 })
    await manager.addProduct({ title: 'producto 6', description: 'Este es un producto prueba', price: 50, thumbnail: 'Sin imagen', code:'xxx-006', stock: 3 })
    await manager.addProduct({ title: 'producto 7', description: 'Este es otro producto', price: 75, thumbnail: 'Sin imagen', code:'xxx-007', stock: 15 })
    await manager.addProduct({ title: 'producto 8', description: 'Este es un producto prueba', price: 100, thumbnail: 'Con imagen', code:'xxx-008', stock: 5 })
    await manager.addProduct({ title: 'producto 9', description: 'Este es un producto', price: 90, thumbnail: 'Sin imagen', code:'xxx-009'})
    await manager.addProduct({ title: 'producto 10', description: 'Este es un producto', price: 15, thumbnail: 'Sin imagen', code:'xxx-010', stock: 5 })
    await manager.getProductById(9)
    await manager.updateProduct(9,{ title:'otro producto' })
    await manager.deleteProduct(10)
    await manager.getProducts()
}
manager()