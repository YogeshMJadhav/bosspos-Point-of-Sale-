import React from 'react';
import {Input }from 'antd';
import * as Billings from '../../shared/services/BillingMaster'
import { Route, Switch, Redirect } from 'react-router-dom'
import '../components/ModalPage.css';
const Search = Input.Search;

 class  Billing extends React.Component {
   constructor(){
     super()
     this.state={
     flag:false,
     data:[],
     id:null,
     message:null
     }
   }
   componentDidMount = () => {
     Billings.getBilling().then((response) =>{
       this.setState({data:response.data})
     })
   }
   

 handleSearch=(value)=>{
  
   this.state.data.map((item) =>{
     if(item.id==value) {
       this.setState({ flag:true , 
                        id:value})
    } 
     if(this.state.data[this.state.data.length-1]==item ){
        this.setState({message:<h1><center>Please Enter 
          <a href=""> Valid</a> Bill Id</center></h1>})
      }
  })
  }
  render() {
    console.log(this.state.data)
    return(
      <div>
  <Search className="parent"
      placeholder="Please enter Bill Id only"
      onSearch={value => {
        this.handleSearch(value)
      }}
      enterButton
    />
  {  this.state.flag ?
      <Redirect to={{
        pathname: '/sell',
        state: {id:this.state.id  }
        }}
      /> :null
  }    
  {this.state.message}
    </div>
);


  }

}
export default Billing;