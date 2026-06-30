const addToCart = require('./modules/addToCart');
const removeFromCart = require('./modules/removeFromCart');
const calculateTotal = require('./modules/calculateTotal');
const listCart = require('./modules/listCart');

addToCart(3);
addToCart(1);

console.log("done adding");
listCart();


removeFromCart(1);
console.log("done removing");
listCart();


addToCart(5);
addToCart(6);
console.log("done adding");
listCart();

console.log(calculateTotal());

