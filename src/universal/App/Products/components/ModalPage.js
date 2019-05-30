import React from 'react';
import * as ProductTypes from '../../shared/services/ProductType'
import {
  Form, Select, Input, Button,Modal, 
} from 'antd';
import * as Products from '../../shared/services/Product'
import * as Measurments from '../../shared/services/Measurement'
const { TextArea } = Input;
const {Option,OptGroup } = Select;

class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     productList: [],
     measurmentMenu:[]
     }
  }
  componentDidMount = () => {
    ProductTypes.getProductType().then((response)=>{
      this.setState({productTypeMenu:response.data})
    })
    Measurments.getMeasurements().then((response)=>{
      this.setState({measurmentMenu:response.data})
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
      if (!err) {
        values.productTypeId=this.state.productTypeId;
        values.unit=this.state.unit;
        Products.postProduct(values)
        .then((response) => {
         this.props.addHandle(response.data)
        })
        this.handleCancel();
        console.log(values);
        
      }
    });
  }
   handleChange(value) {
    this.setState({productTypeId:value})
  }
  measurmentUnit(value) {
    this.setState({unit:value})
    
  }
 
  render() {
    var menu=null;
    var unitMenuTop=null;
    var unitMenuLower=null;
    
    if(this.state.productTypeMenu){
      menu=this.state.productTypeMenu.map((item,index)=> {
      return <Option value={item.id} key={index}>{item.productTypeName}</Option> ;
       })
    }
    if(this.state.measurmentMenu){
      unitMenuTop=this.state.measurmentMenu.map((item,index)=> {
      return <Option value={item.topMeasurementUnitName} key={index}>{item.topMeasurementUnitName}</Option> ;
       })
    }
    if(this.state.measurmentMenu){
      unitMenuLower=this.state.measurmentMenu.map((item,index)=> {
      return <Option value={item.lowMeasurementUnitName} key={index}>{item.lowMeasurementUnitName}</Option> ;
       })
    }
    
    const { getFieldDecorator } = this.props.form;
    return (
      <Modal
          title="Add Product"
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
          {getFieldDecorator('productName', {
            rules: [{ required: true, message: 'Please enter Product Name!' },
                    { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
          ],
          })(
            <Input  />
          )}
        </Form.Item>
        <Form.Item
          label="Product Type"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
          required
        >
         <Select
            showSearch
            style={{ width: 238}}
            placeholder="Select a product type"
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
          label="Actual Price"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('actualPrice', {
            rules: [{ required: true, message: 'Please enter Product Actual Price!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          label="Sale Price"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('salePrice', {
            rules: [{ required: true, message: 'Please enter Product Sale Price!' }],
          })(
            <Input />
          )}
        </Form.Item>
        <span className="row">
        <Form.Item
          label="Unit"
          labelCol={{ span: 12 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('unitValue', {
            rules: [{ required: true, message: 'Please enter net Measurment value!' },
                    { placeholder: true, message: 'Please enter net Measurment value!' },
          ],
          })(
            <Input />
          )}
        </Form.Item>
        <Form.Item
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 16 }} >
            <Select
            defaultValue={this.state.measurmentMenu.length > 0 && this.state.measurmentMenu[0].lowMeasurementUnitName}
            showSearch
            style={{ width: 120}}
            optionFilterProp="children"
            onChange={this.measurmentUnit.bind(this)}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
           <OptGroup label="Lower Unit">
            {unitMenuLower}
            </OptGroup>
            <OptGroup label="Higher Unit">
            {unitMenuTop}
            </OptGroup>
        </Select>
         
        </Form.Item>
        </span>
      </Form>
      </Modal>
    );
  }
}

const ModalPage = Form.create({ name: 'ModalPage' })(ModalForm);
export default ModalPage;