import React from 'react';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
import * as Taxes from '../../shared/services/Tax'
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
        Taxes.postTax(values)
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
          title="Add Tax"
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
          {getFieldDecorator('taxName', {
            rules: [{ required: true, message: 'Please enter tax name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Value"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('taxValue', {
            rules: [{ required: true, message: 'Please enter tax value!' },
                    { pattern: '[0-9]', message: 'Please enter only number!' }
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
            rules: [{ required: true, message: 'Please enter tax description!' }],
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