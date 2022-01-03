const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		// Do the magic
		let productsVisited = products.filter(product => product.category == 'visited')
		let productsInSale = products.filter(product => product.category == 'in-sale')

		res.render('index', {
			visiters: productsVisited,
			inSales: productsInSale,
			toThousand
		})
	},
	search: (req, res) => {
		// Do the magic

		let resultados = []
		products.forEach(product => {
			if (product.name.toLowerCase().includes(req.query.keywords.toLowerCase())){
				if(!resultados.includes(product)){
					resultados.push(product)
				}
			}
			if (product.category.toLowerCase().includes(req.query.keywords.toLowerCase())) {
				if(!resultados.includes(product)){
					resultados.push(product)
				}
			}
			if (product.description.toLowerCase().includes(req.query.keywords.toLowerCase()))  {
				if(!resultados.includes(product)){
					resultados.push(product)
				}
			}
		});
		res.render('results',{
			resultados,
			toThousand,
			keys:req.query.keywords
		})
	},
};

module.exports = controller;
