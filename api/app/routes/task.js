module.exports = (server) => {

    server.get('/task', (req, res, next) => {
        server.app.controllers.task.get(server, req, res, next);
    });

    server.post('/task', (req, res, next) => {
        server.app.controllers.task.create(server, req, res, next);
    });

    server.del('/task/:id', (req, res, next) => {
        server.app.controllers.task.remove(server, req, res, next);
    });
};