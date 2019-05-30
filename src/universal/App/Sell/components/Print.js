import React from 'react';
import { Table } from 'antd';
import * as Taxes from '../../shared/services/Tax';
import * as ShopDetails from '../../shared/services/ShopDetails';
const columns = [{
  title: 'Product Name',
  dataIndex: 'name',
  width:'10%'
   },  
   {
  title: 'Sale Price',
  dataIndex: 'price',
  width:'10%'
  }, 
  {
  title: 'Quantity',
  dataIndex: 'count',
  width:'10%'
},
{
    title: 'Total',
    dataIndex: 'total',
  width:'10%'
  }];


  const taxColumns = [{
    title: 'Tax Name',
    dataIndex: 'name',
    width:'10%'
     },  
     {
    title: 'Tax Value',
    dataIndex: 'value',
    width:'10%'
    }, 
   {
      title: 'Tax Total',
      dataIndex: 'total',
      width:'10%'
    },
    
];
 
class  Print extends React.Component {
    constructor(){
        super();
        this.state={
         taxData:[],
         taxBillData:[],
         shopDetails:[]
        }
   
    }
    componentDidMount = () => {
        let productTotal={
            name:<b>Total</b>,
            price:'',
            count:'',
            total:<b>{(Number(this.props.tax) + Number(this.props.total)).toLocaleString(undefined, {maximumFractionDigits:2 })}</b>
        }
        Taxes.getTax().then((response) => {
            this.setState({taxData:response.data})
        })
        ShopDetails.getShopDetails().then((response) => {
            this.setState({shopDetails:response.data})
        })
    }
    
render() {
    let billingData= this.props.billingData;
    let data=[];
    if(this.state.taxData.length > 0) {
         this.state.taxData.map((item) => {
        data.push({
            name:item.taxName.toLocaleString(undefined, {maximumFractionDigits:2 }),
            value:item.taxValue.toLocaleString(undefined, {maximumFractionDigits:2 }),
            total:((item.taxValue * this.props.total)/100).toLocaleString(undefined, {maximumFractionDigits:2 }),
        })
    })
    }
   let taxTotal={
        name:<b>Total</b>,
        value:'',
        total:<b>{(this.props.tax).toLocaleString(undefined, {maximumFractionDigits:2 })}</b>
    }
    data.push(taxTotal)
    return(
    <div id="bill-pdf">
    <center>
        <div>
           
            { this.state.shopDetails.length > 0 &&   
              <h2>
                <b>{ this.state.shopDetails[0].shop_Name}</b>,<br/>
                {this.state.shopDetails[0].address}<br/>
                <b>Pincode:-</b>{this.state.shopDetails[0].pincode}&nbsp;&nbsp;&nbsp;
                <b>GST No:-</b>{this.state.shopDetails[0].gst_No}<br/>
                <b>Contact No:-</b>{this.state.shopDetails[0].contact1}/{this.state.shopDetails[0].contact2}
                <hr />
             </h2>
            }
        </div>
     </center>
     <h2><center><b>Product Description</b></center></h2>
    <Table pagination={false}
    columns={columns} dataSource={this.props.billingData} size="small" />
    <h2><center><b>Tax Description</b></center></h2>
    <Table pagination={false}
    columns={taxColumns} dataSource={data} size="small" />
  </div>
);
}
    
}
export default Print;