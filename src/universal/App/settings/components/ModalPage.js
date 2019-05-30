import React from 'react';
// import './ModalPage.css';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
import * as Measurements from '../../shared/services/Measurement'
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
      if (!err) {
        Measurements.postMeasurement(values)
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
          title="Add Measurement Unit"
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
          style={{top: 5 }}
        >
      <Form>
        <Form.Item
          label="Top Measurement Unit Name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('topMeasurementUnitName', {
            rules: [{ required: true, message: 'Please enter top measurement name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input  />
          )}
        </Form.Item>
       
        <Form.Item
          label="Top Measurement Unit Value"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('topMeasurementUnitValue', {
            rules: [{ required: true, message: 'Please enter top measurement value!' },
                    { pattern : '[0-9]', message: 'Please enter Numbers!' },
                    {max : 10 , message:'value cannot be longer than 10 characters'}
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Low Measurement Unit Name"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('lowMeasurementUnitName', {
            rules: [{ required: true, message: 'Please enter low measurement name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input  />
          )}
        </Form.Item>
        <Form.Item
          label="Low Measurement Unit Value"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('lowMeasurementUnitValue', {
            rules: [{ required: true, message: 'Please enter low measurement value!' },
                    { pattern : '[0-9]', message: 'Please enter Numbers!' },
                    {max : 10 , message:'value cannot be longer than 10 characters'}
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="description"
          labelCol={{ span: 10 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter description!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
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