const express = require("express");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const { parser } = require('json2csv');
const { Parser } = require('json2csv');
const fs = require("fs");
const {response} = require("express");


// This section will help you get a list of all the records.
recordRoutes.route("/record").get(function (req, res) {
    let db_connect = dbo.getDb("emf");
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you get a list of all the questions.
recordRoutes.route("/questionlist").get(function (req, res) {
    let db_connect = dbo.getDb("emf");
    db_connect
        .collection("question")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            console.log(result)
            res.json(result);
        });
});

// This section will help you get a single record by id
recordRoutes.route("/record/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect
        .collection("records")
        .findOne(myquery, function (err, result) {
            if (err) throw err;
            res.json(result);
        });
});

// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level,
    };
    db_connect.collection("records").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});

// This section will help you create a new record.
recordRoutes.route("/question/add").post(function (req, response) {
    let db_connect = dbo.getDb();

    console.log(req.body)
    // let myobj = {
    //
    //     req.body.name: req.body.ans,
    //     id: req.body.id,
    //     time: req.body.time,
    // };
    db_connect.collection("records").insertOne(req.body, function (err, res) {
        if (err) throw err;
        response.json(res);
    });
});



recordRoutes.route("/csv").get(function (req, res) {
    console.log("req.url.password:"+req.query.password)
    if (req.query.password !== "molab"){
        console.log("wrong password")
        return
    }
    let db_connect = dbo.getDb("emf");
    let fields = [38];
    fields[0] = "id"
    fields[1] = "time"
    for (let i = 2; i<39; i++){
        fields[i] = "mfq_"+(i-1)
    }
    db_connect
        .collection("records")
        .find({})
        .toArray(function (err, result) {
            if (err) throw err;
            // res.json(result);
            const json2csvParser = new Parser({fields, header: true });
            const csvData = json2csvParser.parse(result);
            console.log(result)
            // res.json(result)

            // res.send(result)
            fs.writeFile("answersFS.csv", csvData, function(error) {
                if (error) throw error;
                console.log("Write to answers.csv successfully!");
            });

            res.attachment('my.csv').send(csvData)

            // response.json(csvData)

        });
});

// This section will help you update a record by id.
recordRoutes.route("/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    let newvalues = {
        $set: {
            name: req.body.name,
            position: req.body.position,
            level: req.body.level,
        },
    };
    db_connect
        .collection("records")
        .updateOne(myquery, newvalues, function (err, res) {
            if (err) throw err;
            console.log("1 document updated");
            response.json(res);
        });
});

// This section will help you delete a record
recordRoutes.route("/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId( req.params.id )};
    db_connect.collection("records").deleteOne(myquery, function (err, obj) {
        if (err) throw err;
        console.log("1 document deleted");
        response.json(obj);
    });
});

module.exports = recordRoutes;