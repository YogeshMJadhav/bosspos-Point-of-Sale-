import React from 'react';
import { Modal, Button,Radio,Input,Form  } from 'antd';
import * as NavMenus from '../../shared/services/Menus';  
import { Select } from 'antd';
const RadioGroup = Radio.Group;
const Option = Select.Option;

class ModalPage extends React.Component {
  constructor(props){
  super(props);  
  this.state = { 
    visible: false,
    value: 'newMenu',
   }
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.isAdd){
      this.showModal();
    }
  }
  
  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    this.props.form.resetFields();
    this.setState({
      visible: false,
    });
    this.props.addHandle(false)
  }
  onChange = (e) => {
    this.setState({
      value: e.target.value,
    });
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        if(!values.parentMenuId){
          values.parentMenuId=0;
        }
           NavMenus.postMenu(values).then((response) => {
            this.props.addHandle(response)
            console.log(response);
            
           })
           console.log('Received values of form: ', values);
           this.handleCancel(); 
      }
    });
  }
  addNewMenu() {
    const { getFieldDecorator } = this.props.form;
    if(this.state.value=='newMenu'){
   return(
    <Form.Item
    label="Menu Name"
    labelCol={{ span: 7 }}
    wrapperCol={{ span: 12 }}
  >
    {getFieldDecorator('menuName', {
      rules: [{ required: true, message: 'Please enter product type name!' },
    ],
    })(
      <Input />
    )}
  </Form.Item>
   );
    }
  }
 
  addSubMenu(){
      // let mainMenus=this.props.menuItem.filter(value => value.parentMenuId==null)
    var menu=this.props.menuItem.map((item) => {
     return <Option value={item.id} key={item.id}>{item.menuName}</Option> ;
    })
    const { getFieldDecorator } = this.props.form;
    if(this.state.value=='subMenu'){
    return (
     <div>
        <Form.Item
          label="Main Menu"
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('parentMenuId', {
            rules: [{ required: true, message: 'Please select Parent Menu!' }],
            initialValue: this.props.menuItem.length > 0 ?  this.props.menuItem[0].id : null
          })(
            <Select>
             {menu}
            </Select>
          )}
        </Form.Item>
         <Form.Item
          label="Sub Menu "
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 12 }}
        >
          {getFieldDecorator('menuName', {
            rules: [{ required: true, message: 'Please enter sub menu name!' },
          ],
          })(
            <Input />
          )}
        </Form.Item>
       
        </div>
    );
          }
  }
 
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleSubmit}
          onCancel={this.handleCancel}
        >
        <Form  onSubmit={this.handleSubmit}>
        <RadioGroup  onChange={this.onChange} value={this.state.value} style={{marginLeft:120}}>
        <Radio value={'newMenu'}>Add New Menu</Radio>
        <Radio value={'subMenu'}>Add Sub-Menu</Radio>
       </RadioGroup><br/><br/>
         {this.addNewMenu()}
         {this.addSubMenu()}
        </Form>
        </Modal>
      </div>
    );
  }
}
const ModalAddMenu = Form.create({ name: 'ModalPage' })(ModalPage);
export default ModalAddMenu;