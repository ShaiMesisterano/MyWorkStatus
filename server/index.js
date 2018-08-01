const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.urlencoded({extended: true}));

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const mongoURL = 'mongodb://127.0.0.1:27017/';

MongoClient.connect(mongoURL, (err, client) => {
    if (err) return console.log(err);

    const statuses = ['Working', 'OnVacation', 'LunchTime', 'BusinessTrip'];
    const defaultStatus = statuses[0];
    let usersDB = client.db('workStatus').collection('users');

    // Get All Users
    app.get('/users', (req, res) => {
        usersDB.find().toArray((err, users) => {
            res.setHeader('Content-Type', 'application/json');
            if (err) res.send({response: 'ERROR: ' + err});

            res.send(JSON.stringify(users));
        });
    });

    // Get A Single User
    app.get('/user', (req, res) => {
        const query = {'UserName': req.query.UserName};
        usersDB.findOne(query, (err, user) => {
            res.setHeader('Content-Type', 'application/json');
            if (err) res.send({response: 'ERROR: ' + err});

            res.send(JSON.stringify(user));
        });
    });

    // Add User
    app.get('/addUser', (req, res) => {
        const userName = req.query.UserName;
        const query = {'CurrentStatus': defaultStatus, 'UserName': userName};
        usersDB.insertOne(query, (err) => {
            res.setHeader('Content-Type', 'application/json');
            if (err) res.send('ERROR: ' + err);

            res.send({response: 'ok'});
        });
    });

    // Update User Status
    app.get('/updateStatus', (req, res) => {
        const currentStatus = req.query.CurrentStatus;
        res.setHeader('Content-Type', 'application/json');
        if (!statuses.includes(currentStatus)) {
            res.send('Error: Status is incorrect. Please set one of the following statuses: ' + statuses.join(', '));
        }

        const _id = req.query._id;
        const query = {'_id': ObjectID(_id)};
        let values = {$set: {'CurrentStatus': currentStatus}};

        usersDB.updateOne(query, values, (err) => {
            if (err) res.send('ERROR: ' + err);

            res.send({response: 'ok'});
        });
    });

    app.listen(8000, () => {
        console.log('listening on 8000');
    });
});