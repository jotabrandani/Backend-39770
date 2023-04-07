class ProductManager {

    
    constructor() {
        this.products = []
        this.codes = []
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


    addProduct ({ title, description, price, thumbnail, code, stock }) {
        
        let id = 0
    

      if (this.codes.includes(code)) {

         console.log('Error, El producto ingresado ya existe')}

         else {

        if (this.products.length===0) {
            id = 1
        } else {
            let lastproduct = this.products[this.products.length-1] //el ultimo elemento tiene indice igual a la longitud del array MENOS 1
            id = lastproduct.id + 1
        }
       
        let product = { title,description,price,thumbnail,code,stock,id }
        
        this.products.push(product)
    
        this.codes.push(code)
    }

}}


let nuevo = new ProductManager()

nuevo.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code:'abc123', stock: 25 })
nuevo.addProduct({ title: 'otro producto', description: 'Este es otro producto', price: 100, thumbnail: 'Sin imagen', code:'a12345', stock: 15 })
nuevo.addProduct({ title: 'producto prueba', description: 'Este es un producto prueba', price: 200, thumbnail: 'Sin imagen', code:'abc123', stock: 25 })
nuevo.addProduct({ title: 'producto x', description: 'Este es un producto', price: 20, thumbnail: 'Sin imagen', code:'xxx123', stock: 10 })


nuevo.getProducts()
nuevo.getProductById(2)

