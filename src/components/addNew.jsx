import React from 'react';
import axios from 'axios';
import {Button,  ButtonToolbar } from 'react-bootstrap';
import {withRouter} from 'react-router-dom'

class AddNew extends React.Component{
    constructor(props){
        super(props)
        this.state={
            title: "",
            descr: ""
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSave = this.handleSave.bind(this)
    }

    handleChange(event){
        let value = event.target.value
        this.setState({...this.state, [event.target.name]: value})
    }

    handleSave(event){

        let todoData = {
            todo_title: this.state.title,
            todo_body: this.state.descr
        }
        axios.post('http://localhost:9000/todo', todoData).then((resp) => {
            console.log(resp.status)
            this.props.history.push('/home')
        }).catch(err => {
            console.log(err.message);
            
        })
    }

    handleClear(event){
        this.setState({title: ""})
        this.setState({descr: ""})
    }
    

    render(){
        return(
            <div>
                    <form>
                <label>
                    <strong>
                        Title: 
                    </strong>
                    <br/>
                    <textarea name="title" id="title" cols="50" rows="1" style={{resize:"horizontal"}} value = {this.state.title} onChange={this.handleChange}></textarea>
                </label><br />
                <label>
                    <strong>
                        Description: 
                    </strong>
                    <br/>
                    <textarea name="descr" id="descr" cols="50" rows="5" style={{resize: "both"}} value = {this.state.descr} onChange={this.handleChange}></textarea>
                </label>
                <br/>
                <ButtonToolbar>
                    <Button variant="outline-primary" style={{marginLeft: '1%'}} onClick={this.handleSave}>
                        Save
                    </Button>
                    <Button variant="outline-secondary" style={{marginLeft: '1%'}} onClick={() => this.handleClear()}>
                        Clear
                    </Button>
                </ButtonToolbar>
            </form>
            </div>
            
        )
    }


}


export default withRouter(AddNew);