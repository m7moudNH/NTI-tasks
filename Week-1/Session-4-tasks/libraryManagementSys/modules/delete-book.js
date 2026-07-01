const readBooks = require("./read-books");
const saveBooks = require("./save-books");

async function deleteBook(id) {
	try {
		const books = await readBooks();
		let index = books.findIndex((element) => element.id === id);
		if (index === -1) {
			console.log("no such book");
			return false;
		}

		books.splice(index, 1);
		await saveBooks(books);
		return true;
	} catch (error) {
		console.log(error);
	}
}
module.exports = deleteBook;
