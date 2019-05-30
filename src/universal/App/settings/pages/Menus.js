import React from 'react'
import * as NavMenus from '../../shared/services/Menus';
import * as Users from '../../shared/services/User';
import * as MenuAccess from '../../shared/services/MenuAccess';
import {
  Layout, Menu, Breadcrumb, Icon, Table, Input, Button, Popconfirm, Form,
} from 'antd';
import ModalAddMenu from '../components/ModalAddMenu';
import { Checkbox } from 'antd';
import { Select } from 'antd';
const Option = Select.Option;

const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
 render() {
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
                  
                  }
                <FormItem style={{ margin: 0 }}>
                  { getFieldDecorator(dataIndex, {
                      rules: [{ required: true, message: 'Please enter user type name!' },
                              { pattern: '[A-Za-z]', message: 'Please enter only characters!' }
                    ],
                    initialValue: record[dataIndex]
                    })(
                      <Input  />
                    )} 
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
 class MenuPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  dataSource: [],
                    editingid: '',
                    isAdd:false,
                    parentMenuId:null,
                    menuList:[],
                    userData:[],
                    userId:null,
                    menuId:[]
                 };
    this.columns = [
      {
        title: 'Menu Name',
        dataIndex: 'menuName',
        width: '20%',
        editable: true,
      },
      {
        title: 'Operation',
        dataIndex: 'operation',
        
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
                 
                  <a onClick={() => this.edit(record.id,record.parentMenuId)}>Edit </a>&nbsp;&nbsp;
                { record.subMenuList && !record.subMenuList.length > 0 &&
                <a onClick={() => this.delete(record.id)}>Delete</a> && 
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
      {
        title: 'Access',
        width: '20%',
        render: (text, record) => {
        return  <Checkbox onChange={(e)=>{this.onChange(e,record.id,text)}}/> ;
        
        }
      }
    ];
    this.subMenuList = [{
      title: 'Sub Menus',
      dataIndex: 'menuName',
      width: '20%',
      editable: true,
    },
      {
        title: '',
        dataIndex: 'operation',
      
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
                 
                  <a onClick={() => this.edit(record.id,record.parentMenuId)}>Edit </a>&nbsp;&nbsp;
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
      {
        title: '',
        width: '20%',
        render: (text, record) => {
        return  <Checkbox onChange={(e)=>{this.onChange(e,record.id,text)}}/> ;
        }
        },
    ];
  }
  onChange(e,id,text) {
    var menuList=this.state.menuList;
   console.log("record id",id);
    console.log(`checked = ${e.target.checked}`);
    if(e.target.checked) {
      menuList.push(
      {
        menuId:id,
        isAccess:1
      }
    )
    this.setState({menuList})
    }
    else {
        this.setState({ menuList: this.state.menuList.filter(item => item.menuId !== id) });

    }
   

  }
  componentDidMount = () => {
    var menuId=[];
   NavMenus.getMenu()
      .then((response) =>{
      this.setState({dataSource : response.data});
      })
      // this.setState({isAdd:false})
      Users.getUser().then((response) => {
        this.setState({userData : response.data});
      })
  }
  

  isEditing = record => record.id === this.state.editingid;

  cancel = () => {
    this.setState({ editingid: '' });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      row.parentMenuId=this.state.parentMenuId;
      if (!error) {
        console.log(("Row Data",row));
        NavMenus.putMenu(this.state.editingid,row)
        .then(() =>{
          this.componentDidMount();
          this.setState({ editingid: '' });
        })
      }
      else  {
        return;
      }
    //   const newData = [...this.state.dataSource];
    //   const index = newData.findIndex(item => id === item.id);
    //   if (index > -1) {
    //     const item = newData[index];
    //     newData.splice(index, 1, {
    //       ...item,
    //       ...row,
    //     });
     

    //     NavMenus.putMenu(this.state.editingid,row)
    //     .then(()=>{
    //       this.setState({ dataSource: newData, editingid: '' });
    //     })
    //   }
    //    else {
    //     newData.push(row);
    //     this.setState({ dataSource: newData, editingid: '' });
    //   }
    });
  }
  addHandle=(item)=>{
    if(item) {
       NavMenus.getMenu().then((response)=>{
       this.setState({
        dataSource: response.data
      });
    })
    }
   this.setState({isAdd:false})
  }

  add = (item) => {
   this.setState({isAdd:true})
    
  }

  edit(id,parentMenuId) {
    this.setState({ 
      editingid: id ,
      parentMenuId:parentMenuId
    });
    
  }

  delete(id) {
      const dataSource = [...this.state.dataSource];
      NavMenus.deleteMenu(id)
      .then(()=>{
        this.componentDidMount()
       // this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
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
  userAccess=(e) => {
    this.props.form.validateFields((err, values) => {
    values.menuList=this.state.menuList;
      MenuAccess.postMenuAccess(values).then((response) =>{
        console.log('response',response)
      })
      console.log(values);
    })
    // let data={};
    // data.userId=this.state.userId;
    // data.menuList=this.state.menuList

  }
  handleChange=(id)=> {
  this.setState({userId:id})
  }
  render() {
    console.log(this.state.menuId);
    
    var mainMenus=[];
    var hasSubMenus=[];
    this.state.dataSource.map((mainMenu) => {
      if(mainMenu.subMenuList)
      {
        hasSubMenus.push( 
        <SubMenu
          key={mainMenu.id}
          title={<span><Icon type="user" /><span>{mainMenu.menuName}</span></span>}
        >
          { mainMenu.subMenuList.length > 0 && mainMenu.subMenuList.map((item) => {
           return (
             <Menu.Item key={item.id}>
            {/* <Icon type="desktop" /> */}
             <span>{item.menuName}</span>
             </Menu.Item>
           );  
          })
          }
       
        </SubMenu>);
            } 
      else {
        mainMenus.push(
        <Menu.Item key={mainMenu.id}>
        {/* <Icon type="desktop" /> */}
        <span>{mainMenu.menuName}</span>
      </Menu.Item>
      );
      }
    })
     console.log(this.state.dataSource);
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
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });
    const subMenuList = this.subMenuList.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          dataIndex: col.dataIndex,
          title: col.title,
          editing: this.isEditing(record),
        }),
      };
    });

    var user=this.state.userData.map((item) => {
      return  <Option key={item.id} value={item.id}>{item.name}</Option> ;
    })
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
       <Form.Item
          label="User Name"
          labelCol={{ span: 5 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('userId', {
            rules: [{ required: false, message: 'Please select Parent Menu!' }],
            initialValue: this.state.userData.length > 0 ?  this.state.userData[0].id : null
          })(
            <Select
            showSearch
            style={{ width: 300}}
            placeholder="Select a product type"
            optionFilterProp="children"
             onSelect={(value)=>{this.handleChange(value)}}
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
             >
             {user}
            </Select>
          )}
          <Button type="primary" onClick={this.userAccess.bind(this)}
           disabled={!this.state.menuList.length > 0}>Save</Button>
        </Form.Item>
       
     
      <Button onClick={this.add} type="primary" style={{ marginBottom: 16 }}>
        Add Menu
      </Button>
      <Table
         rowKey={record => record.id}
        components={components}
        bordered
        dataSource={this.state.dataSource}
        columns={columns}
        expandedRowRender={record => record.subMenuList.length > 0 ? 
           <Table
              rowKey={record => record.id}
              components={components}
              bordered
              dataSource={record.subMenuList}
              columns={subMenuList}
              rowClassName="editable-row"
              pagination={false}
          /> : false}
        rowClassName="editable-row"
     
        pagination={false}
      />
     {this.condition()}
      </div>
    );
  }
  condition(){
       return <ModalAddMenu 
       isAdd={this.state.isAdd}
       addHandle={this.addHandle}
       menuItem={this.state.dataSource}
       />
  }
}
const Menus = Form.create({ name: 'MenuPage' })(MenuPage);
export default Menus;