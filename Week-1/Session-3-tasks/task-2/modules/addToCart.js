let cart = require('../data/cart');
let products = require('../data/products');


const addproduct = function(id){
    cart.push(products.find((element) => element.id === id));
}

module.exports = addproduct;