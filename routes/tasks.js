var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');
var db      = mongojs(' mongodb+srv://rajsubedi:subedi100@cluster0-fokjy.mongodb.net/test?retryWrites=true&w=majority', ['tasks']);
router.get('/tasks', function(res, req, next){
    db.tasks.find(function(err, tasks){
        if(err ){
            res.send(err);
        }
        res.json(tasks);
    });
});

module.exports = router;