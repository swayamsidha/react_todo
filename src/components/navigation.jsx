import React from 'react';
import { Nav } from 'react-bootstrap';

class Navigation extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            someString: ""
        }
    }


    render(){
        return(
            <Nav variant="pills" defaultActiveKey="/list">
                <Nav.Item>
                    <Nav.Link href="/home">Todo</Nav.Link>
                    
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link href="/add">Add New</Nav.Link>
                    
                </Nav.Item>
            </Nav>
            
        )
    }


}
export default Navigation;