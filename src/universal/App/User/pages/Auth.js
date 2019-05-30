import React, { Component } from 'react'

class Auth extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            location: '',
        }
    }
    componentDidMount(){
     this.setState({location:location.pathname.replace(/^\/?|\/$/g, "")})
    }
    render() {
        console.log(this.props.location);
        let myComponent = "";
            switch(this.props.location) {
                case "":
                    myComponent = < Secret/>
                    break;
            }
        return( 
            <div>
                <p> This is the Authentication with Auth0</p>
                {myComponent}
            </div>
        );
    }
}
export default Auth;