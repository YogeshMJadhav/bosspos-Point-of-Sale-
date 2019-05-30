import React from 'react';
import {
  Form, Select, Input, Button,Modal
} from 'antd';
class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     }
  }
  componentWillReceiveProps = (nextProps) => {
   if(nextProps.charge || nextProps.discount) {
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
     this.props.chargeHandle();
     this.props.discountHandle();
  }
  chargeSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
         this.props.chargeHandle(values.charge)
         this.handleCancel();
      }
    });
  }
  discountSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
         this.props.discountHandle(values.charge)
         this.handleCancel();
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title={this.props.charge ? 'Add Charge' :'Add Discount'}
          okText={this.props.charge ? 'Charge' :'Discount'}
          visible={this.state.visible}
          onOk={this.props.charge ? this.chargeSubmit :this.discountSubmit}
          onCancel={this.handleCancel}
        >
      <Form >
        <Form.Item>
          {getFieldDecorator('charge', {
            rules: [{ required: false, message: 'Please enter Charge amount!' },
          ],
          })(
            <Input type="number"  />
          )}
        </Form.Item>
      </Form>
      </Modal>
    );
  }
}

const ChargeHandle = Form.create({ name: 'ModalPage' })(ModalForm);
export default ChargeHandle;