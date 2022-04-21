const express = require('express');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

const ModuleLoader = require('../module/ModuleLoader');
const TaskManager = require('../queue/TaskManager');

let moduleLoader = new ModuleLoader();
moduleLoader.loadAll();

let taskManager = new TaskManager(moduleLoader);

router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'API is running !'
    });
});

router.get('/task', (req, res) => {
    if(req.query.id) {
        let task = taskManager.getTask(req.query.id);

        if(task) {
            res.json({
                success: true,
                message: 'Task found !',
                data: task
            });
        } else {
            res.json({
                success: false,
                message: 'No task found',
            });
        }
    } else {
        res.json({
            success: false,
            message: 'No task found',
        });
    }
});

router.post('/task', (req, res) => {
    if(req.body.modules instanceof Array) {
        let id = uuidv4();
        taskManager.processTask(id, req.body.modules);

        res.json({
            success: true,
            message: 'Task created !',
            data: {
                id
            }
        });
    } else {
        res.json({
            success: false,
            message: 'Please provide a valid task'
        });
    }
});

module.exports = router;