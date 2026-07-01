const { readFile } = require("fs").promises;
const path = require("path");

const filePath = path.join(__dirname, "../data/grades.json");

async function readGrades() {
	try {
		const rawData = await readFile(filePath, "utf-8");
		const grades = JSON.parse(rawData);
		return grades;
	} catch (error) {
		console.log(error);
	}
}
module.exports = readGrades;
