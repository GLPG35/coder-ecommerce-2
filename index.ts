import { Product } from './types'

class ProductManager {
	products: Product[]

	constructor(products: Product[]) {
		this.products = products
	}

	addProduct = (code: string, title: string, price: number, thumbnail: string, description: string, stock: number) => {
		const exists = this.products.find(x => x.code == code)

		if (!exists) {
			this.products.push({id: this.products.length + 1, code, title, price, thumbnail, description, stock})
		} else {
			console.error('This product already exists!')
		}
	}

	getProducts = () => this.products

	getProductById = (id: number): Product | string => {
		const findProduct = this.products.find(x => x.id == id)

		return findProduct || 'Not Found'
	}
}

// Se crea una nueva instancia del ProductManager con un array vacío
const products = new ProductManager([])

// Se llama al método getProducts() para comprobar que el array de productos es vacío
console.log(products.getProducts())

// Se llama al método addProduct() ingresando datos de prueba
products.addProduct('abc123', 'Producto Prueba', 200, 'Sin Imagen', 'Este es un producto prueba', 25)


// Se llama al método getProducts() para corroborar que el producto se haya agregado
console.log(products.getProducts())

// Se llama al método addProduct() con los mismos datos de arriba para comprobar que da un error
products.addProduct('abc123', 'Producto Prueba', 200, 'Sin Imagen', 'Este es un producto prueba', 25)

// Se llama al método getProductById() con el id 1 y 2 para que muestre el que encuentra y de error si no lo encuentra
console.log(products.getProductById(1))
console.log(products.getProductById(2))
