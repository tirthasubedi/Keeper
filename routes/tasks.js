var express = require('express');
var router  = express.Router();
var mongojs = require('mongojs');
var db      = mongojs('mongodb+srv://rajsubedi:subedi100@cluster0-fokjy.mongodb.net/test?retryWrites=true&w=majority', ['tasks']);

// gettting all tasks
router.get('/tasks', function(req, res, next){
    db.tasks.find(function(err, tasks){
        if(err){
            console.log('raj here1');
            res.send(err);
        }
        res.json(tasks);
    });
});

// getting single task
router.get('/tasks:id', function(res, req, next){
    db.tasks.findOne({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// Save Task/data
router.post('/task', function(req, res, next){
    var task = req.body;
    if (!task.title || (task.isDone + '')){
        res.status(400);
        res.json({
            "error": "Bad Data"
            
        });
    } else {
        db.tasks.save(tasks, function(err, task){
            if (err){
                res.send(err);
            }
            res.json(task)
        });
    }
});

//delete task
router.delete('/tasks/:id', function(req, res, next){
    db.tasks.remove({_id: mongojs.ObjectId(req.params.id)}, function(err, task){
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// update task
router.put('/tasks/:id', function(req, res, next){
    var task = req.body;
    var updTask = {};
    if (task.isDone){
        updTask.isDone = taks.isDone;
    }
    if (task.title){
        updTask.title = task.title;
    }
    if (!updTask){
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectId(req.params.id)}, updTask, {}, function(err, task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });

    }
   
});


module.exports = router;







// mongodb+srv://rajsubedi:<password>@cluster0-fokjy.mongodb.net/test?retryWrites=true&w=majority

// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://rajsubedi:<password>@cluster0-fokjy.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

// var mongoose = require('mongoose');
// mongoose.connect();

