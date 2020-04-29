const exp = require('express');

const Router = exp.Router();

const dbops = require('./dbconfig')


Router.post('/todo', dbops.addToDb);
Router.get('/getAll', dbops.fetchAllFromDb);

Router.post('/change', dbops.changeStatus);

Router.post('/deleteIt', dbops.deleteOne);

Router.post('/editIt', dbops.editTodo);

module.exports = Router;