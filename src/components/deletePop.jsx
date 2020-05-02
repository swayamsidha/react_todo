import React from 'react';
import axios from 'axios';
import {Modal, Button} from 'react-bootstrap'



class DeleteIt extends React.Component{
    constructor(props){
        super(props);
        this.handleChangeStat = this.handleChangeStat.bind(this)
    }

    handleChangeStat(){
        let apiUrl = 'http://localhost:9000/deleteIt';
        let delData = {
            id: this.props.id
        }

        axios.post(apiUrl, delData).then(resp => {
            console.log(resp)
            this.props.reFetchData()
        }).catch(err => {
            console.log(err.message)
        })
        this.props.deleteHide()
    }



    render(){
        return(
            <Modal show={this.props.deleteIt} onHide={this.props.deleteHide}> 
                <Modal.Header closeButton>
                <Modal.Title>Confirmation </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    are you sure you want to delete ?
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick = {this.handleChangeStat}>
                        Yes
                    </Button>
                    <Button variant="secondry" onClick={this.props.deleteHide}>
                        No
                    </Button>
                    </Modal.Footer>
            </Modal>
        )
    }
}


export default DeleteIt;