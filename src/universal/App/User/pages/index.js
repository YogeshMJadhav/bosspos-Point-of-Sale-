import React from 'react'
import * as Users from '../../shared/services/User';
import ModalPage from '../components/ModalPage';
import * as UserTypes from '../../shared/services/UserType'
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
const Option = Select.Option;
const { TextArea } = Input;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
var userTypeSelect=0;
var defaultUserTypeId=null;
class EditableCell extends React.Component {
  constructor(){
    super();
    this.state={
      userTypeMenu:[]
    }
UserTypes.getUserType().then(response => {
  this.setState({userTypeMenu:response.data})
})
  }
  handleChange(value, option) {
    userTypeSelect={name:value,id:option.props.id};
  }
  render() {
    var menu=null;
    if(this.state.userTypeMenu){
      menu=this.state.userTypeMenu.map((item,index)=> {
       return <Option value={item.userTypeName} id={item.id} key={index}>
                    {item.userTypeName}
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
                  <span hidden> {defaultUserTypeId=record['userTypeId']}]}</span>
                 }
               <FormItem style={{ margin: 0 }}>
                 {dataIndex=='name' ?  getFieldDecorator('name', {
                     rules: [{ required: true, message: 'Please enter user type name!' },
                             { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
                   ],
                   initialValue: record['name']
                   })(
                     <Input  />
                   ):null} 
               </FormItem>
               <FormItem style={{ margin: 0 }}>
                 {dataIndex=='address' ?  getFieldDecorator('address', {
                     rules: [{ required: true, message: 'Please enter address !' },
                             { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
                   ],
                   initialValue: record['address']
                   })(
                     <Input  />
                   ):null} 
               </FormItem>
               <FormItem style={{ margin: 0 }}>
                 {dataIndex=='userTypeName' ?  getFieldDecorator('userTypeName', {
                     rules: [{ required: false, message: 'Please enter userTypeName!' },
                   ],
                   initialValue: record['userTypeName']
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
                 {dataIndex=='email' ?  getFieldDecorator('email', {
                     rules: [{ required: true, message: 'Please enter user email!' },
                            //  { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
                   ],
                   initialValue: record['email']
                   })(
                     <Input type="email" />
                   ):null} 
               </FormItem>
               <FormItem style={{ margin: 0 }}>
                 {dataIndex=='contact1' ?  getFieldDecorator('contact1', {
                  rules: [{ required: true, message: 'Please enter Product Actual Price!' },
                           // { pattern: '[0-9]', message: 'Please enter Actual Price with only digit ' }
                 ],
                   initialValue: Number(record['contact1'])
                   })(
                     <Input type="number" />
                   ):null} 
               </FormItem>
               <FormItem style={{ margin: 0 }}>
                 {dataIndex=='contact2' ?  getFieldDecorator('contact2', {
                  rules: [{ required: true, message: 'Please enter Product Sale Price!' },
                         //  { pattern: '[0-9]', message: 'Please enter Sale Price with only digit ' }
                 ],
                   initialValue: record['contact2']
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
export default class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  data: [],
                    editingid: '',
                    isAdd:false,
                    alldata: [],
                    search: '' 
                 };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '10%',
        editable: true,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        width: '15%',
        editable: true,
      }, 
      {
        title: 'User Type',
        dataIndex: 'userTypeName',
        width: '10%',
        editable: true,
      }, 
      {
        title: 'Contact 1',
        dataIndex: 'contact1',
        width: '10%',
        editable: true,
      },  
      {
        title: 'Contact 2',
        dataIndex: 'contact2',
        width: '10%',
        editable: true,
      },
      {
        title: 'Email',
        dataIndex: 'email',
        width: '20%',
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
    Users.getUser()
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
      if(userTypeSelect){
        newRow.userTypeId=userTypeSelect.id
        newRow.userTypeName=userTypeSelect.name
        userTypeSelect=null;
      } else {
        newRow.userTypeId=defaultUserTypeId
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
        console.log(newRow)
        Users.putUser(this.state.editingid,newRow)

        .then(()=>{
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
      Users.getUserPerticuler(item.id).then((response)=>{
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
      Users.deleteUser(id)
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
           match.Name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
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
                globe_network
                </Uikon>
                User
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
      <Table rowKey='id'
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
       flag={this.state.isAdd}
       addHandle={this.addHandle}
       />
  }
}