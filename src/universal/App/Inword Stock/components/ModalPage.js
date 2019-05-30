import React from 'react';
import {
  Form, Select, Input, Button,Modal,Label,Checkbox,Table,Popconfirm
} from 'antd';

import * as Products from '../../shared/services/Product';
import * as Inwards from '../../shared/services/InwardStock';
import * as Venders from '../../shared/services/Vendor';
import * as ShopDetail from '../../shared/services/ShopDetails';
import AddProduct from './AddProduct';
import AddBatch from './TaxBatch';
const { TextArea } = Input;
const Option = Select.Option;

class ModalForm extends React.Component {
  constructor(props) {
   super(props); 
   this.state = { 
     visible: false,
     isAdd: false,
     dataSet:null,
     insertedData: [],
     productQuantity: 0,
     productRate : 0,
     isAddBatch: false,
     batchName:''
     }

    this.columns = [{
      title: 'Product',
      dataIndex: 'productName',
      editable: true,
      width:"25%"
    }, 
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      width:"25%"
    },
    {
      title: 'Rate',
      dataIndex: 'rate',
      width:"25%"
    },
    {
      title: 'Total',
      dataIndex: 'totalPrice',
      width:"25%"
    },
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.insertedData.length > 0
          ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.productName)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) : null
      ),
    }];
     
    Products.getProduct().then((response)=>{
      this.setState({productMenu:response.data})
    })

    Venders.getVendor().then((response)=>{
      this.setState({venderMenus: response.data})
    })
    
    ShopDetail.getShopDetails().then((response)=>{
      this.setState({shopDetail : response.data})
    })

    Inwards.getInwardStock().then((response)=>{
      this.setState({inwardStock : response.data})
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
     this.setState({
      visible: false,
      isAdd: false
    });
    this.props.addHandle()
    this.props.form.resetFields();
  }
  addMoreProduct = () => {
    this.props.form.validateFields((err, values) => {
      if (!err) {
        values.productName = this.state.productName;
        if(this.state.insertedData){
          this.state.insertedData.push(values);
          this.props.form.resetFields();
        }
      }
    });
  }

  handleSubmitProduct = () =>{
    if(this.state.insertedData && this.state.insertedData.length > 0){
      let temp = {
        "vendorName" :this.state.dataSet.name,
        "GSTNo":this.state.dataSet.GST_NO,
        "batchName" : this.state.batchName,
        "produtList" : this.state.insertedData,
      };
      Inwards.postInwardstock(temp)
      .then((response)=>{
        this.props.addHandle(response.data)
        this.handleCancel();
        this.setState({insertedData:null})
        this.props.form.resetFields();
      })
    }
    else {
      this.props.form.validateFields((err, values) => {
        if (!err) {
      let temp = {
        "vendorName" :this.state.dataSet.name,
        "GSTNo":this.state.dataSet.GST_NO,
        "batchName" : this.state.batchName,
        "produtList" : this.state.insertedData,
      };
      Inwards.postInwardstock(temp)
      .then((response)=>{
        this.setState({insertedData: null});
        this.props.addHandle(response.data)
        this.handleCancel();
        this.setState({insertedData:null})
        this.props.form.resetFields();
      })
    }
    })
    }
  }

  handleBatchData = (values) =>{
    if(values.batchName){
      this.setState({batchName : values.batchName})  
    }
    else {
      this.setState({batchName : values.existingBatch}) 
    }
  }

  handleChange(value, option) {
    this.setState({productName:option.props.id})
    console.log(this.state.productName);
    
  }

  handleChange1(value,option) {
    this.setState({dataSet:option.props.id}) 
    this.setState({isAddBatch: true})
    // if(this.state.dataSet)
    // { 
    //   this.state.shopDetail && this.state.shopDetail.map((item)=>{
    //     if(this.state.dataSet.GST_NO == item.gst_No){
    //       this.state.inwardStock.map((item)=>{
    //         this.setState({csTaxId : item.id})
    //       })
    //     }
    //     else {
    //         this.state.inwardStock.map((item)=>{
    //           this.setState({ITaxId : item.id})
    //         })
    //       }
    //     })
    // }
  }

  add = (item) => {
    this.setState({isAdd: true})
   }
   
   handleQuantity(e){
     this.setState({productQuantity: e.target.value})
  }

   handleRate(e){
     this.setState({productRate: e.target.value})
   }

   handleDelete = (productName) => {
    const insertedData = [...this.state.insertedData];
    this.setState({ insertedData: insertedData.filter(item => item.productName !== productName) });
  }

  addHandle2 = ()=>{
    this.setState({isAdd: false});
    this.setState({isAddBatch: false});
  }

   render() {
    var productMenu = null;
    if(this.state.productMenu){
      productMenu=this.state.productMenu.map((item,index)=> {
      return <Option value={ item.id } id={item.productName} key={index}>{item.productName}</Option> ;
       })
    }

    var venderMenu=null;
    if(this.state.venderMenus){
      venderMenu=this.state.venderMenus.map((item,index)=> {
      return <Option value={item.id} id={{name: item.name, GST_NO: item.gSTN_No }}  key={index}>{item.name}</Option> ;
       })
    }
    
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <Modal
          title="Add Inward Stock " 
          okText="Save Product"
          // okText="Order Product"
          visible={this.state.visible}
          onOk={this.handleSubmitProduct}
          onCancel={this.handleCancel}
          style={{top: 5 }}
        >
        
      <Form>
      <Form.Item
          label="Vendor Name"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          required
        >
         <Select
            showSearch
            style={{ width: 238}}
            placeholder="Select Vender name"
            optionFilterProp="children"
            onChange={ this.batchHandle.bind(this) }
            onSelect={(value,option)=>{this.handleChange1(value,option)}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {venderMenu}
        </Select>
        </Form.Item>

        <div className="row" >
        <Form.Item
          label="Product Name"
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
          required
        >

         <Select
            showSearch
            style={{ width: 238}}
            placeholder="Select a product name"
            optionFilterProp="children"
            onChange={this.handleChange.bind(this)}
            // onSelect={(option, value) =>{ this.handleChange(option,value)}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {productMenu}
        </Select>
        </Form.Item>
        <a style={{color:'blue', marginLeft:'25px'}} onClick={this.add.bind(this)}> Add New Product</a>
        </div>

         <Form.Item
          label="Quantity"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
          
        >
          {getFieldDecorator('quantity', {
            rules: [{ required: true, message: 'Please enter quantity!' },
                   { pattern : '[0-9]', message: 'Please enter only number!' },
          ],
          })(
            <Input  onChange={this.handleQuantity.bind(this)}/>
          )}
        </Form.Item>
        <Form.Item
          label="Rate"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('rate', {
            rules: [{ required: true, message: 'Please enter price!' },
            { pattern : '[0-9]', message: 'Please enter only number!' },
          ],  
          })(
            <Input onChange={this.handleRate.bind(this)} />
          )}
        </Form.Item>
        <Form.Item
          label="Total Price"
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('totalPrice', {
          //   rules: [{ required: true, message: 'Please enter total price!' },
          //           { pattern : '[0-9]', message: 'Please enter only number!' },
          // ],
          initialValue:Number(this.state.productQuantity * this.state.productRate)
          })(
            <Input  />
          )}
        </Form.Item>
        <Button type="primary" style={{ 'marginLeft':'375px' }}onClick={this.addMoreProduct} >Add More</Button>
      </Form>
      <div>
      <Table
          columns={this.columns}
          dataSource = {this.state.insertedData}
          pagination={false}
          scroll ={{y:150}}
          size="small"
        />
      </div>      
      </Modal>
      {this.condition() }
      {this.batchHandle()} 
               </div>
    );
  }

  condition = () => {
          return <AddProduct 
          flag={this.state.isAdd}
          addHandle2={this.addHandle2}
          />
          
          }
  batchHandle = () => {
          return <AddBatch
          flag={this.state.isAddBatch}
          addHandle2={this.addHandle2}  
          handleBatchData={this.handleBatchData}
          />
  }        
  }

const ModalPage = Form.create({ name: 'ModalPage' })(ModalForm);
export default ModalPage;
