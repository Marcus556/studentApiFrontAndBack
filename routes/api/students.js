const express = require('express');
const router = express.Router();

//student model
const Student = require('../../models/Student');

// GET api/students
// gets all students
//GET api/students?name='nameToSearch'
//gets a specific student by name
router.get('/', (req, res) => {
  let query;
  if (req.query.name) {
    query = Student.findOne({
      'student.name': req.query.name
    })
  } else {
    query = Student.find();
  }
  query.exec()
    .then(students => res.send(students))
    .catch(err => console.log(err));
});

// GET api/students/id
// gets a single student
router.get('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => res.json(student))
});

// POST api/students
// adds a student
router.post('/', (req, res) => {
  const newStudent = new Student({
    student: {
      email: req.body.student.email,
      name: req.body.student.name,
      address: {
        street: req.body.student.address.street,
        zipCode: req.body.student.address.zipCode,
        city: req.body.student.address.city
      }
    }
  });
  newStudent.save()
    .then(student => res.json(student));
});

// DELETE api/students/:id
// deletes a student
// matches id in params with id in db, if a match is found it delets it, otherwise it sends a res sayiing it wasnt successful
router.delete('/:id', (req, res) => {
  Student.findById(req.params.id)
    .then(student => student.remove().then(() => res.status(200).json({ successfullyDeleted: true })))
    .catch(err => res.status(204).json({ successfullyDeleted: false }))
})

router.put('/:id', (req, res) => {
  Student.updateOne({ _id: req.params.id },
    {
      student: {
        email: req.body.student.email,
        name: req.body.student.name,
        address: {
          street: req.body.student.address.street,
          zipCode: req.body.student.address.zipCode,
          city: req.body.student.address.city
        }
      }
    },
    {
      new: true,
      upsert: true
    }
  ).then(status => {
    if (status.upserted) {
      res.status(201);
    } else if (status.nModified) {
      res.status(200);
    } else {
      res.status(204);
    }
    res.send();
  })
    .catch(err => console.log(err));
})

module.exports = router;