import React from 'react';
import axios from 'axios';
import '../App.css';
import Octicon from 'react-octicon';
import {Button} from 'react-bootstrap';
import ApplyChange from './applyChange';
import DeleteIt from './deletePop';
import EditTodo from './editTodo';
class MainPage extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            tasks: [],
            serverError: '',
            fetchError: '',
            changeStatus: false,
            currentStatus: "",
            taskID: null,
            taskTitle:"",
            taskDesc: "",
            delStat: false,
            editStat: false
        }
        this.fetchLists = this.fetchLists.bind(this);
        this.editList = this.editList.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.markChange = this.markChange.bind(this);
        this.handleCloseStat = this.handleCloseStat.bind(this)
        
        this.handleCloseDelete = this.handleCloseDelete.bind(this)
        this.handleCloseEdit = this.handleCloseEdit.bind(this)
        
    }


    doDelete(id){
        this.setState({delStat: true})
        this.setState({taskID: id})
    }
    handleCloseDelete(event){
        this.setState({delStat: false})
    }
    doEdit(id, title, desc){
        console.log('editing....')
        this.setState({editStat: true})
        this.setState({taskDesc: desc})
        this.setState({taskTitle: title})
        this.setState({taskID: id})
    }
    handleCloseEdit(event){
        this.setState({editStat: false})
    }
    handleCloseStat(event){
        this.setState({changeStatus: false})
    }
    markChange(event){
        this.setState({changeStatus: true})
        this.setState({currentStatus: event.target.id})
        this.setState({taskID: event.target.name})
    }

    showMessage(){
        console.log('button clicked');
        
    }
    editList(event){
        
    }
    fetchLists(){
        axios.get('http://localhost:9000/getAll').then((resp)=>{
            console.table(resp.data)
            this.setState({tasks: resp.data.todo})
        }).catch((err)=>{
            if(err.response){
                this.setState({serverError: err.response.data.message})
            }else{
                this.setState({fetchError: err.message})
            }
        })
    }


    componentWillMount(){
        this.fetchLists()
    }
    render(){
        var toDoTasks = [] 
        this.state.tasks.forEach((jsonData)=>{
            toDoTasks.push(
                <div className="Todo">
                    <h4>{jsonData.title}</h4>
                    <p style={{fontSize:'13px'}}>{jsonData.body}</p>
                    <div>
                        <button type="button" className="btn btn-default btn-sm" onClick = {this.doEdit.bind(this, jsonData.id, jsonData.title, jsonData.body)}><Octicon name="pencil"/></button>
                        <button type="button" className="btn btn-default btn-sm" onClick={this.doDelete.bind(this, jsonData.id)}><Octicon name="trashcan"/></button>
                    </div>
                    <Button variant={jsonData.done === true ? "outline-success" : "outline-danger"} 
                    size="sm" style={{}} onClick={this.markChange} id = {jsonData.status}
                    name = {jsonData.id}>{jsonData.status}</Button>
                </div>
            )
        })
        return(
            <React.Fragment>
                {toDoTasks}
                <ApplyChange changeStatus = {this.state.changeStatus} 
                handleCloseStat = {this.handleCloseStat} 
                statusData = {this.state.currentStatus === 'pending'? 'completed': 'pending'}
                id = {this.state.taskID}
                reFetchData = {this.fetchLists}/>
                <DeleteIt deleteIt={this.state.delStat}
                deleteHide={this.handleCloseDelete}
                id = {this.state.taskID}
                reFetchData = {this.fetchLists}/>
                {this.state.editStat && <EditTodo editIT={this.state.editStat}
                editHide={this.handleCloseEdit}
                reFetchData = {this.fetchLists}
                todoBody = {this.state.taskDesc}
                todoTitle = {this.state.taskTitle}
                id={this.state.taskID}/>}
            </React.Fragment>
        )
    }
}
export default MainPage;