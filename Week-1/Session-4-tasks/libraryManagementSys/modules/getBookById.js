const readBooks = require("./read-books");

async function getBookById(id) {
	try {
		const books = await readBooks();
		const book = books.find((element) => element.id === Number(id));
		if (!book) {
			console.log("Not Found!!");
			return;
		}
		return book;
	} catch (error) {
		console.log(error);
	}
}

module.exports = getBookById;
