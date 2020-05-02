import React from 'react';
import axios from 'axios';
import {Button,  ButtonToolbar , Modal} from 'react-bootstrap';


class EditTodo extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            title: "",
            descr: ""
        }
        this.handleEdit = this.handleEdit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }




    handleEdit(event){
        let todoTask = {
            id: this.props.id,
            todoTitle: this.state.title,
            todoBody: this.state.descr
        }

        axios.post('http://localhost:9000/editIt', todoTask).then(resp => {
            if(resp.data.success){
                window.alert('saved changes')
                this.props.reFetchData()
            }else{
                window.alert('some error occoured')
            }
        })
        .catch(err => {
            console.error(err.message)
        })
        this.props.editHide()
    }
    handleChange(event){
        console.log(event.target.value)
        let value = event.target.value;
        this.setState({...this.state, [event.target.name]: value})
    }


    componentDidMount(){
        console.log('mounted ....')
        this.setState({title: this.props.todoTitle})
        this.setState({descr: this.props.todoBody})
    }



    render() {
        return(
            <Modal show={this.props.editIT} onHide={this.props.editHide}> 
                <Modal.Header closeButton>
                <Modal.Title>edit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                        <label>
                            <strong>
                                Title: 
                            </strong>
                            <br/>
                            <textarea name="title" id="title" cols="30" rows="1" style={{resize:"horizontal"}} value = {this.state.title} onChange={this.handleChange}></textarea>
                        </label><br />
                        <label>
                            <strong>
                                Description: 
                            </strong>
                            <br/>
                            <textarea name="descr" id="descr" cols="30" rows="5" style={{resize: "both"}} value = {this.state.descr} onChange={this.handleChange}></textarea>
                        </label>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick = {this.handleEdit}>
                        Save
                    </Button>
                    <Button variant="secondry" onClick={this.props.editHide}>
                        Exit
                    </Button>
                    </Modal.Footer>
            </Modal>
        )
    }
}
export default EditTodo;