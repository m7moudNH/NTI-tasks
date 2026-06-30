let cart = require('../data/cart');


const calculateTotal = function(){
    return total = cart.reduce((sum, item) => sum + item.price, 0);
}

module.exports = calculateTotal;