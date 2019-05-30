import React, { Component } from 'react';
import * as Tax from '../../shared/services/Tax';
import * as Product from '../../shared/services/Product';
import * as BillingMasters from '../../shared/services/BillingMaster';
// import { Table,Button } from 'reactstrap';
import SellingProduct from '../components/SellingProduct';
 //import * as html2canvas  from 'html2canvas';
 //import * as  jsPDF  from 'jspdf';
import Print from '../components/Print';
import Billing from '../components/Billing'
import ChargeHandle from '../components/ChargeHandle';
import './bootstrap.css';
import '../components/custom.css';
import {
  UikContainerVertical,
  UikContainerHorizontal,
  UikContent,
  UikLayoutMain,
} from '@containers'

import Header from '@shared/components/Header'
import Navigation from '@shared/components/Navigation'
import {
    Table, Input,InputNumber, Button, Popconfirm, Form,Icon,Affix
  } from 'antd';
var taxTotal=0;
var actualTotal=0;
var print=false;

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);
var count=0;
var price=0;
class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        this.input.focus();
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      console.log(values);
      
        count=values.count;
        price=values.price;
        
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record,...values},count,price );
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
                  <span>
                  <FormItem style={{ margin: 0}}>
                    {dataIndex=='count' ? form.getFieldDecorator('count', {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record['count'],
                    })(
                      <InputNumber style={{width:70}}
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                        initialValue={record['count']}
                      />
                    ):null}
                    
                  </FormItem>
                  <FormItem style={{ margin: 0}}>
                  {dataIndex=='price' ? form.getFieldDecorator('price', {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record['price'],
                    })(
                      <InputNumber style={{width:70}}
                        ref={node => (this.input = node)}
                        onPressEnter={this.save}
                      />
                    ):null}
                  </FormItem>
                  </span>
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

var price=0;
class  KnowledgeHome extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      editableId:null,
      editableData:[],
      taxData:[],
      productData:[],
      productId:null,
      actualTotal:0,
      billingData:[],
      productIds:[],
      taxTotal:0,
      print:false,
      charge:0,
      discount:0,
      billId:null,
      isCharge:false,
      isDiscount:false,
      isBilling:false,
      editBillId:null
    }
    this.columns = [
         {
        render: (text, record) => (
        <Icon type="minus" onClick={() => this.DecrementProduct(record.id)} style={{marginRight:'-20'}}/>
        ), 
        width: '0%',
        },
        {
        title: 'Quantity',
        dataIndex: 'count',
        editable: true,
        width: '0%',
        },
        {
            render: (text, record) => (
            <Icon type="plus" onClick={() => this.IncrementProduct(record.id)} style={{marginLeft:'-25'}}/>
        ), 
        width: '0%',
      }, {
        title: 'Name',
        dataIndex: 'name',
        width: '0%',
      }, 
      {
        title: 'Rate',
        dataIndex: 'price',
        width: '0%',
        editable: true
      },
      {
        title: 'Price',
        dataIndex:'total',
        width: '0%',
      }, 
      {
        title: '',
        dataIndex: 'operation',
       
        render: (text, record) => (
                <Icon type="delete" onClick={() => this.DeleteProduct(record.id)}/>
        ),
      }];
  
    Tax.getTax()
    .then((response) => {
    this.setState({taxData:response.data})
})  
    Product.getProduct()
    .then((response) => {
    this.setState({productData:response.data})
}) 
  }

  handleDelete = (id) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
  }

  handleSave = (row,count,price) => {
    const newData = [...this.state.billingData];
    const index = newData.findIndex(item => row.id === item.id);
    const item = newData[index];
    if(count) {
      item.count=count;
      item.total=item.price * count;
    } else {
      item.price=price;
      item.total=price * item.count;
      
    }

    this.setState({ billingData: newData });
  }

componentDidMount= () =>  {
    if(this.props.location.state){
          BillingMasters.getBillingPerticuler(this.props.location.state.id).then((response) => {
            this.state.editableData.push(response.data)
            this.state.editableData.map((item) => {
                this.setState({editableId:item.id});
                this.setState({charge:item.extraCharge})
                this.setState({discount:item.discount})
                this.setState({editBillId:this.props.location.state.id})
                    item.products.map((product)=>{ 
                        this.state.productIds.push(product.productId);
                        this.state.billingData.push({
                            id:product.productId,
                            count:product.quantity,
                            name:product.productName,
                            price:product.productAmt, 
                            total:product.productAmt * product.quantity
                        })
                    })
            })
        })
     }
  }
  
  perticulerSelect = (productId) => {
      this.setState({productId})
    if(!this.state.productIds.includes(productId)) {
       this.state.productIds.push(productId);
       if(this.state.productData) { 
           this.state.productData.map((item) => {
               if(item.id==productId )  {
                           this.state.billingData.push({
                           id:productId,
                           count:1,
                           name:item.productName,
                           price:item.salePrice,
                           total:item.salePrice
                           
                       })
               }
           })
       }
   }   else { 
           this.state.productData.map((item) => {
             if(item.id==productId )  {
                  this.state.billingData.map((existed) => { 
                      if(existed.id==item.id) {
                            existed.count=existed.count + 1;
                            existed.total=existed.count * existed.price;
                       }
                   })
              }
          })
       }
  
} 
DeleteProduct= (id) => {
   this.state.billingData.map((item,index) => {
   if(item.id==id) {
 let temp = this.state.billingData;
 this.state.billingData.splice(index, 1);
 this.setState({billingData:temp})
 this.state.productIds.splice(index, 1);
  }
})
if(this.state.productIds.length < 1) {
    this.setState({productId:null})
}
}
DecrementProduct=(id)=> {
   const billingData=this.state.billingData;
   billingData.map((item,index) => {
       if(item.id==id) {
           if(item.count > 1) {
               item.count=item.count - 1;
               item.total=item.total-item.price ;
           } else {
               let temp = this.state.billingData;
               this.state.billingData.splice(index, 1);
               this.setState({billingData:temp})
               this.state.productIds.splice(index, 1);
           }
      }
  })
  if(this.state.productIds.length < 1) {
    this.setState({productId:null})
}
  this.setState({billingData})
}
IncrementProduct=(id)=> {
    const billingData=this.state.billingData;
    billingData.map((item,index) => {
        if(item.id==id) {
            if(item.count > 0) {
                item.count=Number(item.count) + 1;
                item.total=item.total + item.price ;
            } else {
                let temp = this.state.billingData;
                this.setState({billingData:temp})
            }
       }
   })
  
   this.setState({billingData})
 }
printDocument() {
  print=true;
  document.getElementById('bill-pdf').style.visibility='visible'
  this.setState({isBilling:true})
//   const input = document.getElementById('bill-pdf')

// html2canvas(input)
//    .then((canvas) => {
//      const imgData = canvas.toDataURL('image/png');
//      const pdf = new jsPDF();
//       pdf.addImage(imgData, 'JPEG', 0, 0);
//      // pdf.output('dataurlnewwindow');
//      pdf.save("download.pdf");
//    });
}
actualTotal = () => {
  if(this.state.productIds) {
  let temp=0;
  this.state.billingData.map((item) => {
  temp = Number(temp) + Number(item.count) * Number(item.price)
  actualTotal=temp;
})
return actualTotal
}
}
taxTotal = () => {
    if(this.state.productIds) {
        let temp=0;
      this.state.taxData.map((item) => {
       temp = Number(temp) + Number(this.actualTotal()) * Number(item.taxValue) /100
       taxTotal=temp;
      })
      return taxTotal;
  }
}   
chargeHandle = (charge) => {
    if(charge) {
     this.setState({charge})
    }
 this.setState({ isCharge:false,isDiscount:false})
}
charge=()=>{
  this.setState({ isCharge:true})
}
discount=()=>{
  this.setState({ isDiscount:true})
}
discountHandle = (discount) => {
  if(discount) {
    this.setState({discount})
   }
   this.setState({ isCharge:false,isDiscount:false})
}

totalPaidAmt(){
    let temp = (Number(this.actualTotal()) + this.taxTotal() + Number(this.state.charge) - Number(this.state.discount)).toLocaleString(undefined,{maximumFractionDigits:2 }) ;
   return temp;
}
render() {
    const { billingData } = this.state;
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
        <UikContainerHorizontal>
          <Navigation />
          <UikContainerVertical>
          <Header />
          <UikLayoutMain>
          {/* <div className="container" style={{width:"100%" , maxWidth:"100%"}} > */}
      <div className="row">
      <div className="col-sm-7">

         <SellingProduct perticulerSelect={(e)=>this.perticulerSelect(e)} 
              productData={this.state.productData} 
              billingData={this.state.billingData}/>  
    </div>
     <div className="col-sm-5" >
      <span> CURRENT SALE </span><span style={{marginLeft:'220px',fontWeight:'bolder',fontSize:20}}>
         {this.state.productIds.length > 0 && (this.actualTotal() + this.taxTotal() + Number(this.state.charge) - Number(this.state.discount)).toLocaleString(undefined, {maximumFractionDigits:2 })}</span>
     <div  id="divToPrint">
       {this.state.productIds.length > 0 ?  <Table className="nah"
          components={components}
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={billingData}
          columns={columns}
          pagination={false}
          scroll={{y:450}}
         
         /> : null}
          </div>
          {this.state.productIds.length >0 ? 
          <span>
           &nbsp;&nbsp; <b>Taxes</b><span style={{marginLeft:280}}><b>{this.taxTotal().toLocaleString(undefined, {maximumFractionDigits:2 })}</b></span>
          <div className="row">
             <Affix offsetButtom={20} className="col-sm-6"   >
               <Button onClick={this.discount} style={{marginLeft:30,width:180,marginTop:10}} 
                >Discount:{this.state.discount}</Button>
             </Affix>
             <Affix offsetButtom={20} className="col-sm-6"  >
               <Button onClick={this.charge} style={{marginLeft:10,width:180,marginTop:10}} 
               >Charge:{this.state.charge}</Button>
             </Affix>
          </div>
          <div className="row">
             <Affix offsetButtom={20} className="col-sm-6"   >
               <Button onClick = {(e)=>{this.printDocument(e)}} style={{marginLeft:30,width:180,marginTop:10}} type="primary"
                >Print</Button>
             </Affix>
             <Affix offsetButtom={20} className="col-sm-6"  >
               <Button onClick={this.charge} style={{marginLeft:10,width:180,marginTop:10,background:'#28a745',color:"#fff"}} type="success"
               >Total:{(this.actualTotal() + this.taxTotal() + Number(this.state.charge) - Number(this.state.discount)).toLocaleString(undefined, {maximumFractionDigits:2 })}</Button>
             </Affix>
          </div>
          </span>:
          <img style={{width:"100%"}}  src={require('./assets/current-sale.png')} />
          }
             { this.state.productIds.length > 0  ? <ChargeHandle 
              charge={this.state.isCharge}
              discount={this.state.isDiscount}
              chargeHandle={this.chargeHandle}
              discountHandle={this.discountHandle}
            />: null }
        </div>
    </div>
         <span style={{visibility:'hidden'}}> 
      {this.state.billingData.length > 0 ?
       <Print billingData={this.state.billingData}
        total={this.actualTotal() }
        tax={this.taxTotal()} taxData={this.state.taxData}
        charge={this.state.charge} discount={this.state.discount}
        billId={this.state.billId}
        />
       :null} 
        </span>
        {this.state.isBilling ?  <Billing 
        billingData={this.state.billingData}
        totalPaidAmt={this.totalPaidAmt()}
        charge={this.state.charge}
        discount={this.state.discount}
        actualTotal={this.actualTotal()}
        taxTotal={this.taxTotal()}
        editBillId={this.state.editBillId}
        />:null}
          </UikLayoutMain>
          </UikContainerVertical>
        </UikContainerHorizontal>
     
    ) 
  }
}
export default KnowledgeHome
