import React from 'react';
import * as ProductTypes from '../../shared/services/ProductType'
import ModalPage from './ModalPage'
import {
  Form, Select, Input, Button,Modal, 
} from 'antd';
import * as Products from '../../shared/services/Product'
const { TextArea } = Input;
const Option = Select.Option;

class AddProduct extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     productList: []
     }
  }
  componentDidMount = () => {
    ProductTypes.getProductType().then((response)=>{
      this.setState({productTypeMenu:response.data})
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
        values.productTypeId=this.state.productTypeId;
        Products.postProduct(values)
        this.handleCancel();
      }
    });
  }

  handleChange(value) {
    this.setState({productTypeId:value})
  }
 
  render() {
    var menu=null;
    if(this.state.productTypeMenu){
      menu=this.state.productTypeMenu.map((item,index)=> {
      return <Option value={item.id} key={index}>{item.productTypeName}</Option> ;
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
            rules: [{ required: true, message: 'Please enter actual price!' },
                      {pattern : '[0-9]', message: 'Please enter only number'}
          ],
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
            rules: [{ required: true, message: 'Please enter sale price!' },
                    {pattern : '[0-9]', message: 'Please enter only number'}
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

const ModalPage2 = Form.create({ name: 'ModalPage2' })(AddProduct);
export default ModalPage2;