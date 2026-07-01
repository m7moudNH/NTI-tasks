const readGrades = require("./read-grades");
const saveGrades = require("./save-grades");

async function addGrade(name, subject, grade) {
	if (
		!name ||
		!subject ||
		typeof grade !== "number" ||
		grade < 0 ||
		grade > 100
	) {
		console.log("invalid inputs");
		return;
	}
	try {
		const grades = await readGrades();
		let studentGrade = { studentName: name, subject, grade };
		grades.push(studentGrade);
		await saveGrades(grades);
	} catch (error) {
		console.log(error);
	}
}

module.exports = addGrade;
