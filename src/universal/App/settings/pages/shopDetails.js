import React from 'react'
import { Table, Input, Button, Popconfirm, Form, } from 'antd'
import './shopeDetails.css';
import * as ShopDetail from '../../shared/services/ShopDetails';
const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);
const { TextArea } = Input;

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      ...restProps
    } = this.props;
    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message:`${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(
                      <Input
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        onBlur={this.save}
                      />
                    )}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}
class ShopDetails extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [{
      dataIndex: 'name',
      width:'30%'
    }, 
    {
      dataIndex: 'value',
      width:'30%',
      editable: true,
    }];

    this.state = {
      dataSource:[],
      shopData:{}
    };
   
  }
  componentDidMount = () => {
    let dataSource;
    ShopDetail.getShopDetails().then((response) =>{
      this.setState({shopData:response.data[0]})
      dataSource= [{
        id:1,
        name:<b>Shop_Name:</b>,
        value:this.state.shopData['shop_Name'],
        key:'shop_Name'

      },
      {
        id:2,
        name:<b>Address:</b>,
        value:this.state.shopData['address'],
        key:'address'
      },
      {
        id:3,
        name:<b>Pincode:</b>,
        value:this.state.shopData['pincode'],
        key:'pincode'
      },
      {
        id:4,
        name:<b>Contact:</b>,
        value:this.state.shopData['contact1'],
        key:'contact1'
      },
      {
        id:5,
        name:<b>Alternative contact:</b>,
        value:this.state.shopData['contact2'],
        key:'contact2'
      },
      {
        id:6,
        name:<b>Email:</b>,
        value:this.state.shopData['email'],
        key:'email'
      },
      {
        id:7,
        name:<b>PAN No:</b>,
        value:this.state.shopData['pan_No'],
        key:'pan_No'
      },
      {
        id:8,
        name:<b>GST No:</b>,
        value:this.state.shopData['gst_No'],
        key:'gst_No'
      },
      {
        id:9,
        name:<b>Description:</b>,
        value:this.state.shopData['description'],
        key:'description'
      }
      ]
      this.setState({dataSource})
    })
  }

  handleDelete = (id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  }

  handleSave = (row) => {
    this.state.shopData[row.key]=row.value;
    ShopDetail.putShopDetail(this.state.shopData.id,this.state.shopData)
    const newData = [...this.state.dataSource];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    this.setState({ dataSource: newData });
  }

  render() {
    const { dataSource } = this.state;
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
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
        }),
      };
    });
    return (
      <div>
        <Table className='header shop-details'
         rowKey="id"
         pagination={false}
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}

export default ShopDetails;