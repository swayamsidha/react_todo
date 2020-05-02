import React from 'react';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'

class ApplyChange extends React.Component{
    constructor(props){
        super(props);
        this.state = {



        }
        this.handleChangeStat = this.handleChangeStat.bind(this);
    }
    handleChangeStat(event){
        console.log(this.props.statusData)
        console.log(this.props.id)

        let reqData = {
            newStatus: this.props.statusData,
            id: this.props.id
        }
        axios.post('http://localhost:9000/change', reqData).then((resp) => {
            console.log(resp)
            this.props.reFetchData()
        }).catch(err => {
            console.log(err.message)
        })
        this.props.handleCloseStat()
    }

    render(){
        return(
            <Modal show={this.props.changeStatus} onHide={this.props.handleCloseStat} >
                    <Modal.Header closeButton>
                        <Modal.Title>Confirmation </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>are you sure you want to change status of the task?</Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick = {this.handleChangeStat}>
                        Yes
                    </Button>
                    <Button variant="secondry" onClick={this.props.handleCloseStat}>
                        No
                    </Button>
                    </Modal.Footer>
                </Modal>
        );
    }
}
export default ApplyChange;