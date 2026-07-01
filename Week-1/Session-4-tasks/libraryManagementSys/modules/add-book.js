const readBooks = require("./read-books");
const saveBooks = require("./save-books");

async function addBook(title, author, price, available) {
	try {
		if (!title || !author || !price || available) {
			console.log("Invalid inputs");
			return;
		}
		const books = await readBooks();
		const id = books.length > 0 ? books[books.length - 1].id + 1 : 1;
		const book = {
			id,
			title,
			author,
			price,
			available,
		};

		books.push(book);
		await saveBooks(books);

		console.log("Book added successfully.");
	} catch (error) {
		console.log(error);
	}
}

module.exports = addBook;
