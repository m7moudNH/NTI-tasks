const readGrades = require("./read-grades");
const saveGrades = require("./save-grades");

async function updateGrade(name, subject, grade) {
	try {
		const grades = await readGrades();
		const index = grades.findIndex(
			(element) => element.studentName === name && element.subject === subject,
		);
		if (index === -1) {
			console.log("grade Not Found!!");
			return;
		}
		grades[index].grade = grade;
		await saveGrades(grades);
	} catch (error) {
		console.log(error);
	}
}
module.exports = updateGrade;
