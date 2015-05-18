/**
 *  API module
 *
 */
var debug = require('debug')('API');

var tests = require('../tests');
var hlp = require('./api-helpers').helpers();

var express = require('express');
var api = express.Router();

/**
 * API: test user
 *
 * @param service(string)  service for testing
 * @param name(string)  user name
 * @param pass(string)  user password
 */
api.post('/testUser/:service', function (req, res) {
    var service = req.params.service;
    if (!tests.isServiceExist(service)){
        res.send(" Service " + service + " isn't added.\n Please add it in resources.\n");
        return false;
    }
    var name = req.param('name', null),
        pass = req.param('pass', null);

    tests.testUser(service, name, pass);
    res.send("name: " + name + ", pass: " + pass);
});

/**
 * API: start new test
 *
 * @param service(string)  service for testing
 * @param name(string)  user name
 * @param pass(string)  user password
 * @param run(0 or 1)  is this test run immediately
 */
api.post('/startNewTest/:service', function (req, res) {
    var service = req.params.service;
    debug("##startNewTest for service " + service);
    if (!tests.isServiceExist(service)){
        res.send(" Service " + service + " isn't added.\n Please add it in resources.\n");
        return false;
    }
    var data = req.body;
    var run = hlp.haveToRun(data);

    var testId = tests.startNewTest(service, run, data);
    debug("##newTestStarted: " + testId);
    debug("data: " + JSON.stringify(data));

    //res.setHeader('Content');

    res.send("New Test Created.\nTest ID: " + testId + "\n");
});

/* start recurrent tests event */
api.post('/startTest/:id', function (req, res) {
    var id = req.params.id;
    var name = req.param('name', null),
        pass = req.param('pass', null);

    tests.startTest(id, {
        name: name,
        pass: pass
    });

    res.send("Tests are started: name: " + name + ", pass: " + pass + "\n Test ID: " + id + "\n");
});

/* stop recurrent tests event */
api.post('/stopTests', function (req, res) {
    var id = req.param('testId', null);

    tests.stopTest(id);
    res.send("Tests are stopped");
});


module.exports = api;