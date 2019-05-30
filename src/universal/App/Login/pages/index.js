import React from 'react'
import * as Registrations from '../../shared/services/Registration'; 
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';

import '../components/Login.css';
import { Alert } from 'antd';

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikDropdownItem,
  UikInput,
} from '@components'
import { NavLink } from 'react-router-dom';

class LoginForm extends React.Component {
  constructor(){
    super();
    this.state={
       registrationData:[],
       type:'',
       success:false,
       fail:false,

    }
    Registrations.getRegistration().then((response) => {
          this.setState({registrationData:response.data})
          console.log(response.data);
          
    })
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
       this.state.registrationData.map((item) => {
         if(item.userName==values.userName && item.password==values.password) {
              this.setState({success:true ,type:'success',fail:false})
         } else 
            if(this.state.registrationData[this.state.registrationData.length-1]==item) {
          this.setState({fail:true ,type:'error' ,success:false})
         }
         
       })
      }
    });
  }

  render() {
    console.log(this.state.registrationData);
    
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
      <UikTopBar >
      <UikTopBarSection>
        <UikTopBarTitle>
            <Uikon>
              help
            </Uikon>
            Login
        </UikTopBarTitle>
        </UikTopBarSection>
      <UikTopBarSection>
      <UikInput
          clear
          icon={ (
            <Uikon>
              search_left
            </Uikon>
          ) }
          placeholder="Search..."
          // onChange={this.searchEngine.bind(this)}
      />
      </UikTopBarSection>
      </UikTopBar>
    <div className="form-wrapper">
    {this.state.success ? <Alert
      message="Successfully logined"
      description="You can do your work."
      type={this.state.type}
      showIcon
    />:null}
    {this.state.fail ? <Alert
      message="Login Failed"
      description="Sorry invalid username or password .Try again"
      type={this.state.type}
      showIcon
    />:null}
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input type="email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true,
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <a className="login-form-forgot" href=" ">Forgot password</a>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <NavLink to="/login/registration">register now!</NavLink>
        </Form.Item>
      </Form>
      </div>
      </div>
    );
  }
}

const Login = Form.create({ name: 'Login' })(LoginForm);
export default Login;