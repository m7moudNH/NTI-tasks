const http = require("http");

const readBooks = require("./modules/read-books");
const addBook = require("./modules/add-book");
const deleteBook = require("./modules/delete-book");
const updateBook = require("./modules/update-book");
const getBookById = require("./modules/getBookById");

const server = http.createServer(async (req, res) => {
	const { method, url } = req;

	res.setHeader("Content-Type", "application/json");

	if (method === "GET" && url === "/books") {
		try {
			const books = await readBooks();
			res.writeHead(200);
			return res.end(JSON.stringify(books));
		} catch (error) {
			res.writeHead(500);
			return res.end(JSON.stringify({ message: "Error reading books" }));
		}
	} else if (method === "GET" && url.startsWith("/books/")) {
		try {
			const id = Number(url.split("/")[2]);

			const book = await getBookById(id);

			if (!book) {
				res.writeHead(404);
				return res.end(JSON.stringify({ message: "Book not found" }));
			}

			res.writeHead(200);
			return res.end(JSON.stringify(book));
		} catch (error) {
			res.writeHead(500);
			return res.end(JSON.stringify({ message: "Server error" }));
		}
	} else if (method === "POST" && url === "/books") {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", async () => {
			try {
				const data = JSON.parse(body);

				await addBook(
					data.title,
					data.author,
					data.year,
					data.price,
					data.available,
				);

				res.writeHead(201);
				res.end(JSON.stringify({ message: "Book added successfully" }));
			} catch (error) {
				res.writeHead(400);
				res.end(JSON.stringify({ message: "Invalid JSON" }));
			}
		});
	} else if (method === "DELETE" && url.startsWith("/books/")) {
		try {
			const id = Number(url.split("/")[2]);

			const deleted = await deleteBook(id);

			if (!deleted) {
				res.writeHead(404);
				return res.end(JSON.stringify({ message: "Book not found" }));
			}

			res.writeHead(200);
			return res.end(JSON.stringify({ message: "Book deleted successfully" }));
		} catch (error) {
			res.writeHead(500);
			return res.end(JSON.stringify({ message: "Server error" }));
		}
	} else if (method === "PUT" && url.startsWith("/books/")) {
		let body = "";

		req.on("data", (chunk) => {
			body += chunk;
		});

		req.on("end", async () => {
			try {
				const id = Number(url.split("/")[2]);
				const data = JSON.parse(body);

				const updated = await updateBook(
					id,
					data.title,
					data.author,
					data.year,
					data.price,
					data.available,
				);

				if (!updated) {
					res.writeHead(404);
					return res.end(JSON.stringify({ message: "Book not found" }));
				}

				res.writeHead(200);
				res.end(JSON.stringify({ message: "Book updated successfully" }));
			} catch (error) {
				res.writeHead(400);
				res.end(JSON.stringify({ message: "Invalid JSON" }));
			}
		});
	} else {
		res.writeHead(404);
		res.end(JSON.stringify({ message: "Route not found" }));
	}
});

server.listen(3000, () => {
	console.log("server running ....");
});
