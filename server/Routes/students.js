const router = require('express').Router();
let Student = require('../Model/Student.model');

router.route('/').get((req, res) => {
  Student.find()
    .then(students => res.json(students))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/register').post((req, res) => {
  const name = req.body.name;
  const roll = Number(req.body.roll);
  const email = req.body.email;
  const password = req.body.password;
  const assignment = "Not Submitted"

  const newStudent = new Student({
    name,
    roll,
    email,
    password,
    assignment
  });

  newStudent.save()
    .then(() => res.json('Student added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then(() => res.json('Student deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

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

router.route('/login/:p1?/:p2?').get((req, res) => {
  Student.find({email: req.params.p1 ,password: req.params.p2 })
  .then(student => res.json(student))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;