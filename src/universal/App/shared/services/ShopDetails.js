import axios from 'axios';
// import { uri } from './commonURI';
const uri = 'http://localhost:3005/'

export function getShopDetails(){
    return axios.get(uri + 'ShopDetails');
  }
   export function deleteShopDetail(id){
   return axios.delete(uri + 'ShopDetails/' + id);
 }
 
  export function postShopDetail(data) {
    return axios.post(uri + 'ShopDetails',data);
  }
  export function putShopDetail(id,data) {
    return axios.put(uri + 'ShopDetails/'+id,data);
  }
  
  