const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "../data/courseData.json");

const getCourses = () => {
	return JSON.parse(fs.readFileSync(filePath, "utf-8"));
};

const saveCourses = (courses, callback) => {
	fs.writeFile(filePath, JSON.stringify(courses, null, 2), callback);
};

const getAllCourses = (req, res) => {
	const courses = getCourses();

	res.status(200).json({
		status: "success",
		count: courses.length,
		data: {
			courses,
		},
	});
};

const createCourse = (req, res) => {
	const courses = getCourses();

	const id = courses.length ? courses[courses.length - 1].id + 1 : 1;
	const course = { id, ...req.body };

	courses.push(course);

	saveCourses(courses, (err) => {
		if (err) {
			return res.status(500).json({
				status: "error",
				message: "Error during creating course",
			});
		}

		res.status(201).json({
			status: "success",
			message: "Course added",
			data: { course },
		});
	});
};

const getCourse = (req, res) => {
	const courses = getCourses();

	const id = +req.params.id;
	const course = courses.find((c) => c.id === id);

	if (!course) {
		return res.status(404).json({
			status: "error",
			message: "Course not found",
		});
	}

	res.status(200).json({
		status: "success",
		data: { course },
	});
};

const updateCourse = (req, res) => {
	const courses = getCourses();

	const id = +req.params.id;
	const course = courses.find((c) => c.id === id);

	if (!course) {
		return res.status(404).json({
			status: "error",
			message: "Course not found",
		});
	}

	Object.assign(course, req.body);

	saveCourses(courses, (err) => {
		if (err) {
			return res.status(500).json({
				status: "error",
				message: "Error during updating course",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Course updated",
			data: { course },
		});
	});
};

const deleteCourse = (req, res) => {
	const courses = getCourses();

	const id = +req.params.id;
	const index = courses.findIndex((c) => c.id === id);

	if (index === -1) {
		return res.status(404).json({
			status: "error",
			message: "Course not found",
		});
	}

	courses.splice(index, 1);

	saveCourses(courses, (err) => {
		if (err) {
			return res.status(500).json({
				status: "error",
				message: "Error during deleting course",
			});
		}

		res.status(200).json({
			status: "success",
			message: "Course deleted",
		});
	});
};

const getCourseById = (req, res) => {
	const courses = getCourses();

	const id = +req.params.id;
	const course = courses.find((c) => c.id === id);

	if (!course) {
		return res.status(404).json({
			status: "error",
			message: "Course not found",
		});
	}

	res.status(200).json({
		status: "success",
		data: {
			course,
		},
	});
};

module.exports = {
	getAllCourses,
	createCourse,
	getCourse,
	updateCourse,
	deleteCourse,
	getCourseById,
};
