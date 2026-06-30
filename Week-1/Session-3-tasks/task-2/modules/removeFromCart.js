let cart = require('../data/cart');


const removeFromCart = function(id) {
    const index = cart.findIndex(element => element.id === id);
    if (index !== -1) {
        cart.splice(index, 1);
    }
};

module.exports = removeFromCart;