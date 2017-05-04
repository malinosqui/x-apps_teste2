module.exports = (server) => {
    const mongoose = require('mongoose');

    var Task = mongoose.model('Task', {
        description: String,
        status: String,
        createDate: Date
    });

    function get() {
        return Task.find().sort({
            'createDate': 'desc'
        });
    }

    function create(task, callback) {
        var _task = new Task(task);
        return _task.save();
    }

    function update(task) {
        var _task = new Task(task);
        return Task.findByIdAndUpdate(_task._id, _task);
    }

    function remove(id) {
        return Task.findByIdAndRemove(id);
    }

    return {
        get: get,
        create: create,
        update: update,
        remove: remove,
    };
}