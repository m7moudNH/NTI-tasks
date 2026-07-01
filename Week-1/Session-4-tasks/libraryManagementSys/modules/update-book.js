const readBooks = require("./read-books");
const saveBooks = require("./save-books");

async function updateBook(id, price) {
	try {
		const books = await readBooks();
		const index = books.findIndex((element) => element.id === id);
		if (index === -1) {
			console.log("book Not Found!!");
			return;
		}
		books[index].price = price;
		await saveBooks(books);
	} catch (error) {
		console.log(error);
	}
}
module.exports = updateBook;
