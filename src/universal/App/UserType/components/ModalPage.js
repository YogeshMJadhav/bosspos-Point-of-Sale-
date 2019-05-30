import React from 'react';
import './ModalPage.css';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
import * as UserTypes from '../../shared/services/UserType'
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
    this.props.addHandle();
  }
  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        UserTypes.postUserType(values)
        .then((response) => {
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
          title="Add User Type"
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
      <Form >
        <Form.Item
          label="Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('userTypeName', {
            rules: [{ required: true, message: 'Please enter user type name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input  />
          )}
        </Form.Item>
        <Form.Item
          label="Description"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter user type description!' }],
          })(
            <TextArea />
          )}
        </Form.Item>
      </Form>
      </Modal>
    );
  }
}

const ModalPage = Form.create({ name: 'ModalPage' })(ModalForm);
export default ModalPage;