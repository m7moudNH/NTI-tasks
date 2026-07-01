const readGrades = require("./modules/read-grades");
const addGrade = require("./modules/add-grade");
const deleteGrade = require("./modules/delete-grade");
const updateGrade = require("./modules/update-grade");

async function main() {
	try {
		console.log("=== Initial Grades ===");
		console.log(await readGrades());

		console.log("\n=== Adding Grade ===");
		await addGrade("mohammed", "science", 30);
		console.log(await readGrades());

		console.log("\n=== Updating Grade ===");
		await updateGrade("mohammed", "science", 100);
		console.log(await readGrades());

		console.log("\n=== Deleting Grade ===");
		await deleteGrade("mohammed", "science");
		console.log(await readGrades());
	} catch (error) {
		console.error(error);
	}
}

main();
