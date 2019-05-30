import React from 'react';
// import './ModalPage.css';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
import * as UserTypes from '../../shared/services/UserType';
import * as Users from '../../shared/services/User'

const { TextArea } = Input;
const Option = Select.Option;

class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     userTypeId:'',
     userTypeMenu:''
     }
  }
  componentDidMount = () => {
    UserTypes.getUserType().then((response)=>{
      this.setState({userTypeMenu:response.data})
    })
  }
  componentWillReceiveProps = (nextProps) => {
   if(nextProps.flag) {
     this.showModal();
   }
  }
   showModal = () => {
      this.setState({
        visible: true,
      });
  }
  handleCancel = (e) => {
     this.props.form.resetFields();
     this.setState({
      visible: false,
    }); 
    this.props.addHandle();
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      values.userTypeId=this.state.userTypeId;
      if (!err) {
        Users.postUser(values)
        .then((response) => {
         this.props.addHandle(response.data)
        })
        this.handleCancel();
      }
    });
  }

  handleChange(value) {
    this.setState({userTypeId:value})
  }
  render() {
    var menu=null;
    if(this.state.userTypeMenu){
      menu=this.state.userTypeMenu.map((item,index)=> {
      return <Option value={item.id} key={index}>{item.userTypeName}</Option> ;
       })
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title="Add User "
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          style={{top: 5 }}
        >
      <Form >
      <Form.Item
          label="Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please enter name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Address"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter  address!' }],
          })(
            <TextArea />
          )}
        </Form.Item>

       <Form.Item
          label="Contact1"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('contact1', {
            rules: [{ required: true, message: 'Please enter Contact Number!' },
                    { pattern : '[0-9]', message: 'Please enter Numbers!' },
                    {max : 10 , message:'contact cannot be longer than 10 characters'}
          ],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label="Contact2"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('contact2', {
            rules: [{ required: false, message: 'Please enter Contact Number!' },
                    { pattern : '[0-9]', message: 'Please enter Numbers!' },
                    {max : 10 , message:'contact cannot be longer than 10 characters'}
          ],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label="User Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          required
        >
         <Select
            required
            showSearch
            style={{ width: 238}}
            placeholder="Select a user type"
            optionFilterProp="children"
            onChange={this.handleChange.bind(this)}
            // onFocus={this.handleFocus.bind(this)}
            // onBlur={this.handleBlur.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {menu}
        </Select>
        </Form.Item>
        <Form.Item
          label="Email"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('email', {
            rules: [{ required: true, message: 'Please enter email!' },
                   { pattern:'[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$', message: 'Please enter valid  email!' },
          ],
          })(
            <Input />
          )}
        </Form.Item>
         </Form>
      </Modal>
    );
  }
}

const ModalPage = Form.create({ name: 'ModalPage' })(ModalForm);
export default ModalPage;