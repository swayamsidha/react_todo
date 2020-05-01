const low = require('lowdb')
const fileSync = require('lowdb/adapters/FileSync');

const adapter = new fileSync('storage2.json');
const database = low(adapter);


var shortid = require('shortid')
database.defaults({todos: []}).write()

var dboperations = {}

let addDataToDB = async (request, response) => {
    let uuid = shortid.generate()
    console.log(uuid);
    await database.get('todos').push({
        id: uuid, 
        title: request.body.todo_title? request.body.todo_title : request.body.todo_body.substring(1, 6), 
        body: request.body.todo_body,
        done: false,
        status: 'pending'

    }).write()
}


let fetchAllFromDb = async (request, response) => {
    let todoLst = await database.get('todos').value();
    return todoLst;
}


let deleteOneFromDb = async (request, response) => {

    try {
        console.log(request.body)
        let res = await database.get('todos')
        .remove({id: request.body.id})
        .write()
        console.log(res)
    } catch (error) {
        throw error
    }
    
}

let editInDb = async (request, response) => {
    try {
        await database.get('todos')
        .find({id: request.body.id})
        .assign({
            title: request.body.todoTitle,
            body: request.body.todoBody
        }).write()
    } catch (error) {
        throw error
    }
}

let changeTaskStatus = async (request, response) => {
    let post = await database.get('todos').find({id: request.body.id}).value()
    console.log(post.done)
    await database.get('todos').find({
        id: request.body.id
    }).assign({
        status: request.body.newStatus,
        done: !post.done
    }).write()
}

dboperations.editTodo = (request, response) => {
    editInDb(request, response).then(() => {
        response.status(200).json({success: true, message: "successfully edited"})
    })
    .catch(err => {
        console.log(err.message)
        response.status(400).json({error: true, message: err.message})
    })
}
dboperations.addToDb = (request, response) => {
    addDataToDB(request, response).then(() => {
        response.status(200).json({signal: true, status: 'success'})
    }).catch(err => {
        response.status(400).json({signal: false, status: 'failed'})
    })
    
    
}

dboperations.fetchAllFromDb = (request, response) => {
    fetchAllFromDb(request, response).then((resLst)=> {

        response.status(200).json({todo: [...resLst]})
    }).catch(err => {
        response.status(400).send(err.message)
    })
}


dboperations.changeStatus = (request, response) => {
    changeTaskStatus(request, response).then(() => {
        response.status(200).json({signal: true, status: 'success'})
    }).catch(err => {
        response.status(400).json({signal: false, message: err.message})
    })
}


dboperations.deleteOne = (request, response) => {
    deleteOneFromDb(request, response).then(() => {
        response.status(200).json({signal: true, status: 'success'})
    }).catch(err => {
        response.status(400).json({signal: false, message: err.message})
    })
}


module.exports = dboperations;
