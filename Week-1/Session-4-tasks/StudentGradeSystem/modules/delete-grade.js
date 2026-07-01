const readGrades = require("./read-grades");
const saveGrades = require("./save-grades");

async function deleteGrade(name, subject) {
	try {
		const grades = await readGrades();
		const index = grades.findIndex(
			(element) => element.studentName === name && element.subject === subject,
		);
		if (index === -1) {
			console.log("no such book");
			return;
		}

		grades.splice(index, 1);
		await saveGrades(grades);
	} catch (error) {
		console.log(error);
	}
}
module.exports = deleteGrade;
