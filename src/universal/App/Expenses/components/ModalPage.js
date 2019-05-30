import React from 'react';
import {
  Form, Select, Input, Button,Modal,InputNumber,DatePicker  
} from 'antd';
//import '../components/expenses.css';
import * as Expenses from '../../shared/services/Expenses'
const { TextArea } = Input;


class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     date: null,
     visible: false
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
        values.date=this.state.date;
        Expenses.postExpenses(values)
        .then((response) => {
         this.props.addHandle(response.data)
        })
        this.handleCancel();
      }
    });
  }
  datePic = (date, dateString) => {
    this.setState({date:dateString})
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
        <div >
      <Modal
          title="Add Expenses"
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
      <Form >
        <Form.Item
          label="Name"
          labelCol={{ span: 8 }}
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
          label="Expense Subject"
          labelCol={{ span: 8}}
          wrapperCol={{ span: 12}}
        >
          {getFieldDecorator('subject', {
            rules: [{ required: true, message: 'Please enter expense subject!' },
          ],
          })(
            <Input  />
          )}
        </Form.Item>
        <Form.Item
          label="Description"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Please enter payment type description!' }],
          })(
            <TextArea />
          )}
        </Form.Item>
        <Form.Item
          label="Expense Amount"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('amount', {
            rules: [{ required: true, message: 'Please enter expense amount!' },
          ],
          })(
            <InputNumber   style={{ width: 250}}/>
          )}
        </Form.Item>
        <Form.Item
          label="Expanse Date"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 12 }}
        >
         {getFieldDecorator('date', {
            rules: [{ required: true, message: 'Please enter expense date!' },
          ],
          })(
            <DatePicker onChange={this.datePic}  style={{ width: 250}}/>
          )}
         
        </Form.Item>
         </Form>
      </Modal>
      </div>
    );
  }
}

const ModalPage = Form.create({ name: 'ModalForm' })(ModalForm);
export default ModalPage;
