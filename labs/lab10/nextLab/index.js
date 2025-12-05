// Express Initialisation
import express from "express";
import sequelize from "./sequelize.js";

import University from "./models/university.js";
import Student from "./models/student.js";
import Course from "./models/course.js";

const app = express();
const port = 3000;

// Express middleware
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

// Define relationships between entities
University.hasMany(Student);
University.hasMany(Course);
Student.belongsToMany(Course, { through: "enrollments" });
Course.belongsToMany(Student, { through: "enrollments" });

// Kickstart the Express aplication
app.listen(port, () => {
  console.log("The server is running on http://localhost:" + port);
});

// Create a middleware to handle 500 status errors.
app.use((err, req, res, next) => {
  console.error("[ERROR]:" + err);
  res.status(500).json({ message: "500 - Server Error" });
});

/**
 * Create a special GET endpoint so that when it is called it will
 * sync our database with the models.
 */
app.get("/create", async (req, res, next) => {
  try {
    await sequelize.sync({ force: true });
    res.status(201).json({ message: "Database created with the models." });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all the universities from the database.
 */
app.get("/universities", async (req, res, next) => {
  try {
    const universities = await University.findAll();
    res.status(200).json(universities);
  } catch (err) {
    next(err);
  }
});

/**
 * POST a new university to the database.
 */
app.post("/university", async (req, res, next) => {
  try {
    await University.create(req.body);
    res.status(201).json({ message: "University Created!" });
  } catch (err) {
    next(err);
  }
});

/**
 * GET all students.
 */
app.get("/students", async (req, res, next) => {
  try {
    const students = await Student.findAll();
    res.status(200).json(students);
  } catch (err) {
    next(err);
  }
});

app
  // GET all the students from a university using include.
  .get("/universities/:universityId/students", async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId, {
        include: [Student],
      });

      if (university) {
        res.status(200).json(university.students);
      } else {
        res.status(404).json({ message: "404 - University Not Found!" });
      }
    } catch (error) {
      next(error);
    }
  })
  // POST a new student into a university.
  .post("/universities/:universityId/students", async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);

      if (university) {
        const student = new Student(req.body);

        student.universityId = university.id;
        await student.save();

        res.status(201).json({ message: "Student created!" });
      } else {
        res.status(404).json({ message: "404 - University Not Found" });
      }
    } catch (error) {
      next(error);
    }
  });

app
  // GET implementați metoda get pentru obținerea unui anumit copil al unui părinte.
  .get(
    "/universities/:universityId/students/:studentId",
    async (req, res, next) => {
      try {
        const student = await Student.findOne({
          where: {
            id: req.params.studentId,
            universityId: req.params.universityId,
          },
        });

        if (!student) {
          res.status(404).json({ message: "Student not found" });
        } else {
          res.status(200).json(student);
        }
      } catch (error) {
        next(error);
      }
    }
  )
  // PUT in order to update a student from a university.
  .put(
    "/universities/:universityId/students/:studentId",
    async (req, res, next) => {
      try {
        const university = await University.findByPk(req.params.universityId);
        if (university) {
          const stundents = await university.getStudents({
            id: req.params.studentId,
          });
          const student = stundents.shift();
          if (student) {
            student.studentFullName = req.body.fullName;
            student.studentStatus = req.body.status;
            await student.save();
            res.status(202).json({ message: "Student updated!" });
          } else {
            res.status(404).json({ message: "404 - Student Not Found!" });
          }
        } else {
          res.status(404).json({ message: "404 - University Not Found!" });
        }
      } catch (error) {
        next(error);
      }
    }
  )
  // DELETE implementați ștergerea unei entități copil.
  .delete(
    "/universities/:universityId/students/:studentId",
    async (req, res, next) => {
      try {
        const university = await University.findByPk(req.params.universityId);
        if (!university)
          res.status(404).json({ message: "University not found!" });

        const students = await university.getStudents({
          where: { id: req.params.studentId },
        });
        const student = students.at(0);

        if (!student) res.status(404).json({ message: "Student not found!" });

        await student.destroy();
        res.status(202).json({ message: "Student deleted!" });
      } catch (error) {
        next(error);
      }
    }
  );

/**
 * GET the list of courses.
 */
app.get(
  "/universities/:universityId/courses",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses();
        if (courses.length > 0) {
          response.json(courses);
        } else {
          response.sendStatus(204);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET a course by id.
 */
app.get(
  "/university/:universityId/courses/:courseId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (course) {
          response.json(course);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST a new course.
 */
app.post(
  "/universities/:universityId/courses",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const course = await Course.create(request.body);
        university.addCourse(course);
        await university.save();
        response.status(201).location(course.id).send();
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * PUT to update a course.
 */
app.put(
  "/universities/:universityId/courses/:courseId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (course) {
          await course.update(request.body);
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE a course.
 */
app.delete(
  "/universities/:universityId/courses/:courseId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (course) {
          await course.destroy();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET student enrollements to courses.
 */
app.get(
  "/universities/:universityId/students/:studentId/enrollements",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents({
          id: request.params.studentId,
        });
        const student = students.shift();
        if (student) {
          const courses = await student.getCourses({ attributes: ["id"] });
          if (courses.length > 0) {
            response.json(courses);
          } else {
            response.sendStatus(204);
          }
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST to enroll a student to a course.
 */
app.post(
  "/universities/:universityId/students/:studentId/enrollements/:courseId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents({
          id: request.params.studentId,
        });
        const student = students.shift();
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (student && course) {
          student.addCourse(course);
          student.save();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE student enrollement to a course.
 */
app.delete(
  "/universities/:universityId/students/:studentId/enrollements/:courseId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const students = await university.getStudents({
          id: request.params.studentId,
        });
        const student = students.shift();
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (student && course) {
          student.removeFromCourse(course);
          student.save();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET the list of enrolled students to a course.
 */
app.get(
  "/universities/:universityId/courses/:courseId/enrollements",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        if (course) {
          const students = await course.getStudents({ attributes: ["id"] });
          if (students.length > 0) {
            response.json(students);
          } else {
            response.sendStatus(204);
          }
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * POST to enroll a student to a course.
 */
app.post(
  "/universities/:universityId/courses/:courseId/enrollements/:studentId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        const students = await university.getStudents({
          id: request.params.studentId,
        });
        const student = students.shift();
        if (course && student) {
          course.addStudent(student);
          course.save();
          response.sendStatus(204);
        } else {
          response.sendStatus(400);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * DELETE student enrollement to a course.
 */
app.delete(
  "/universities/:universityId/courses/:courseId/enrollements/:studentId",
  async (request, response, next) => {
    try {
      const university = await University.findByPk(request.params.universityId);
      if (university) {
        const courses = await university.getCourses({
          id: request.params.courseId,
        });
        const course = courses.shift();
        const students = await university.getStudents({
          id: request.params.studentId,
        });
        const student = students.shift();
        if (student && course) {
          course.removeStudent(student);
          course.save();
          response.sendStatus(204);
        } else {
          response.sendStatus(404);
        }
      } else {
        response.sendStatus(404);
      }
    } catch (error) {
      next(error);
    }
  }
);

/**
 * GET student enrollements to courses.
 */
app.get(
  "/universities/:universityId/students/:studentId/enrollements",
  async (req, res, next) => {
    try {
      const university = await University.findByPk(req.params.universityId);
      if (!university) {
        return res.status(404).json({ message: "University not found!" });
      }

      const students = await university.getStudents({
        where: { id: req.params.studentId },
      });
      const student = students[0];

      if (!student) {
        return res.status(404).json({ message: "Student not found!" });
      }

      const courses = await student.getCourses();

      if (courses.length > 0) {
        res.status(200).json(courses);
      } else {
        res.sendStatus(204);
      }
    } catch (error) {
      next(error);
    }
  }
);

app.post('/', async (request, response, next) => {
  try {
    const registry = {};
    for (let u of request.body) {
      const university = await University.create(u);
      for (let s of u.students) {
        const student = await Student.create(s);
        registry[s.key] = student;
        university.addStudent(student);
      }
      for (let c of u.courses) {
        const course = await Course.create(c);
        registry[c.key] = course;
        university.addCourse(course);
      }
      for (let e of u.enrollements) {
        registry[e.courseKey].addStudent(registry[e.studentKey]);
        await registry[e.courseKey].save();
      }
      await university.save();
    }
    response.sendStatus(204);
  } catch (error) {
    next(error);
  }
});

app.get('/', async (req, res, next) => {
  try {
    const result = [];

    for (let u of await University.findAll()) {
      const university = {
        name: u.universityName,
        students: [],
        courses: [],
        enrollements: []
      };

      for (let c of await u.getCourses()) {
        university.courses.push({
          key: c.id,
          name: c.name
        });

        for (let s of await c.getStudents()) {
          university.enrollements.push({
            courseKey: c.id,
            studentKey: s.id
          });
        }
      }
      
      for (let s of await u.getStudents()) {
        university.students.push({
          key: s.id,
          firstName: s.firstName,
          lastName: s.lastName,
          status: s.studentStatus
        });
      }

      result.push(university);
    }

    result.length > 0 ? res.status(200).json(result) : res.sendStatus(204);

  } catch (error) {
    next(error);
  }
});