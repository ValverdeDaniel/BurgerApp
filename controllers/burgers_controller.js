var express = require("express");

var router = express.Router();

//import the omdel burger.js to use its database functions

var burger = require("../models/burger.js");

//create our routes and set up logic within those routes where required

router.get("/", function(req, res) {
    burger.all(function(data) {
        var hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    });
});

router.post("/api/burgers", function(req, res) {
    burger.create([
        "burger_name", "devoured"
    ], [
        req.body.name, req.body.devoured
    ], function(result) {
        res.json({id: result.insertId});
    });
});

router.put("/api/burgers/:id", function(req, res) {
    var condition = "id = " + req.params.id;

    console.log("condition", condition);

    burger.update({
        devoured: req.body.devoured
    }, condition, function(result) {
        if (result.changedRows == 0) {
            //if no rows were changed then the id must not exist so error 404
            return res.status(404).end();
        } else {
            res.status(200).end();
        }
    });
});

//export routes for server.js to use

module.exports = router;