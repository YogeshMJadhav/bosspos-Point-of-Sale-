import React from 'react'
import * as Registrations from '../../shared/services/Registration'
import {
  Form, Icon, Input, Button, Checkbox,
} from 'antd';
import { Alert } from 'antd';
import '../components/Registration.css';

import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikDropdownItem,
  UikInput,
} from '@components'
import { NavLink } from 'react-router-dom';



class RegistrationForm extends React.Component {
  constructor() {
    super();
    this.state = {
      confirmDirty: false,
      isExist:null,
      dataSource:[],
      nameExit:true,
      isNew:false
    };
  }
  componentDidMount = () => {
    let data=[];
    Registrations.getRegistration().then((response) => {
      response.data.map((item) => {
        data.push(item.userName)
      })
    })
    this.setState({dataSource:data})
  }
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
     if(!this.state.dataSource.includes(values.userName)) {
        Registrations.postRegistration(values).then(() => {
        this.setState({isExist:<Alert
          message="Registration successfully"
          description="Click Login now to continue"
          type="success"
          showIcon
        />})
        this.props.form.resetFields();
        this.state.dataSource.push(values.userName)
      })
     }
     else {
      this.setState({isExist:<Alert
        message="Registration Failed"
        description="User Name Already taken"
        type="error"
        showIcon
      />})
     }
      } 
      
     
    });
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback("Those passwords didn't match. Try again !");
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  render() {
    // console.log(this.state.dataSource);
    
    const { getFieldDecorator } = this.props.form;
    return (
    <div>
      <UikTopBar >
      <UikTopBarSection>
        <UikTopBarTitle>
            <Uikon>
              help
            </Uikon>
            Registration
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
    {/* {this.state.isNew && <Alert
      message="Registration already exit"
      description="Click Login now to continue"
      type="error"
      showIcon
    />} */}
    {this.state.isExist}
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item 
          label="Name"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your name!' },
                    { pattern: '[a-zA-Z]', message: 'Please enter only character!' }],
          })(
            <Input placeholder="Enter your name" />
          )}
        </Form.Item>
        <Form.Item 
          label="Contact"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('contact', {
            rules: [{ required: true, message: 'Please input your contact number!' },
                    { pattern: '[0-9]', message: 'Please enter only number!' }],
          })(
            <Input  placeholder="Enter your contact number" />
          )}
        </Form.Item>
        <Form.Item 
          label="User Name"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('userName', {
            rules: [{ required: true, message: 'Please input your username!' },
                ],
          })(
            <Input type="email" placeholder="Enter your email id" />
          )}
        </Form.Item>
        <Form.Item
          label="Password"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="password" placeholder="Enter your password" />
          )}
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}>
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: 'Please confirm your password!',
            }, {
              validator: this.compareToFirstPassword,
            }],
          })(
            <Input type="password" onBlur={this.handleConfirmBlur} placeholder="Confirm your password" />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Register
          </Button>
          &nbsp;&nbsp;&nbsp;&nbsp;Or <NavLink to="/login">Login now!</NavLink>
        </Form.Item>
      </Form>
      </div>
      </div>
    );
  }
}

const Registration = Form.create({ name: 'RegistrationForm' })(RegistrationForm);
export default Registration;