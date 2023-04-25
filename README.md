script.js


- Se modificó la clase ProductManager para que gestione un conjunto de productos de un archivo

- La clase recibe como parámetro la ruta donde se creará el archivo y el constructor incluye esta ruta en la variable this.path

- addProduct agrega un producto al arreglo de productos del archivo.
  El id se agrega e incrementa automaticamente
  stock es opcional y si el usuario no lo envía se le asigna cero
  En caso de éxito se devuelve el id del producto
  En caso de error se devuelve un mensaje que dice: “addProduct: error”

- getProducts devuelve el arreglo con todos los productos guardados en el archivo y en caso de que no haya productos devuelve: “Not found”
  En caso de error devuelve el mensaje: “getProducts: error”

- getProductById recibe como parámetro el id del producto y devuelve un objeto con todas las propiedades del producto y en caso de no coincidir devuelve: “Not found”
  En caso de error devuelve el mensaje: “getProductById: error”

- updateProduct recibe un id y un objeto data con las propiedades a modificar del producto y en caso de no coincidir devuelve: “Not found”
  En caso de éxito devuelve el mensaje:  “updateProduct: done”
  En caso de error devuelve el mensaje: “updateProduct: error”

- deleteProduct recibe como parámetro el id del producto y borra el producto del archivo y en caso de no coincidir devuelve: “Not found”
  En caso de éxito devuelve un mensaje que dice:  “deleteProduct: done”
  En caso de error devuelve un mensaje que dice: “deleteProduct: error”
  
