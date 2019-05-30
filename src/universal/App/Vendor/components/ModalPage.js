import React from 'react';
// import './ModalPage.css';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
import * as Vendors from '../../shared/services/Vendor'
const { TextArea } = Input;

class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
   
     }
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
    this.props.addHandle()
    
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      console.log(values)
      if (!err) {
        Vendors.postVendor(values)
        .then((response) => {
          console.log(response)
         this.props.addHandle(response.data)
        })
        this.handleCancel();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title="Add Vendor "
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          style={{top: 5 }}
        >
      <Form  >
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
            <Input  />
          )}
        </Form.Item>
         <Form.Item
          label="Address"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('address', {
            rules: [{ required: true, message: 'Please enter address!' }],
          })(
            <TextArea />
          )}
        </Form.Item>
        <Form.Item
          label="Pincode"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('pincode', {
            rules: [{ required: true, message: 'Please enter pincode!' },
                    { pattern : '[0-9]', message: 'please enter correct pincode' },
                    { max: 6, message: 'Pincode cannot be longer than 6 characters' }

          ],  
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Contact1"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('contact1', {
            rules: [{ required: true, message: 'Please enter contact  number!' },
                    { pattern : '[0-9]', message: 'Please enter correct contact number!' },
                    {max : 10 , message:'Contact cannot be longer than 10 characters'}
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Contact2"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('contact2', {
            rules: [{ required: true, message: 'Please enter contact number!' },
                    { pattern : '[0-9]', message: 'Please enter correct contact numbers!' },
                    {max : 10 , message:'Contact cannot be longer than 10 characters'}
          ],
          })(
            <Input />
          )}
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
        <Form.Item
          label="GSTN_No"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('gSTN_No', {
            rules: [{ required: true, message: 'Please enter GSTN_No!' },
                    { pattern:'[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}' , message: 'Please Enter Correct GST_No' }
          ],
          })(
            <Input/>
          )}
        </Form.Item>
        <Form.Item
          label="PAN_No"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('pAN_No', {
            rules: [{ required: true, message: 'Please enter PAN_No!' },
                    {pattern: '[A-Z]{5}[0-9]{4}[A-Z]{1}', message:'Please enter Correct PAN_No!'}
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