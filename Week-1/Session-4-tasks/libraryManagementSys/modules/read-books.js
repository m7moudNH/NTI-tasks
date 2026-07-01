const { readFile } = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/books.json");

async function readBooks() {
	try {
		const rawData = await readFile(filePath, "utf-8");
		const books = JSON.parse(rawData);
		return books;
	} catch (error) {
		console.log(error);
	}
}
module.exports = readBooks;
