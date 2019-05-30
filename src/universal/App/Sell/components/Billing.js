import React from 'react'
import * as BillingMasters from '../../shared/services/BillingMaster';
const Billing = (props) => {
  let products = [];
  if(props.billingData) {
    props.billingData.map((item) => {
    const billProducts = {
        "productId": item.id,
        "quantity": item.count,
        "productAmt": item.price,
        "productTaxAmt": "0",
        "productName": item.name
            }
            products.push(billProducts)
        })
            const temp = {
                "paymentTypeId": "",
                "customerName": "ivision",
                "totalPaidAmt": props.totalPaidAmt.toLocaleString(undefined,{maximumFractionDigits:2}),
                "totalDueAmt": 0,
                "totalPaidByCredit": 0,
                "extraCharge": props.charge,
                "discount": props.discount,
                "productTotalAmount": props.actualTotal.toLocaleString(undefined,{maximumFractionDigits:2}),
                "totalTaxAmount": props.taxTotal.toLocaleString(undefined,{maximumFractionDigits:2}),
                "refundAmt": "0",
                "products" : products
            }
            if(props.editBillId){
                BillingMasters.putBilling(props.editBillId,temp)
                .then(); 
            } else {
                 BillingMasters.postBilling(temp).then()
                // .then((response)=>{this.setState({billId:response.data.id})});
            }
  }
    
    return(
           null
          )
}
export default Billing;