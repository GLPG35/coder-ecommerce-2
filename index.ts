import { Product } from './types'
import * as fs from 'fs/promises'

class ProductManager {
	path: string

	constructor(path: string) {
		this.path = path
	}

	addProduct = async (code: string, title: string, price: number, thumbnail: string, description: string, stock: number) => {
		const products = await fs.readFile(this.path, { encoding: 'utf-8' })
		.then(data => JSON.parse(data))
		.catch(() => [])

		const exists = products.find((x: Product) => x.code == code)

		if (!exists) {
			const newProduct: Product = {
				id: products.length + 1,
				code,
				title,
				price,
				thumbnail,
				description,
				stock
			}

			products.push(newProduct)

			await fs.writeFile(this.path, JSON.stringify(products), { encoding: 'utf-8' })
		} else {
			console.error('This product already exists!')
		}
	}

	getProducts = async () => {
		const products = await fs.readFile(this.path, { encoding: 'utf-8' })
		.then(data => JSON.parse(data))
		.catch(() => [])

		console.log(products)
	}

	getProductById = async (id: number)=> {
		const products = await fs.readFile(this.path, { encoding: 'utf-8' })
		.then(data => JSON.parse(data))
		.catch(() => [])

		const findProduct = products.find((x: Product) => x.id == id)

		console.log(findProduct || 'Not Found')
	}

	updateProduct = async (id: number, code: string | undefined, title: string | undefined, price: number | undefined,
	thumbnail: string | undefined, description: string | undefined, stock: number | undefined): Promise<void | undefined> => {
		const products: Product[] | [] = await fs.readFile(this.path, { encoding: 'utf-8' })
		.then(data => JSON.parse(data))
		.catch(() => [])

		const findProduct: Product | undefined = products.find((x: Product) => x.id == id)

		if (!findProduct) {
			console.log('Not found')
			return undefined
		}

		const updatedProduct = {
			id,
			code: code || findProduct.code,
			title: title || findProduct.code,
			price: price || findProduct.price,
			thumbnail: thumbnail || findProduct.thumbnail,
			description: description || findProduct.description,
			stock: stock || findProduct.stock
		}

		const productIndex = products.findIndex((x: Product) => x.id == id)
		products.splice(productIndex, 1, updatedProduct)

		await fs.writeFile(this.path, JSON.stringify(products), { encoding: 'utf-8' })

		console.log('Product updated successfully')
	}

	deleteProduct = async (id: number): Promise<void | undefined> => {
		const products: Product[] | [] = await fs.readFile(this.path, { encoding: 'utf-8' })
		.then(data => JSON.parse(data))
		.catch(() => [])

		const findProduct = products.find((x: Product) => x.id == id)

		if (!findProduct) {
			console.log('Not found')
			return undefined
		}

		const productIndex = products.findIndex((x: Product) => x.id == id)
		products.splice(productIndex, 1)

		await fs.writeFile(this.path, JSON.stringify(products), { encoding: 'utf-8' })

		console.log('Product deleted successfully')
	}
}

// Se crea una nueva instancia del ProductManager con un array vacío
const products = new ProductManager('./products.json')

// Se llama al método getProducts() para comprobar que el array de productos es vacío
await products.getProducts()

// Se llama al método addProduct() ingresando datos de prueba
await products.addProduct('abc123', 'Producto Prueba', 200, 'Sin Imagen', 'Este es un producto prueba', 25)


// Se llama al método getProducts() para corroborar que el producto se haya agregado
await products.getProducts()

// Se llama al método addProduct() con los mismos datos de arriba para comprobar que da un error
await products.addProduct('abc123', 'Producto Prueba', 200, 'Sin Imagen', 'Este es un producto prueba', 25)

// Se llama al método getProductById() con el id 1 y 2 para que muestre el que encuentra y de error si no lo encuentra
await products.getProductById(1)
await products.getProductById(2)

// Se llama al método addProduct() nuevamente para agregar 2 productos de prueba, para que uno de ellos sea eliminado
await products.addProduct('2578', 'Producto Prueba 2', 500, 'Sin Imagen', 'Este es un producto prueba', 17)
await products.addProduct('358', 'Producto Prueba 3', 6700, 'Sin Imagen', 'Este es un producto prueba', 10)

// Se llama al método updateProduct() para actualizar el primer producto creado
await products.updateProduct(1, 'abc12345', 'Producto sumamente real', undefined, undefined, undefined, 30)

// Se llama al método deleteProduct() para eliminar el tercer producto
await products.deleteProduct(3)
