const router = require('express').Router();
let Student = require('../Model/Student.model');

// Get all Students
router.route('/').get((req, res) => {
  Student.find({ userType: 'student' })
    .sort({ roll: 1 })
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get All Faculties
router.route('/faculties').get((req, res) => {
  Student.find({ userType: 'admin' })
    .sort({ roll: 1 })
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Registration
router.route('/register').post((req, res) => {
  const name = req.body.name;
  const roll = Number(req.body.roll);
  const email = req.body.email;
  const password = req.body.password;
  const assignment = "Not Submitted";
  const userType = req.body.userType;

  const newStudent = new Student({
    name,
    roll,
    email,
    password,
    assignment,
    userType
  });

  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Get Particular Record
router.route('/:id').get((req, res) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Delete Particular Record
router.route('/:id').delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update on Assignment Submission
router.route('/update/:id').post((req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.name = req.body.name;
      student.roll = Number(req.body.roll);
      student.email = req.body.email;
      student.password = req.body.password;
      student.assignment = "Submitted";
      student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

// Login Get
router.route('/login/:p1?/:p2?').get((req, res) => {
  Student.find({ email: req.params.p1, password: req.params.p2 })
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

// Update Record
router.route('/edit/:id').put((req, res) => {
  Student.findById(req.params.id)
    .then(student => {
      student.name = req.body.name;
      student.roll = Number(req.body.roll);
      student.save()
        .then(() => res.json('Student updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;