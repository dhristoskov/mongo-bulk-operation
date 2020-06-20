const express = require('express');
//const { check } = require('express-validator');

const studentsControllers = require('../controllers/students-controller');
const router = express.Router();

router.post('/',
    // [
    //     check('firstName', 'Please enter a valid first name').not().isEmpty().trim(),
    //     check('lastName', 'Please enter a valid last name').not().isEmpty().trim(),
    //     check('age', 'Please enter a valid age').not().isEmpty().isNumeric().trim().isInt({gt: 0}),
    //     check('grade', 'Please enter a valid grade number').not().isEmpty().isNumeric().trim().isFloat({gte: 2})
    // ], 
studentsControllers.addData);
router.patch('/update', studentsControllers.updateData);

module.exports = router;