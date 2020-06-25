const express = require('express');
const fs = require('fs');

const Student = require('../models/student');

const addData = async ( req, res ) => {
    let file;
    let fileName;
    let studentsCounter = 0;

    const studentsArr = []
     
    if(req.files){      
        file = req.files.file;
        fileName = file.name;
        await file.mv('./resources/'+ fileName, (err) => {
            if(err){
                res.send(err)
            }
        });
    }

    //Read uploaded file 
    fs.readFile(`./resources/${fileName}`, (err, data) => {
        if(err) {
            throw err;
        }
        //Split entry by new line and by comma after
        const array = data.toString().split("\n").map(item => item.trim());
        for(i in array) {
            const line = array[i].split(',').map(e => e.trim());
            const [ fname, lname, age, grade ] = line;

            const student = new Student ({
                firstName: fname,
                lastName: lname,
                age: age,
                grade: grade,
                result: ''
            });    
            studentsArr.push(student);
        }
        
        try{
            const bulk = Student.collection.initializeOrderedBulkOp();
            studentsCounter = studentsArr.length;

            studentsArr.forEach((el) => {
                bulk.insert(el);
                studentsCounter--

                //Useing if we have more then 1000 entries
                // if(studentsCounter % 1000 === 0){
                //     bulk.execute()
                //     bulk = Student.collection.initializeOrderedBulkOp();
                // }
                if(studentsCounter === 0){
                    bulk.execute();
                }
            });
            res.json({ students: studentsArr.map(student => student.toObject({ getters: true })) });
        }catch(err){
            console.error(err.message);
            res.status(500).send('Server Error!');
        }
    });
}

//Bulk update
const updateData = async ( req, res ) => {
    const { minGrade, firstName } = req.body; 
    try{
        const bulk = Student.collection.initializeOrderedBulkOp();
        bulk.find({grade: {$lte: minGrade}}).upsert().update({$set: {result: 'Poor'}})
        bulk.find({grade: {$gt: minGrade}}).upsert().update({$set: {result: 'Excellent'}})
        bulk.find({firstName: firstName}).remove()
        bulk.execute();
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server Error!');
    }
    res.status(200).json('Data updated')
}

exports.addData = addData;
exports.updateData = updateData;