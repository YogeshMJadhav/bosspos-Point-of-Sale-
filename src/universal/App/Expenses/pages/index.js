import React from 'react'
import * as Expenses from '../../shared/services/Expenses';
import ModalPage from '../components/ModalPage';
import {
  Table, Input,Button, InputNumber, Popconfirm, Form,DatePicker
} from 'antd';
import moment from 'moment';
import {
  UikTopBar,
  UikTopBarSection,
  UikTopBarTitle,
  Uikon,
  UikDropdownItem,
  UikInput,
} from '@components'

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
var datePick=null;
var initialDate=null;
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state={
    }
  }
  onChange(date, dateString) {
    datePick=dateString
  }
   disabledDate(current) {
    // Can not select days before today and today
    return current && current > moment().endOf('day');
  }
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
          {editing ? (
            <span>
              {
                initialDate=record['date']
                
              }
              </span>):null}
          return (
            <td {...restProps}>
              {editing ? (
                <span>
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
                  {dataIndex=='subject' ?  getFieldDecorator('subject', {
                      rules: [{ required: true, message: 'Please enter expense subject!' },
                    ],
                    initialValue: record['subject']
                    })(
                      <Input  />
                    ):null} 
                </FormItem>
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='description' ?  getFieldDecorator('description', {
                      rules: [{ required: true, message: 'Please enter description!' },
                    ],
                    initialValue: record['description']
                    })(
                      <Input  />
                    ):null} 
                </FormItem>
                <FormItem style={{ margin: 0 }}>
                  {dataIndex=='amount' ?  getFieldDecorator('amount', {
                      rules: [{ required: true, message: 'Please enter expense amount!' },
                    ],
                    initialValue: record['amount']
                    })(
                      <InputNumber  />
                    ):null} 
                </FormItem>
                <Form.Item style={{ margin: 0 }}>
                  {dataIndex=='date' ? getFieldDecorator('date', {
                      rules: [{ required: false, message: 'Please enter expense date!' },
                    ],
                    }) (
                      <DatePicker
                       format="YYYY-MM-DD"
                        disabledDate={this.disabledDate}
                        // disabledTime={this.disabledDateTime}
                        //  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                         onChange={this.onChange}
                     />
                    ):null}
                  
                  </Form.Item>
                </span>
              ) : restProps.children}
            </td>
          );
        }}
      </EditableContext.Consumer>
    );
  }
}
export default class Expense extends React.Component {
  constructor(props) {
    super(props);
    this.state = {  data: [],
                    editingid: '',
                    isAdd:false,
                    alldata: [],
                    search : '',
                    date:null
                 };
    this.columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        width: '15%',
        editable: true,
      },
      {
        title: 'Subject',
        dataIndex: 'subject',
        width: '10%',
        editable: true,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        width: '25%',
        editable: true,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        width: '10%',
        editable: true,
      },
      {
        title: 'date',
        dataIndex: 'date',
        width: '10%',
        editable: true,
      },
      {
        title: '',
        dataIndex: 'operation',
        width: '10%',
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
    Expenses.getExpenses()
      .then((response) =>{
      this.setState({data : response.data});
      this.setState({alldata : response.data})
      })
      this.setState({isAdd:false})
      
  }
  

  isEditing = record => record.id === this.state.editingid;

  cancel = () => {
    this.setState({ editingid: '' });
  };

  save(form, id) {
    form.validateFields((error, row) => {
      if(datePick != null) {
        row.date=datePick
      } else {
        row.date=initialDate
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
        Expenses.putExpenses(this.state.editingid,row)
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
    if(item) {
       Expenses.getExpensesPerticuler(item.id).then((response)=>{
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
    
  }
  dateHandle(date) {
    this.setState({date})
  }
  delete(id) {
      const data = [...this.state.data];
      Expenses.deleteExpenses(id)
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
           match.name.toLowerCase().indexOf(event.target.value.toLowerCase()) !== -1 
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
          Expenses
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
      <Table
        components={components}
        bordered
        dataSource={this.state.data}
        columns={columns}
        dateHandle={this.dateHandle}
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
