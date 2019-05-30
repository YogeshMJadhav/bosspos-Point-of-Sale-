import React from 'react';
import {
  Form, Select, Input, Button,Modal, Radio
} from 'antd';
import * as Inwards from '../../shared/services/InwardStock';
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;

class AddBatch extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     batchName: [],
     newBatch:'',
     existingBatch:'',
     value: 'newBatch'
    }
  }

  componentDidMount = () => {
    Inwards.getInwardStock().then((response)=>{
      this.setState({batchName: response.data})
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

  handleCancel = () => {
     this.setState({
      visible: false,
    });
    this.props.form.resetFields();
    this.props.addHandle2();
  }

  handleSubmit = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(this.state.newBatch){
          values.batchName = this.state.newBatch;
        }
        else if(this.state.existingBatch) {
          values.existingBatch = this.state.existingBatch;
        }
        // values.productTypeId=this.state.productTypeId;
        // Products.postProduct(values)
        this.handleCancel();
        this.props.handleBatchData(values);
        this.setState({
          newBatch: null,
          existingBatch: null
        })
      }
    });
  }

  handleBatch = (e) => {
    this.setState({newBatch: e.target.value})
  }
 
  handleExistingBatch = (value,option) =>{
    this.setState({existingBatch: option.props.value})
  }

  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }

  newBatchHandle = () =>{
    const { getFieldDecorator } = this.props.form;

    if(this.state.value == 'newBatch'){
      return(
        <div>
          <Form.Item
            label="Name"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            style={{marginTop: 30}}
            >
            {getFieldDecorator('batchName', {
              rules: [{ required: true, message: 'Please enter batch name!' },
                      { pattern: '[A-Za-z]', message: 'Please enter only characters!'}],
            })(
            
            <Input style={{ width: 238}} onChange={(e)=>{this.handleBatch(e)}} placeholder="Create new batch"  />
            )}
          </Form.Item>
        </div>
      )
    }
  }
  
  existingBatchHandle = () =>{
    var Batch=null;
    if(this.state.batchName){
      Batch=this.state.batchName.map((item,index)=> {
      return <Option value={item.batchName} key={index}>{item.batchName}</Option> ;
       })
    }

    if(this.state.value == 'existingBatch'){
      return(
        <div> 
          <Form.Item
            label="Existing Batch"
            labelCol={{ span: 12 }}
            wrapperCol={{ span: 12 }}
            style={{marginTop: 30}}
            >
         <Select
            style={{marginTop: 30}}
            showSearch
            style={{ width: 238}}
            placeholder="Select Existing Batch"
            optionFilterProp="children"
            onSelect={(value,option)=>{this.handleExistingBatch(value,option)}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {Batch}

        </Select>
        </Form.Item>
        </div>
          
      )
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title="Manage Tax Batch"
          okText="save"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}

        >
        <RadioGroup onChange={this.onChange} value={this.state.value}>

          <Radio value={'newBatch'}>New Batch</Radio>
          <Radio value={'existingBatch'}>Existing Batch</Radio>

        {this.newBatchHandle()}
        {this.existingBatchHandle()}

       </RadioGroup>
      </Modal>
    );
  }
}

const ModalPage2 = Form.create({ name: 'ModalPage2' })(AddBatch);
export default ModalPage2;