const moment = require('moment');

module.exports.create = (server, req, res, next) => {

    if (req.body._id) {
        server.app.models.task.update(req.body).then(response => {
            res.send(response);
        });
    } else {
        req.body.createDate = moment().format('DD/MM/YYYY');
        server.app.models.task.create(req.body).then(response => {
            res.send(response);
        });
    }
};

module.exports.get = (server, req, res, next) => {
    server.app.models.task.get().then((tasks) => {
        res.send(tasks);
    });
};

module.exports.remove = (server, req, res, next) => {
    server.app.models.task.remove(req.params.id).then(response => {
        res.send(response);
    });
};