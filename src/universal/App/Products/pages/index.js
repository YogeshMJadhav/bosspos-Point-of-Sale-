import React from 'react';
import * as Products from '../../shared/services/Product';
import * as productTypes from '../../shared/services/ProductType'; 
import ModalPage from '../components/ModalPage';
import {
  Table, Input,Button, InputNumber, Popconfirm, Form,Select
} from 'antd';


import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikDropdownItem,
  UikInput,
} from '@components'
const { TextArea } = Input;
const Option = Select.Option;

const FormItem = Form.Item;
const EditableContext = React.createContext();
const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form} >
    <tr key={index} {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
var productTypeSelect=0;
var defaultProductTypeId=null;
class EditableCell extends React.Component {
  constructor(){
    super();
    this.state={
      productTypeMenu:[],
      // productTypeId:null
    }
    productTypes.getProductType().then((response) => {
      this.setState({productTypeMenu:response.data})
    }) 
  
  }
  handleChange(value, option) {
    productTypeSelect={name:value,id:option.props.id};
  }
 render() {
  var menu=null;
  if(this.state.productTypeMenu){
    menu=this.state.productTypeMenu.map((item,index)=> {
     return <Option value={item.productTypeName} id={item.id} key={index}>
                  {item.productTypeName}
             </Option> ;
     })
  }
    const {
      editing,
      dataIndex,
      title,
      inputType,
      record,
      index,
      ...restProps
    } = this.props;
    return (
      <EditableContext.Consumer>
        {(form) => {
          const { getFieldDecorator } = form;
          return (
            <td {...restProps}>
              {editing ? (
                <span>
                  {
                   <span hidden> {defaultProductTypeId=record['productTypeId']}]}</span>
                  }
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='productName' ?  getFieldDecorator('productName', {
                      rules: [{ required: true, message: 'Please enter user type name!' },
                              { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
                    ],
                    initialValue: record['productName']
                    })(
                      <Input  />
                    ):null} 
                </FormItem>
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='productTypeName' ?  getFieldDecorator('productTypeName', {
                      rules: [{ required: false, message: 'Please enter description!' },
                    ],
                    initialValue: record['productTypeName']
                    })(
                      <Select 
                      showSearch
                       style={{ width: 150}}
                       //placeholder="Select a product type"
                      optionFilterProp="children"
                      onSelect={(value, option) => {this.handleChange(value, option)
                      }}
                      //  onFocus={this.handleFocus.bind(this)}
                      // onBlur={this.handleBlur.bind(this)}
                      filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                    >
                          {menu}
                  </Select>
                    ):null} 
                </FormItem>
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='actualPrice' ?  getFieldDecorator('actualPrice', {
                   rules: [{ required: true, message: 'Please enter Product Actual Price!' },
                            // { pattern: '[0-9]', message: 'Please enter Actual Price with only digit ' }
                  ],
                    initialValue: Number(record['actualPrice'])
                    })(
                      <Input type="number" />
                    ):null} 
                </FormItem>
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='salePrice' ?  getFieldDecorator('salePrice', {
                   rules: [{ required: true, message: 'Please enter Product Sale Price!' },
                          //  { pattern: '[0-9]', message: 'Please enter Sale Price with only digit ' }
                  ],
                    initialValue: record['salePrice']
                    })(
                      <Input  type="number"/>
                    ):null} 
                </FormItem>
                </span>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
export default class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  data: [],
                    editingid: '',
                    isAdd:false,
                    alldata: [],
                    search: '' ,
                    // productTypeId:null
                    
                 };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'productName',
        width: '20%',
        editable: true,
      },  
      {
        title: 'Product Type',
        dataIndex: 'productTypeName',
        width: '15%',
        editable: true,
      },
      {
        title: 'Actual Price',
        dataIndex: 'actualPrice',
        width: '15%',
        editable: true,
      },
      {
        title: 'salePrice',
        dataIndex: 'salePrice',
        width: '15%',
        editable: true,
      }, 
      {
        title: '',
        dataIndex: 'operation',
        width: '20%',
        render: (text, record) => {
          const editable = this.isEditing(record);
          return (
            <div>
              {editable ? (
                <span>
                  <EditableContext.Consumer>
                    {form => (
                      <a
                        href="javascript:;"
                        onClick={() => this.save(form, record.id)}
                        style={{ marginRight: 8 }}
                      >
                        Save
                      </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                    title="Sure to cancel?"
                    onConfirm={() => this.cancel(record.id)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
              ) : (
                <span>
                 
                  <a onClick={() => this.edit(record.id)}>Edit </a>&nbsp;&nbsp;
                {<a onClick={() => this.delete(record.id)}>Delete</a> && 
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.delete(record.id)}>
                      <a href="javascript:;">Delete</a>
                   </Popconfirm>
                   }
                </span>
              )}
            </div>
          );
        },
      },
    ];
  }

  componentDidMount = () => {
    Products.getProductList()
      .then((response) =>{
      this.setState({data : response.data});
      this.setState({alldata : response.data});
      })
      this.setState({isAdd:false})
      
  }
  

  isEditing = record => record.id === this.state.editingid;

  cancel = () => {
    this.setState({ editingid: '' });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      
      let newRow=row;
      if(productTypeSelect){
        newRow.productTypeId=productTypeSelect.id
        newRow.productTypeName=productTypeSelect.name
        productTypeSelect=null;
      } else {
        newRow.productTypeId=defaultProductTypeId
        console.log(defaultProductTypeId);
        
      }
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        Products.putProduct(this.state.editingid,newRow)
        .then((response)=>{
          this.setState({ data: newData, editingid: '' });
        })
      } else {
        newData.push(row);
        this.setState({ data: newData, editingid: '' });
      }
    });
  }
  addHandle=(item)=>{
    const {  data } = this.state;
    if(item){
       Products.getProductPerticuler(item.id).then((response)=>{
      this.setState({
        data: [...data, response.data],
      });
    }) 
    }
  this.setState({isAdd:false})
  }

  add = (item) => {
   this.setState({isAdd:true})
    
  }

  edit(id) {
    this.setState({ editingid: id });
     this.setState({isAdd:false})
    
  }

  delete(id) {
      this.setState({isAdd:false})
      const data = [...this.state.data];
      Products.deleteProduct(id)
      .then(()=>{
        this.setState({ data: data.filter(item => item.id !== id) });
      })
  }
 
  handleSave = (row) => {
    const newData = [...this.state.data];
    const id = newData.findIndex(item => row.id === item.id);
    const item = newData[id];
    newData.splice(id, 1, {
      ...item,
      ...row,
    });
    this.setState({ data: newData });
  }

  searchEngine(event) {
    if(this.state.data.length > 0){
    const searched=this.state.alldata.filter((match) =>{
    return (
           match.productName.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
         ) 
           })
            this.setState({search:event.target.value})
            this.setState({data:searched})
  }
  else {
      alert ('No Data Found')
      this.setState({data:this.state.alldata});
  }
  }
  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };

    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          inputType: col.dataIndex === 'Pincode'  ? 'number' : 'text',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    return (
      <div> 
        <UikTopBar >
          <UikTopBarSection>
            <UikTopBarTitle>
                <Uikon>
                  help
                </Uikon>
                Product
            </UikTopBarTitle>
            </UikTopBarSection>
          <UikTopBarSection>
          <UikInput
              clear
              icon={ (
                <Uikon>
                  search_left
                </Uikon>
              ) }
              placeholder="Search..."
              onChange={this.searchEngine.bind(this)}

          />
          </UikTopBarSection>
        </UikTopBar>
      
      <Button onClick={this.add} type="primary" style={{ marginBottom: 16 }}>
        Add
      </Button>
      <Table rowKey="id"
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        rowClassName="editable-row"
      />
     {this.condition()}
      </div>
    );
  }
  condition(){
       return <ModalPage 
       data= {this.state.data}
       flag={this.state.isAdd}
       addHandle={this.addHandle}
       />
  }
}