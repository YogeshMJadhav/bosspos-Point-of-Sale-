import axios from 'axios';
//import { uri } from './commonURI';
const uri='http://localhost:3005/';

 export function getBilling(){
    return axios.get(uri + 'billingMaster');
  }
   export function deleteBilling(id){
   return axios.delete(uri + 'billingMaster/' + id);
 }
 
  export function postBilling(data) {
    return axios.post(uri + 'billingMaster',data);
  }
  export function putBilling(id,data) {
    return axios.put(uri + 'billingMaster/'+id,data);
  }
  export function getBillingPerticuler(id){
    return axios.get(uri + 'billingMaster/'+id);
  }
  
  