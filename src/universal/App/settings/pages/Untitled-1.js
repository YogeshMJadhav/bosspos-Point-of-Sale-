import React from 'react';
import * as NavMenus from '../../shared/services/Menus';  
import {
  Layout, Menu, Breadcrumb, Icon, Table, Input, Button, Popconfirm, Form,
} from 'antd';
import ModalAddMenu from '../components/ModalAddMenu';
const {
  Header, Content, Footer, Sider,
} = Layout;
const SubMenu = Menu.SubMenu;

  class Menus extends React.Component {
    constructor(){
      super();
       this.state = {
      collapsed: false,
      menuItem:[],
      menuName:'Sub Menu',
      isAdd:false,
      editingid:null
    }
    this.columns = [{
      title: 'Menu Name',
      dataIndex: 'menuName',
      width: '30%',
      editable: true,
    },
     {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.menuItem.length >= 1 && record.subMenuList.length === 0
          ? (
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
          ) :  null
      ),
    }];
    this.subMenuItem = [{
      title: 'Sub Menus',
      dataIndex: 'menuName',
      width: '30%',
      editable: true,
    },
     {
      title: '',
      dataIndex: 'operation',
      render: (text, record) => (
        this.state.menuItem.length >= 1
          ? (
            <span>
            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
              <a href="javascript:;">Delete</a>
            </Popconfirm>
         </span> 
         ) : null
          
      ),
    }];

    }
    onCollapse = (collapsed) => {
      console.log(collapsed);
      this.setState({ collapsed });
    }
  componentDidMount = () => {
     NavMenus.getMenu().then((response) => {
      this.setState({menuItem:response.data})
      })
  
  }
  handleDelete = (id) => {
    NavMenus.deleteMenu(id).then(() =>{
       const dataSource = [...this.state.menuItem];
       this.setState({ menuItem: dataSource.filter(item => item.id !== id) });
    })
   
  }
  handleAdd = (id) => {
    this.setState({isAdd:false})
    NavMenus.getMenu().then((response) => {
      this.setState({menuItem:response.data})
      })
}
  add=()=>{
    this.setState({isAdd:true})
  }
  edit(id) {
    this.setState({ editingid: id });
    
  }
  render() {
    var mainMenus=[];
    var hasSubMenus=[];
    this.state.menuItem.map((mainMenu) => {
      if(mainMenu.subMenuList.length > 0)
      {
        hasSubMenus.push( 
        <SubMenu
          key={mainMenu.id}
          title={<span><Icon type="user" /><span>{mainMenu.menuName}</span></span>}
        >
          { mainMenu.subMenuList.map((item) => {
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
   
    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider
            collapsible
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
             {mainMenus}
            </Menu>
            <Menu theme="dark"  defaultSelectedKeys={['1']}  mode="inline">
            {hasSubMenus}
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: '#fff', padding: 0,display:'none' }}  />
            <Content style={{ margin: '0 16px' }}>
            <Button onClick={this.add} type="primary" style={{ marginBottom: 16 }}>
                Add a menu
              </Button>
              <Table
                rowKey="id"
                columns={this.columns}
                  expandedRowRender={record => record.subMenuList.length > 0 ?  <Table
                  rowKey="id"
                  columns={this.subMenuItem}
                  dataSource={record.subMenuList}
                  pagination={false}
                /> : false}
                dataSource={this.state.menuItem}
                pagination={false}
              />
            </Content>
            <Footer style={{ textAlign: 'center' }}>
               Ant Design ©2018 Created by Ant UED
             </Footer>
            </Layout>
            </Layout>
             <ModalAddMenu
             isAdd={this.state.isAdd}
             handleAdd={this.handleAdd}
             menuItem={this.state.menuItem}
            /> 
          </div>
      );
  }
 
  
}

export default Menus; 