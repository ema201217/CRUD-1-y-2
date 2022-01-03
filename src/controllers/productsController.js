const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		// Do the magic

		res.render('products', {
			products,
			toThousand
		})
	},

	// Detail - Detail from one product
	detail: (req, res) => {
		// Do the magic
		product = products.find(product => +product.id === +req.params.id)
		res.render('detail', {
			product,
			toThousand
		})

	},

	// Create - Form to create
	create: (req, res) => {
		// Do the magic
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		// Do the magic
		let lastId = 1

		products.forEach(product => {
			if (product.id > lastId) {
				lastId = product.id
			}
		})

		let {
			name,
			price,
			discount,
			category,
			description
		} = req.body

		let newProduct = {
			id: lastId + 1,
			name,
			price,
			discount,
			category,
			description,
			image: req.file ? req.file.filename : "default-image.png"
		}

		products.push(newProduct)
		fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8")
		res.redirect(`/products#${newProduct.id}`)
	},

	// Update - Form to edit
	edit: (req, res) => {
		// Do the magic
		product = products.find(productx => productx.id == +req.params.id)
		res.render('product-edit-form', {
			product
		})
	},
	// Update - Method to update
	update: (req, res) => {
		// Do the magic
		let {
			name,
			price,
			discount,
			category,
			description
		} = req.body

		products.forEach(product => {
			if (product.id == +req.params.id) {
					product.id = product.id,
					product.name = name,
					product.price = price,
					product.discount = discount,
					product.category = category,
					product.description = description,
					product.image = req.file ? req.file.filename : product.image

					fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8")
					res.redirect(`/products#${product.id}`)
			}
		})
	},
	// Delete - Delete one product from DB
	destroy: (req, res) => {
		// Do the magic
		products.forEach(product => {
			if (+product.id === +req.params.id) {
				let ubicationProduct = products.indexOf(product)
				products.splice(ubicationProduct, 1)
			}
		})
		fs.writeFileSync(productsFilePath, JSON.stringify(products), "utf-8")
		res.redirect('/products')
	}
};
module.exports = controller;