import React from 'react';
import { Button} from 'antd';
class SellingProduct extends React.Component {
    constructor() {
        super();
        this.state = {
            productId:null,
            temp:[],
            taxData:[]
        }
    }
render() {  
        const products = this.props.productData.map((item, index) => {
            return(
                  <Button style={{backgroundColor:"#e6e6e6", width:'200px',height:'150px', margin:" 5px" , border:"0px", padding:"50px"}}
                                onClick={() => {this.props.perticulerSelect(item.id)}} 
                                 id="product" key={index} >
                                <h3>{item.productName}</h3>
                                {
                                    this.props.billingData && this.props.billingData.map((data,index)=>{
                                        if(item.id == data.id)
                                        return <span key={index}><b>{data.count}</b>{" "} ×  </span> 
                                    }) 
                                }
                                <span>&#8377; <b>{item.salePrice}</b> </span>
                    </Button> 
            )
        })
      return(
         <div className="form-inline">         
               { products}           
         </div>
            );
        }
       
    }
export default SellingProduct;